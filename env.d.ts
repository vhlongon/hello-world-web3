declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly API_URL: string;
      readonly PRIVATE_KEY: string;
      readonly CONTRACT_ADDRESS: string;
    }
  }
}

export {};
