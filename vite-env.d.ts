/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL?: string;
  readonly VITE_ALLOW_INDEXING?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

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