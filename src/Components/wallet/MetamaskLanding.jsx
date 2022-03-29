import React from "react";
import { BsPersonCircle } from "react-icons/bs";
import "./wallet.css";
export const MetamaskLanding = (props) => {
  return (
    <div className="wallet">
      <div className="wallet-header border-bottom">
        <p className="Wallet-name fs-3">
          <span className="profile-avtar me-3">
            <BsPersonCircle size={36} />
          </span>
          My Wallet
        </p>
        <a className="wallet-address text-truncate fs-3 ms-5">
          {props.stateData.account}
        </a>
      </div>
      <div className="wallet-body border my-2">
        <p className="text text-muted my-3">Total balance</p>
        <p className="balance">{props.stateData.balance} ETH</p>
      </div>
    </div>
  );
};
