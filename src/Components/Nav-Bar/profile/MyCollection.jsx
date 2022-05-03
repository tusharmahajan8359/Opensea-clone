import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Collection from "../../../artifacts/contracts/CoreCollection.sol/CoreCollection.json";
import MyCollectionCard from "../../Card/MyCollectionCard";
import MyNftCard from "../../Card/MyNftCard";
import { AppContext } from "../../../App";
import { useQuery, gql } from "@apollo/client";
// const collectionAddress = "0x2B060e3322D46f275fac3dc00D5c08d307b8906f";

export const MyCollection = () => {
  const { currentAccount, collectionAddress } = useContext(AppContext);
  // const [currentAccount, setCurrentAccount] = useState('');
  const [collectionList, setCollectionList] = useState([]);
  const [nftList, setNftList] = useState([]);
  const [isNftPageVisible, setNftPageVisible] = useState(false);
  let provider;
  let account = "" + currentAccount;
  console.log(currentAccount);
  const GET_myCollections = gql`
    query {
      collections(
        where: { creator: "0x38C32d2c37FE6Fb5361bC3b01e9ABB4Bf4e00E4e" }
      ) {
        id
        name
        collectionId
        creator
        collectionLink
      }
    }
  `;
  const { data } = useQuery(GET_myCollections);
  console.log(data);
  const onPageLoad = async () => {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    // account = await provider.listAccounts();
    // setCurrentAccount(account[0]);
  };

  useEffect(async () => {
    window.scrollTo(0, 0);
    await onPageLoad();
    fetchMyCollections();
  }, [currentAccount]);

  const fetchMyCollections = async () => {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      collectionAddress,
      Collection.abi,
      signer
    );

    try {
      const collections = await contract.getCollectionIds(currentAccount);
      setCollectionList([]);
      for (let i = 0; i < collections.length; i++) {
        const collection = await contract.collections(collections[i]);
        const items = await contract.getItems(collection[0]);
        const itemCount = items.length;
        const ipfsLink = collection[3];

        const obj = {
          id: collection[0],
          name: collection[1],
          itemCount: itemCount,
          creator: collection[2],
        };

        fetch(ipfsLink)
          .then((res) => res.json())
          .then((data) => {
            obj.description = data.description;
            obj.image = data.image;
            setCollectionList((old) => {
              return [...old, obj];
            });
          });
      }
    } catch (err) {}
    try {
      const NFTs = await contract.getMyNFTs();
      console.log("MyNFTS", NFTs);
      console.log(NFTs[0][3]);
      setNftList([]);
      for (let i = 0; i <= NFTs.length; i++) {
        const ipfsLink = await contract.tokenURI(NFTs[i][0]);

        const obj = {
          // collectionId: state.id,
          id: NFTs[i][0],
          name: NFTs[i][1],
          creator: NFTs[i][2],
        };
        console.log("list nft", obj);
        console.log(ipfsLink);
        fetch(ipfsLink)
          .then((res) => res.json())
          .then((data) => {
            obj.description = data.description;
            obj.image = data.image;
            obj.collectionId = data.collectionId;
            setNftList((old) => {
              return [...old, obj];
            });
          });

        //   console.log("list nft", obj);
      }
    } catch (err) {}
  };

  window.ethereum.on("accountsChanged", async () => {
    await onPageLoad();
  });

  return (
    <div className="container px-5 mb-5">
      <h1 className="heading-secondary mt-5">My Collections</h1>
      <p className="subheading text-muted">
        Create, curate, and manage collections of unique NFTs to share and sell.
        <span
          className="d-inline-block box-shadow rounded-circle p-1 px-3 fs-2 m-2"
          tabIndex="0"
          data-bs-toggle="popover"
          data-bs-trigger="hover focus"
          data-bs-content="Collections can be created either directly on Oasis or imported from an existing smart contract. You can also mint on other services like Rarible or Mintable and import the items to Oasis. Learn more about creating NFTs for free on Oasis"
        >
          i
        </span>
      </p>
      <Link to="/my-collections/create" className="btn btn-primary btn-lg me-3">
        Create a Collection
      </Link>

      {isNftPageVisible ? (
        <button
          type="button"
          className="btn btn-outline-primary btn-lg  px-5 mx-3 fs-3"
          onClick={() => setNftPageVisible(false)}
        >
          My Collection's
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-outline-primary btn-lg  px-5 mx-3 fs-3"
          onClick={() => setNftPageVisible(true)}
        >
          {/* <BsThreeDotsVertical size={24} /> */}
          My NFT's
        </button>
      )}

      <h3 className="text-center heading-tertiary mt-5">
        {isNftPageVisible ? "My NFTs" : "My Collections"}
      </h3>
      {isNftPageVisible ? (
        <div className="row row-cols-md-3 gy-3 p-0 m-5">
          {nftList.map((data, index) => {
            console.log("data", data);
            return <MyNftCard key={index} nftdata={data} />;
          })}
        </div>
      ) : (
        <div className="row row-cols-md-3 gy-5  mt-5">
          {collectionList.map((list, index) => {
            return <MyCollectionCard key={index} collection={list} />;
          })}
        </div>
      )}
    </div>
  );
};

{
  /* <div className="row row-cols-md-3 gy-3 p-0 m-5">
        {nftList.map((data, index) => {
          return <MyNftCard key={index} nftdata={data} />;
        })}
      </div> */
}
