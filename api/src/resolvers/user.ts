import { Arg, Field, Mutation, ObjectType, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { GitHubUser } from "@awesome-xyz/common";
import superagent from "superagent";

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

  @Field(() => String, { nullable: true })
  email: string;

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
    code: string
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
        },
      };
    }

    return {
      isRegistered: true,
      user,
    };
  }
}
