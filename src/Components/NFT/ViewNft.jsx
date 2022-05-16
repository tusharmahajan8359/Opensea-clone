import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import "./ViewNFT.css";
import {
  BsFillTagsFill,
  BsThreeDotsVertical,
  BsShareFill,
} from "react-icons/bs";
import { FaEthereum, FaWallet } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { ethers } from "ethers";
import Collection from "../../artifacts/contracts/CoreCollection.sol/CoreCollection.json";
import Market from "../../artifacts/contracts/Market.sol/Market.json";
import SellModal from "../modal/SellModal";
import LowerPriceModal from "../modal/LowerPriceModal";
import SendNftModal from "../modal/SendNftModal";
import Offers from "./Offers";
import NFTListing from "./NFTListing";
import NFTDescription from "./NFTDescription";
import NFTOfferModal from "../modal/NFTOfferModal";
import { AppContext } from "../../App";
import { gql, useQuery, useLazyQuery } from "@apollo/client";

const ViewNft = () => {
  const { currentAccount, marketAddress, collectionAddress } =
    useContext(AppContext);

  let location = useLocation();
  let { state } = location.state;

  const [owner, setOwner] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [itemStatus, setItemStatus] = useState(false);
  const [sellModal, setSellModal] = useState(false);
  const [lowerpriceModal, setLowerPriceModal] = useState(false);
  const [sendnftmodal, setSendNftModal] = useState(false);
  const [offerModal, setOfferModal] = useState(false);
  let tokenOwner;
  let provider;
  let contract;
  let marketContract;
  let COLLECTIONID = state.collectionId;
  let TOKENID = state.id;

  const [nftData, setNftData] = useState({
    collectionName: "",
    nftName: "",
    creator: "",
    currentPrice: "",
    onSale: false,
  });

  useEffect(async () => {
    window.scrollTo(0, 0);
    getAllData();
  }, [owner, currentAccount, itemStatus]);

  const getAllData = async () => {
    const _tokenURI = await contract.tokenURI(TOKENID);
    tokenOwner = await contract.ownerOf(TOKENID);

    const _currentPrice = await marketContract.idToPrice(TOKENID);

    const price = ethers.utils.formatEther(_currentPrice).toString();

    const _collectionName = await contract.collections(COLLECTIONID);

    const _nftData = await contract.NFTs(TOKENID);
    const itemSaleStatus = await marketContract.idToOnSale(TOKENID);

    fetch(_tokenURI)
      .then((res) => res.json())
      .then((data) => {
        setNftData({ ...nftData, description: data.description });
      });

    setNftData({
      ...nftData,
      collectionName: _collectionName[1],
      nftName: _nftData[1],
      creator: _nftData[2],
      image: _nftData[3],
      currentPrice: price,
      onSale: itemSaleStatus,
    });

    if (currentAccount === tokenOwner.toLowerCase()) {
      setOwner("You");
      setIsDisabled(false);
    } else {
      setOwner(tokenOwner);
      setIsDisabled(true);
    }
  };

  const testFunc = async () => {
    const collection = await contract.collections(COLLECTIONID);
    const nft = await contract.NFTs(TOKENID);
  };
  /**
   *
   *
   * @param {*} _recepient
   */
  const sendNFT = async (_recepient) => {
    setSendNftModal(false);
    tokenOwner = await contract.ownerOf(TOKENID);
    const transaction = await contract.transferFrom(
      tokenOwner,
      _recepient,
      TOKENID
    );
    await transaction.wait();
    setOwner(_recepient);
  };
  const listForSale = async (sellprice) => {
    setSellModal(false);

    const isApproved = await contract.isApprovedForAll(
      currentAccount,
      marketAddress
    );
    if (!isApproved) {
      const transaction = await contract.setApprovalForAll(marketAddress, true);
      await transaction.wait();
    }
    const tx = await marketContract.createMarketItem(
      TOKENID,
      ethers.utils.parseEther(sellprice),
      collectionAddress,
      { value: ethers.utils.parseEther("0.00025") }
    );
    await tx.wait();
    setNftData({
      ...nftData,
      currentPrice: sellprice.toString(),
      onSale: true,
    });
    setItemStatus(true);
    getReload();
  };

  const cancelListing = async () => {
    const tx = await marketContract.cancelListing(TOKENID, collectionAddress);
    await tx.wait();
    setNftData({ ...nftData, onSale: false });
    setItemStatus(false);
  };

  const lowerPrice = async (_newPrice) => {
    setLowerPriceModal(false);

    const transaction = await marketContract.lowerPrice(
      TOKENID,
      ethers.utils.parseEther(_newPrice),
      collectionAddress
    );
    await transaction.wait();

    setNftData({ ...nftData, currentPrice: _newPrice.toString() });
  };

  const buyNFT = async () => {
    const tx = await marketContract.buyNFT(TOKENID, collectionAddress, {
      value: ethers.utils.parseEther(nftData.currentPrice),
    });
    await tx.wait();
    setItemStatus(false);
    setNftData({ ...nftData, onSale: false });
  };

  const funct = async () => {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    contract = new ethers.Contract(collectionAddress, Collection.abi, signer);
    marketContract = new ethers.Contract(marketAddress, Market.abi, signer);
  };

  const handleMakeOffer = async (offerprice) => {
    setOfferModal(false);

    const tx = await marketContract.makeOffer(
      TOKENID,
      ethers.utils.parseEther(offerprice.toString()),
      collectionAddress,
      {
        value: ethers.utils.parseEther(offerprice.toString()),
      }
    );
    await tx.wait(1);
    getReload();
  };

  const acceptOffer = async (index) => {
    const txt = await marketContract.acceptOffer(
      TOKENID,
      index,
      collectionAddress
    );
    await txt.wait();
    getReload();
  };
  const cancelOffer = async (index) => {
    const txt = await marketContract.cancelOffer(
      TOKENID,
      index,
      collectionAddress
    );
    await txt.wait();
    getReload();
  };

  //offer data fetching function
  const myTokenId = '"' + TOKENID + '"';
  const GET_Offers = gql`
    query {
      offers(where: { tokenId: ${myTokenId} }) {
        id
        offerId
        tokenId
        offerPrice
        offerSender
        status
      }
    }
  `;

  //Listing query function
  const Get_ListData = gql`query{
    itemLists(first: 1 where:{tokenId:${myTokenId}}) {
      id
      tokenId
      price
      status
    }
  }`;
  // console.log("before");
  const offersData = useQuery(GET_Offers);
  const listData = useQuery(Get_ListData, {
    onCompleted: (data) => {
      console.log("onCompleted", data.itemLists[0].status);
      if (data.itemLists) {
        setItemStatus(data.itemLists[0].status);
      }
    },
  });

  funct();
  const getReload = () => {
    window.location.reload(false);
  };
  return (
    <main className="section-view-nft">
      <div className="nav-item position-sticky">
        <div className="mr-0 sticky-top">
          {isDisabled || (
            <div>
              {itemStatus ? (
                <div>
                  <button
                    className="btn btn-outline-primary btn-lg mx-3"
                    to="#"
                    role="button"
                    onClick={cancelListing}
                  >
                    Cancel Listing
                  </button>
                  <button
                    className="btn btn-primary btn-lg mx-3"
                    to="#"
                    role="button"
                    onClick={() => setLowerPriceModal(true)}
                  >
                    Lower Price
                  </button>
                  {lowerpriceModal && (
                    <LowerPriceModal
                      show={lowerpriceModal}
                      handleClose={setLowerPriceModal}
                      lowerPrice={lowerPrice}
                    />
                  )}
                </div>
              ) : (
                <div>
                  <button
                    className="btn btn-primary btn-lg mx-3"
                    role="button"
                    // onClick={listForSale}
                    onClick={() => setSellModal(true)}
                  >
                    List for Sale
                  </button>
                  {sellModal && (
                    <SellModal
                      show={sellModal}
                      handleClose={setSellModal}
                      listForSale={listForSale}
                    />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="container-nft">
        <div className="row mb-5">
          <div className="col-md-5">
            <div className="nft-preview mb-5">
              <div className="blockChain-type p-3">
                <FaEthereum size={28} />
              </div>
              <div className="nft-container d-flex justify-content-center align-items-center">
                {/* {console.log(nftData.image)} */}
                <img
                  src={state.image}
                  alt=""
                  style={{ height: "100%", width: "auto" }}
                />
              </div>
            </div>

            <NFTDescription
              nftData={state}
              TOKENID={TOKENID}
              collectionAddress={collectionAddress}
            />
          </div>
          <div className="col-md-7">
            <div className="nft-text-container">
              <div className="about-collection">
                <span className="collection-name text-primary fs-3">
                  {nftData.collectionName}
                </span>
                <div className="collection-feature">
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic outlined example"
                  >
                    {isDisabled ? (
                      <div></div>
                    ) : itemStatus ? (
                      <div />
                    ) : (
                      <div>
                        <button
                          onClick={() => setSendNftModal(true)}
                          type="button"
                          className="btn btn-outline-secondary"
                        >
                          <FiSend size={18} />
                        </button>
                      </div>
                    )}
                    {sendnftmodal && (
                      <SendNftModal
                        show={sendnftmodal}
                        handleClose={setSendNftModal}
                        sendNFT={sendNFT}
                      />
                    )}

                    <button type="button" className="btn btn-outline-secondary">
                      <BsShareFill size={18} />
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={testFunc}
                    >
                      <BsThreeDotsVertical size={18} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="about-nft">
                <p className="nft-name fs-2 mb-3">{nftData.nftName}</p>
                <p className="owner text-muted fs-4">
                  owned by :-
                  <span className="text-primary cursor-pointer">{owner}</span>
                </p>
              </div>
              {nftData.onSale && (
                <div className="card pricing-card">
                  <div className="card-header fs-3">Current Price</div>
                  <div className="card-body">
                    {itemStatus ? (
                      <div>
                        <p className="text">
                          <FaEthereum size={28} />
                          <span className="price fs-3">
                            {nftData.currentPrice.toString()}
                          </span>
                        </p>
                      </div>
                    ) : (
                      <div />
                    )}
                    {isDisabled ? (
                      <div>
                        <button
                          className="btn btn-lg btn-primary m-3"
                          onClick={buyNFT}
                        >
                          <FaWallet className="mx-3" size={24} />
                          Buy Now
                        </button>
                        <button
                          className="btn btn-lg btn-outline-primary m-3"
                          // onClick={() => handleMakeOffer(1)}
                          onClick={() => setOfferModal(true)}
                        >
                          <BsFillTagsFill className="mx-3" size={24} />
                          Make Offer
                        </button>
                        {offerModal && (
                          <NFTOfferModal
                            show={offerModal}
                            handleClose={setOfferModal}
                            offer={handleMakeOffer}
                          />
                        )}
                      </div>
                    ) : (
                      <div>
                        <button
                          to="#"
                          className="btn btn-lg disabled btn-primary m-3"
                        >
                          <FaWallet className="mx-3" size={24} />
                          Buy Now
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="accordion" id="accordionExample">
                <NFTListing TOKENID={TOKENID} />
                {/* {offersData.loading && console.log("loded data")} */}

                {offersData.data && (
                  <Offers
                    ifOwner={isDisabled}
                    currentAccount={currentAccount}
                    data={offersData.data}
                    acceptOffer={acceptOffer}
                    cancelOffer={cancelOffer}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ViewNft;
