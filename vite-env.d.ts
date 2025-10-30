/// <reference types="vite/client" />

declare module "*.css?url" {
  const url: string;
  export default url;
}

// Declare process for server-side code (meta functions run on server)
declare namespace NodeJS {
  interface ProcessEnv {
    ALLOW_INDEXING?: string;
    BASE_URL?: string;
    [key: string]: string | undefined;
  }
}

declare const process: {
  env: NodeJS.ProcessEnv;
};