import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql";
import { User } from "../entities/User";
import { GitHubUser } from "@awesome-xyz/common";
import superagent from "superagent";
import { MyContext } from "src/types/types";

@InputType()
class RegisterUserInput {
  @Field()
  username: string;

  @Field()
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  githubProfile: string;

  @Field()
  avatarUrl: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class GitHubUserResponse {
  @Field()
  username: string;

  @Field()
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  githubProfile: string;

  @Field()
  avatarUrl: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
class AuthResponse {
  @Field(() => Boolean)
  isRegistered: boolean;

  @Field(() => GitHubUserResponse, { nullable: true })
  githubUser?: GitHubUserResponse;

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(User)
export class UserResolver {
  @Mutation(() => AuthResponse)
  async auth(
    @Arg("githubCode")
    code: string,
    @Ctx()
    { req }: MyContext
  ): Promise<AuthResponse> {
    const accessTokenResponse = await superagent
      .post("https://github.com/login/oauth/access_token")
      .send({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      })
      .set("Accept", "application/json");
    const { access_token: githubAccessToken } = await accessTokenResponse.body;

    const githubUserResponse = await superagent
      .get("https://api.github.com/user")
      .set("Authorization", `token ${githubAccessToken}`)
      .set("User-Agent", "grupo");

    const githubUser: GitHubUser = await githubUserResponse.body;

    const user = await User.findOne({ where: { username: githubUser.login } });
    if (!user) {
      return {
        isRegistered: false,
        githubUser: {
          avatarUrl: githubUser.avatar_url,
          email: githubUser.email,
          name: githubUser.name,
          username: githubUser.login,
          githubProfile: githubUser.html_url,
        },
      };
    }

    req.session.userId = user.id;

    return {
      isRegistered: true,
      user,
    };
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options")
    options: RegisterUserInput,
    @Ctx()
    { dataSource, req }: MyContext
  ): Promise<UserResponse> {
    // TODO: valider options before registering

    let user;

    try {
      const result = await dataSource
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          avatarUrl: options.avatarUrl,
          email: options.email,
          githubProfile: options.githubProfile,
          name: options.name,
          username: options.username,
        })
        .returning("*")
        .execute();

      user = result.raw[0];
    } catch (error) {
      if (error.code === "23505") {
        return {
          errors: [
            {
              field: "username",
              message: "Username already exists. Please try another one.",
            },
          ],
        };
      }
    }

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  logout(
    @Ctx()
    { req, res }: MyContext
  ) {
    return new Promise((resolve) =>
      req.session.destroy((error) => {
        res.clearCookie(process.env.COOKIE_NAME);
        if (error) {
          console.error(error);
          resolve(false);
          return;
        }

        resolve(true);
      })
    );
  }
}
