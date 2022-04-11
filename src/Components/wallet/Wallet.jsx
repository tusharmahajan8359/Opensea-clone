import React from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { ethers } from 'ethers';

import OutsideClickHandler from 'react-outside-click-handler';
import WalletCSS from './wallet.module.css';

export const Wallet = (props) => {
  const connectWallet = async () => {
    // console.log(props);
    if (!props.stateData.isConnected) {
      const [account] = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      let balance = await provider.getBalance(account);
      balance = ethers.utils.formatEther(balance);
      // console.log(balance);
      props.setStateData({
        ...props.stateData,
        isConnected: true,
        account,
        balance,
      });
    }
  };

  window.ethereum.on('accountsChanged', function (accounts) {
    connectWallet();
  });

  return (
    <OutsideClickHandler onOutsideClick={() => props.setWallet(false)}>
      <div className={WalletCSS.Wallet}>
        <div className={WalletCSS.WalletHeader}>
          <p className={WalletCSS.WalletName}>
            <span className='profile-avtar me-3'>
              <BsPersonCircle size={36} />
            </span>
            My Wallet
          </p>
          {props.stateData.isConnected && (
            <a
              className={`${WalletCSS.WalletAddress} fs-3 cursor-pointer`}
              title={props.stateData.account}
            >
              {props.stateData.account.slice(0, 4) +
                '...' +
                props.stateData.account.slice(38, 42)}
            </a>
          )}
        </div>
        <div className={WalletCSS.WalletBody}>
          <p className='heading-tertiary '>
            {props.stateData.isConnected
              ? 'Total Balance'
              : `Connect with one of our available wallet providers or create a new one.`}
          </p>
          {props.stateData.isConnected ? (
            <p className={Wallet.Balance}>{props.stateData.balance} ETH</p>
          ) : (
            <button
              type='button'
              onClick={connectWallet}
              className='btn btn-lg btn-primary px-5 py-3 fs-2'
            >
              MetaMask
            </button>
          )}
        </div>
      </div>
    </OutsideClickHandler>
  );
};
