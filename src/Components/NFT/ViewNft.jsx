import React, { useEffect } from "react";
import "./ViewNFT.css";
import {
  BsFillTagsFill,
  BsThreeDotsVertical,
  BsShareFill,
} from "react-icons/bs";
import { FaEthereum, FaWallet } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { ethers } from "ethers";
import { useState } from "react";
import Collection from "../../artifacts/contracts/CoreCollection.sol/CoreCollection.json";
import Market from "../../artifacts/contracts/Market.sol/Market.json";
import SellModal from "../modal/SellModal";
import LowerPriceModal from "../modal/LowerPriceModal";
import SendNftModal from "../modal/SendNftModal";

const collectionAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const marketAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const ViewNft = () => {
  const [owner, setOwner] = useState("");
  const [currentAccount, setCurrentAccount] = useState();
  const [isDisabled, setIsDisabled] = useState(true);
  const [itemStatus, setItemStatus] = useState(false);
  const [nftData, setNftData] = useState({
    collectionName: "",
    nftName: "",
    currentPrice: "",
  });

  const [sellModal, setSellModal] = useState(false);
  const [lowerpriceModal, setLowerPriceModal] = useState(false);
  const [sendnftmodal, setSendNftModal] = useState(false);

  const COLLECTIONID = 1;
  const TOKENID = 1;

  let tokenOwner;
  let provider;
  let contract;
  let marketContract;
  let account;

  useEffect(async () => {
    const func = async () => {
      account = await provider.listAccounts();

      tokenOwner = await contract.ownerOf(TOKENID);
      return account;
    };

    const _account = await func();
    const _status = await marketContract.idToOnSale(TOKENID);
    const _currentPrice = await marketContract.idToPrice(TOKENID);
    const price = ethers.utils.formatEther(_currentPrice).toString();
    const _collectionName = await contract.collections(COLLECTIONID).name;
    console.log(_collectionName);
    const _nftName = await contract.NFTs(TOKENID).nft_name;

    setCurrentAccount(_account[0]);
    setItemStatus(_status);
    setNftData({
      collectionName: _collectionName,
      nftName: _nftName,
      currentPrice: price,
    });

    if (currentAccount === tokenOwner) {
      setOwner("You");
      setIsDisabled(false);
    } else {
      setOwner(tokenOwner);
      setIsDisabled(true);
    }
  }, [owner, currentAccount, itemStatus]);

  window.ethereum.on("accountsChanged", async function () {
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    account = await provider.listAccounts();
    setCurrentAccount(account[0]);
  });
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
    console.log("transfer complete");
    setOwner(_recepient);
  };
  const listForSale = async (selldata) => {
    setSellModal(false);

    const tx = await marketContract.createMarketItem(
      TOKENID,
      ethers.utils.parseEther(selldata),
      "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
      { value: ethers.utils.parseEther("0.25") }
    );
    await tx.wait();
    setNftData({ ...nftData, currentPrice: selldata.toString() });
    setItemStatus(true);
    console.log("Status: ", itemStatus);
  };

  const cancelListing = async () => {
    const tx = await marketContract.cancelListing(
      TOKENID,
      "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
    );
    await tx.wait();
    setItemStatus(false);
    console.log("Status: ", itemStatus);
  };

  const lowerPrice = async (_newPrice) => {
    setLowerPriceModal(false)
    console.log("Price Before: ", await marketContract.idToPrice(TOKENID));
    const transaction = await marketContract.lowerPrice(
      TOKENID,
      ethers.utils.parseEther(_newPrice),
      "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
    );
    await transaction.wait();
    console.log("Price after: ", await marketContract.idToPrice(TOKENID));
    setNftData({ ...nftData, currentPrice: _newPrice.toString() });
  };

  const getItemStatus = async () => {};

  const funct = async () => {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    contract = new ethers.Contract(collectionAddress, Collection.abi, signer);
    marketContract = new ethers.Contract(marketAddress, Market.abi, signer);
  };
  funct();
  getItemStatus();
  return (
    <main className="section-view-nft">
      <div className="nav-item position-sticky">
        <div className="mr-0 sticky-top">
          {isDisabled ? (
            <div></div>
          ) : (
            <div>
              {itemStatus ? (
                <div>
                  <a
                    className="btn btn-outline-primary btn-lg mx-3"
                    href="#"
                    role="button"
                    onClick={cancelListing}
                  >
                    Cancel Listing
                  </a>
                  <a
                    className="btn btn-primary btn-lg mx-3"
                    href="#"
                    role="button"
                    onClick={() => setLowerPriceModal(true)}
                  >
                    Lower Price
                  </a>
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
                  <a
                    className="btn btn-primary btn-lg mx-3"
                    href="#"
                    role="button"
                    // onClick={listForSale}
                    onClick={() => setSellModal(true)}
                  >
                    List for Sale
                  </a>
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
              <div className="nft-container">
                <img
                  src="https://source.unsplash.com/collection/190727/500x500"
                  alt=""
                  style={{ width: " 100%" }}
                />
              </div>
            </div>
            <div className="accordion" id="">
              <div className="accordion-item discription">
                <h2
                  className="accordion-header "
                  id="panelsStayOpen-headingOne"
                >
                  <button
                    className="accordion-button  fs-2"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseOne"
                    aria-expanded="true"
                    aria-controls="panelsStayOpen-collapseOne"
                  >
                    Description
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseOne "
                  className="accordion-collapse collapse show"
                  aria-labelledby="panelsStayOpen-headingOne"
                >
                  <div className="accordion-body  fs-3">
                    <p className="text-muted">
                      Created by{" "}
                      <span className="text-primary">owner-name</span>
                    </p>
                    <p className="description">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Possimus, rem molestias unde maxime ipsa expedita quas
                      quos deleniti placeat dicta qui in hic nostrum ducimum.
                    </p>
                  </div>
                </div>
              </div>
              <div className="accordion-item detail">
                <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                  <button
                    className="accordion-button fs-2 collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseTwo"
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseTwo"
                  >
                    Details
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="panelsStayOpen-headingTwo"
                >
                  <div className="accordion-body fs-3 py-5">
                    <div className="detail-item contract-address">
                      <p className="title">Contract Address</p>
                      <p className="text ms-5 text-truncate address">
                        jhtdfdkudlukufdkyutffflyuffdufofluf
                      </p>
                    </div>
                    <div className="detail-item contract-address">
                      <p className="title">Token Id</p>
                      <p className="text ms-5 text-truncate address">
                        ukufdkyutffflyuffdufofluf
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="nft-text-container">
              <div className="about-collection">
                <span className="collection-name text-primary fs-3">
                  my-own-collections
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
                    <button type="button" className="btn btn-outline-secondary">
                      <BsThreeDotsVertical size={18} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="about-nft">
                <p className="nft-name fs-2 mb-3">my-profile-pic</p>
                <p className="owner text-muted fs-4">
                  owned by{" "}
                  <span className="text-primary cursor-pointer">{owner}</span>
                </p>
              </div>
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
                      <a href="#" className="btn btn-lg btn-primary m-3">
                        <FaWallet className="mx-3" size={24} />
                        Buy Now
                      </a>
                      <a
                        href="#"
                        className="btn btn-lg btn-outline-primary m-3"
                      >
                        <BsFillTagsFill className="mx-3" size={24} />
                        Make Offer
                      </a>
                    </div>
                  ) : (
                    <div>
                      <a
                        href="#"
                        className="btn btn-lg disabled btn-primary m-3"
                      >
                        <FaWallet className="mx-3" size={24} />
                        Buy Now
                      </a>
                    </div>
                  )}
                  {/* <a href="#" className="btn btn-lg btn-primary m-3">
                    <FaWallet className="mx-3" size={24} />
                    Buy Now
                  </a>
                  <a href="#" className="btn btn-lg btn-outline-primary m-3">
                    <BsFillTagsFill className="mx-3" size={24} />
                    Make Offer
                  </a> */}
                </div>
              </div>

              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button fs-2 collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Listing
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body fs-3">
                      <strong>This is the second item's accordion body.</strong>{" "}
                      It is hidden by default, until the collapse plugin adds
                      the appropriate classes that we use to style each element.
                      These classes control the overall appearance, as well as
                      the showing and hiding via CSS transitions. You can modify
                      any of this with custom CSS or overriding our default
                      variables. It's also worth noting that just about any HTML
                      can go within the <code>.accordion-body fs-3</code>,
                      though the transition does limit overflow.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingThree">
                    <button
                      className="accordion-button fs-2 collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Offers
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body fs-3">
                      <strong>This is the third item's accordion body.</strong>{" "}
                      It is hidden by default, until the collapse plugin adds
                      the appropriate classes that we use to style each element.
                      These classes control the overall appearance, as well as
                      the showing and hiding via CSS transitions. You can modify
                      any of this with custom CSS or overriding our default
                      variables. It's also worth noting that just about any HTML
                      can go within the <code>.accordion-body fs-3</code>,
                      though the transition does limit overflow.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ViewNft;
