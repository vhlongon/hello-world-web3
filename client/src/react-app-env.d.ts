/// <reference types="react-scripts" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly REACT_APP_CONTRACT_ADDRESS: string;
      readonly REACT_APP_ALCHEMY_KEY: string;
    }
  }
}

export {};
