import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { ethers, Signer } from "ethers";
import MyNftCard from "../../Card/MyNftCard";
import Collection from "../../../artifacts/contracts/CoreCollection.sol/CoreCollection.json";
import { AppContext } from "../../../App";
import { gql, useQuery } from "@apollo/client";
// const collectionAddress = "0x2B060e3322D46f275fac3dc00D5c08d307b8906f";

const CollectionDetails = () => {
  let location = useLocation();
  let { state } = location.state;
  console.log(state.id);
  let collectionId = state.id;
  const Get_My_Nfts = gql`
    query {
      nfts (where:{collectionId:${collectionId}}){
        id
        itemId
        nftName
        collectionId
        creator
        nftLink
      }
    }
  `;
  let { data } = useQuery(Get_My_Nfts);
  console.log(data);
  // const Get_Nft_Uri = gql`
  //   query {
  //     tokens(where: { itemId: 1 }) {
  //       id
  //       itemId
  //       tokenURI
  //     }
  //   }
  // `;
  // const nftUri = useQuery(Get_Nft_Uri);
  // console.log(nftUri.data);
  // console.log(tdata);
  const { collectionAddress } = useContext(AppContext);

  const [nftList, setNftList] = useState([]);
  let provider;

  const onPageLoad = async () => {
    provider = new ethers.providers.Web3Provider(window.ethereum);
  };

  useEffect(async () => {
    window.scrollTo(0, 0);
    // await onPageLoad();
    if (data) {
      getNFTs();
    }
  }, [data]);

  const getNFTs = async () => {
    // const contract = new ethers.Contract(
    //   collectionAddress,
    //   Collection.abi,
    //   provider
    // );

    try {
      // const items = await contract.getItems(state.id);
      setNftList([]);
      for (let i = 0; i < data.nfts.length; i++) {
        // const item = await contract.NFTs(items[i]);

        const ipfsLink = data.nfts[i].nftLink;
        // console.log(data.nfts[i]);
        const obj = {
          collectionId: state.id,
          id: data.nfts[i].itemId,
          name: data.nfts[i].nftName,
          creator: data.nfts[i].creator,
        };
        // console.log("hello", data.nfts[i].itemId);
        fetch(ipfsLink)
          .then((res) => res.json())
          .then((data) => {
            obj.description = data.description;
            obj.image = data.image;
            setNftList((old) => {
              return [...old, obj];
            });
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
        {nftList.map((data, index) => {
          console.log(data);
          return <MyNftCard key={index} nftdata={data} />;
        })}
      </div>
    </div>
  );
};

export default CollectionDetails;
