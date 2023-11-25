import "reflect-metadata";
import "dotenv/config";
import express from "express";
import os from "os";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { dataSource } from "./utils/typeormConfig";
import { UserResolver } from "./resolvers/user";

const main = async () => {
  await dataSource.initialize();

  // initializing the express app
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver],
      validate: false,
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  });

  await apolloServer.start();

  // cors: false since applying here would only apply to the /graphql route
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(process.env.PORT, () => {
    console.log(
      `@awesome-xyz/api is running ${os.hostname} at port ${process.env.PORT}`
    );
  });
};

main().catch((error) => {
  console.error(error);
});
