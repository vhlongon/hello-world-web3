import * as dotenv from "dotenv";

dotenv.config();

import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import { HardhatUserConfig } from "hardhat/config";

const { API_URL, PRIVATE_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.0",
  defaultNetwork: "ropsten",
  typechain: {
    target: "ethers-v5",
    alwaysGenerateOverloads: false,
  },
  networks: {
    hardhat: {},
    ropsten: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};

export default config;
