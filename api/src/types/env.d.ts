declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PORT: string;
      FRONTEND_CLIENT: string;
      POSTGRES_DBNAME: string;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      GITHUB_CLIENT_ID: string;
      GITHUB_CLIENT_SECRET: string;
      COOKIE_NAME: string;
      SESSION_SECRET: string;
    }
  }
}

export {};
