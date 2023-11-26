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
import session from "express-session";
import cors from "cors";
import Redis from "ioredis";
import RedisStore from "connect-redis";
import { __prod__ } from "./utils/constants";
import { MyContext } from "./types/types";

const main = async () => {
  await dataSource.initialize();

  // initializing the express app
  const app = express();

  const redis = new Redis();
  let redisStore = new RedisStore({
    client: redis,
    disableTouch: true,
  });

  app.use(
    cors({
      origin: [process.env.FRONTEND_CLIENT],
      credentials: true,
    })
  );

  app.use(
    session({
      name: process.env.COOKIE_NAME,
      store: redisStore,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver],
      validate: false,
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
    context: ({ req, res }): MyContext => ({
      req,
      res,
      redis,
      dataSource,
    }),
  });

  await apolloServer.start();

  // cors: false since applying here would only apply to the /graphql route
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(parseInt(process.env.PORT), () => {
    console.log(
      `@awesome-xyz/api is running ${os.hostname} at port ${process.env.PORT}`
    );
  });
};

main().catch((error) => {
  console.error(error);
});
