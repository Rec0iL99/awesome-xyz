import { Arg, Field, Mutation, ObjectType, Resolver } from "type-graphql";
import { User } from "../entities/User";
import superagent from "superagent";

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(User)
export class UserResolver {
  @Mutation(() => UserResponse)
  async auth(
    @Arg("githubCode")
    code: string
  ) {
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

    // TODO: make this from type GithubUser from @awesome-xyz/common
    const githubUser = await githubUserResponse.body;

    console.log("githubUser: ", githubUser);

    // const user = await User.findOne({ where: { username: githubUser.login } });
  }
}
