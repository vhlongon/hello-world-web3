import * as dotenv from "dotenv";

dotenv.config();

import "@nomiclabs/hardhat-ethers";

const { API_URL, PRIVATE_KEY } = process.env;

const config = {
  solidity: "0.8.0",
  defaultNetwork: "ropsten",
  networks: {
    hardhat: {},
    ropsten: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};

export default config;
