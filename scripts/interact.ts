import contract from "../artifacts/contracts/HelloWorld.sol/HelloWorld.json";
import { ethers } from "hardhat";
import { HelloWorld } from "../typechain-types";

const { API_KEY, PRIVATE_KEY, CONTRACT_ADDRESS } = process.env;

const alchemyProvider = new ethers.providers.AlchemyProvider(
  "ropsten",
  API_KEY
);

const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
);

async function main() {
  const helloWorld = (await helloWorldContract.deployed()) as HelloWorld;
  console.log(helloWorld);
  const message = await helloWorld.message();
  console.log(`the current message is: ${message}`);

  console.log("Updating the message...");
  const transaction = await helloWorld.update("something completely different");
  await transaction.wait();

  const newMessage = await helloWorld.message();
  console.log(`Updated the message to: ${newMessage}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
