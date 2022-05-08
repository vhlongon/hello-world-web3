import React from "react";
import { useEffect, useState } from "react";
import {
  helloWorldContract,
  connectWallet,
  updateMessage,
  loadCurrentMessage,
  getCurrentWalletConnected,
} from "./util/interact";

import alchemylogo from "./alchemylogo.svg";

const abbreviateAddress = (address: string) =>
  `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;

const HelloWorld = () => {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState<string | JSX.Element>("");
  const [message, setMessage] = useState("No connection to the network.");
  const [newMessage, setNewMessage] = useState("");

  const addSmartContractListener = () => {
    helloWorldContract.events.UpdatedMessages(
      {},
      (
        error: Error,
        data: { returnValues: { oldStr: string; newStr: string } }
      ) => {
        if (error) {
          setStatus("Error: " + error);
        } else {
          setMessage(data.returnValues.newStr);
          setNewMessage("");
          setStatus("Your message has been updated.");
        }
      }
    );
  };

  const addWalletListener = () => {
    if (window?.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        const accs = accounts as string[];

        if (accs && accs.length > 0) {
          setWallet(accs[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setWallet("");
      setStatus(
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://metamask.io/download.html`}
        >
          🦊 You must install Metamask, a virtual Ethereum wallet, in your
          browser.
        </a>
      );
    }
  };

  useEffect(() => {
    const loadMessage = async () => {
      const currentMessage = await loadCurrentMessage();
      setMessage(currentMessage);
    };
    loadMessage();
    addSmartContractListener();

    const loadWallet = async () => {
      const { address, status } = await getCurrentWalletConnected();
      setWallet(address);
      setStatus(status);
    };

    loadWallet();
    addWalletListener();
  }, []);

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    if (walletResponse) {
      setStatus(walletResponse.status);
      setWallet(walletResponse.address);
    }
  };

  const onUpdatePressed = async () => {
    const { status } = await updateMessage(walletAddress, newMessage);
    setStatus(status);
  };

  return (
    <div id="container">
      <img id="logo" alt="alchemy" src={alchemylogo}></img>
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          `Connected: ${abbreviateAddress(walletAddress)}`
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      <h2 style={{ paddingTop: "50px" }}>Current Message:</h2>
      <p>{message}</p>

      <h2 style={{ paddingTop: "18px" }}>New Message:</h2>

      <div>
        <input
          type="text"
          placeholder="Update the message in your smart contract."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <p id="status">{status}</p>

        <p>
          <a
            id="verify"
            target="_blank"
            rel="noreferrer"
            href={`https://ropsten.etherscan.io/address/${process.env.REACT_APP_CONTRACT_ADDRESS}`}
          >
            See Contract on etherscan.io
          </a>
        </p>

        <button id="publish" onClick={onUpdatePressed}>
          Update
        </button>
      </div>
    </div>
  );
};

export default HelloWorld;
