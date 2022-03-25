import React from "react";
import { BsPersonCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import { MetamaskLanding } from "./MetamaskLanding";

import "./wallet.css";
export const Wallet = (props) => {
  const connectWallet = async () => {
    console.log(props);
    if (!props.stateData.isConnected) {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      let balance = await provider.getBalance(account);
      balance = ethers.utils.formatEther(balance);
      console.log(balance);
      props.setStateData({
        ...props.stateData,
        isConnected: true,
        account,
        balance,
      });
    }
  };

  window.ethereum.on("accountsChanged", function (accounts) {
    connectWallet();
  });

  if (!props.stateData.isConnected) {
    return (
      <div className="wallet">
        <div className="wallet-header border-bottom">
          <p className="Wallet-name fs-2">
            <span className="profile-avtar me-3">
              <BsPersonCircle size={36} />
            </span>
            My Wallet
          </p>
        </div>
        <div className="wallet-body">
          <p className="text subheading">
            Connect with one of our available wallet providers or create a new
            one.
          </p>
          <button
            type="button"
            href="/metamasklanding"
            onClick={connectWallet}
            className="btn btn-primary my-5"
          >
            MetaMask
          </button>
        </div>
      </div>
    );
  } else {
    return <MetamaskLanding stateData={props.stateData} />;
  }
};
