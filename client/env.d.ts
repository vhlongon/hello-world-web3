declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly CONTRACT_ADDRESS: string;
      readonly ALCHEMY_KEY: string;
    }
  }
}

export {};
