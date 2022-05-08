declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly API_URL: string;
      readonly PRIVATE_KEY: string;
      readonly CONTRACT_ADDRESS: string;
      readonly ETHERSCAN_API_KEY: string;
    }
  }
}

export {};
