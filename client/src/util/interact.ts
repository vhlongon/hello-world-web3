import contract from "../contractAbi.json";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { AbiItem } from "web3-utils";

const { REACT_APP_ALCHEMY_KEY, REACT_APP_CONTRACT_ADDRESS } = process.env;
const web3 = createAlchemyWeb3(REACT_APP_ALCHEMY_KEY);

export const helloWorldContract = new web3.eth.Contract(
  contract as AbiItem[],
  REACT_APP_CONTRACT_ADDRESS
);

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call();
  return message;
};

export const connectWallet = async () => {
  if (window?.ethereum) {
    try {
      const addressArray = await window.ethereum.request<string[]>({
        method: "eth_requestAccounts",
      });
      const obj = {
        address:
          addressArray && addressArray.length > 0 ? addressArray[0] ?? "" : "",
        status: "👆🏽 Write a message in the text-field above.",
      };
      return obj;
    } catch (error) {
      return {
        address: "",
        status: "😥 message" in error ? error.message : "",
      };
    }
  }
};

export const getCurrentWalletConnected = async () => {
  if (window?.ethereum) {
    try {
      const addressArray = await window.ethereum.request<string[]>({
        method: "eth_accounts",
      });
      if (addressArray && addressArray.length > 0) {
        return {
          address: addressArray[0] ?? "",
          status: "👆🏽 Write a message in the text-field above.",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        };
      }
    } catch (error) {
      return {
        address: "",
        status: "😥 " + error?.message ?? "something went wrong",
      };
    }
  } else {
    return {
      address: "",
      status: "install a wallet",
    };
  }
};

export const updateMessage = async (
  address: string | null,
  message: string
) => {
  if (address === null || !window?.ethereum) {
    return {
      status:
        "💡 Connect your Metamask wallet to update the message on the blockchain.",
    };
  }

  if (message.trim() === "") {
    return { status: "❌ Your message cannot be an empty string." };
  }

  const transactionParameters = {
    to: REACT_APP_CONTRACT_ADDRESS,
    from: address,
    data: helloWorldContract.methods.update(message).encodeABI(),
  };

  try {
    await window.ethereum?.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      status:
        "✅ View the status of your transaction on Etherscan! ℹ️ Once the transaction is verified by the network, the message will be updated automatically.",
    };
  } catch (error) {
    return {
      status: "😥 " + error?.message ?? "something went wrong",
    };
  }
};
