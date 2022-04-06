import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ethers, Signer } from "ethers";
import MyNftCard from "../../Card/MyNftCard";
import Collection from "../../../artifacts/contracts/CoreCollection.sol/CoreCollection.json";

const collectionAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

const CollectionDetails = () => {
  let location = useLocation();
  let { state } = location.state;
  let provider;
  console.log("data", state);

  const onPageLoad = async () => {
    provider = new ethers.providers.Web3Provider(window.ethereum);
  };

  useEffect(async () => {
    await onPageLoad();
    getNFTs();
  });

  const getNFTs = async () => {
    const contract = new ethers.Contract(
      collectionAddress,
      Collection.abi,
      provider
    );

    try {
      const items = await contract.getItems(state.id);
      for (let i = 0; i < items.length; i++) {
        const item = await contract.NFTs(items[i]);

        const ipfsLink = await contract.tokenURI(item[0]);

        const obj = {
          id: item[0],
          name: item[1],
          creator: item[2],
        };
        fetch(ipfsLink)
          .then((res) => res.json())
          .then((data) => {
            obj.description = data.description;
            obj.image = data.image;
            console.log(obj);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className=" text-center">
        <h1>Collection Details</h1>
        <div className="m-5 ">
          <img src={state.image} alt={state.name} style={{ height: "350px" }} />
        </div>

        <h3>Collection Name :{state.name}</h3>
        <h4>Collection Owner : {state.creator}</h4>
        <h4>Collection Description : {state.description}</h4>
      </div>
      <hr />
      <h3 className="text-center">NFT's</h3>

      <div className="row row-cols-md-3 gy-3 p-0 m-5">
        <MyNftCard />
        <MyNftCard />
        <MyNftCard />
      </div>
    </div>
  );
};

export default CollectionDetails;
