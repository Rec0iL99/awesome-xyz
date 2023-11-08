import "dotenv/config";
import express from "express";
import os from "os";

const main = async () => {
  // initializing the express app
  const app = express();

  app.listen(process.env.PORT, () => {
    console.log(
      `@awesome-xyz/api is running ${os.hostname} at port ${process.env.PORT}`
    );
  });
};

main().catch((error) => {
  console.error(error);
});
