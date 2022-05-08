import hre from "hardhat";

const { CONTRACT_ADDRESS } = process.env;

const initialMessage = "Hello World!";

async function main() {
  await hre.run("verify:verify", {
    address: CONTRACT_ADDRESS,
    constructorArguments: [initialMessage],
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
