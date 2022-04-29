import React from "react";
import "./Explore.css";
import ExploreCard from "../../Card/ExploreCard";
import { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import Collection from "../../../artifacts/contracts/CoreCollection.sol/CoreCollection.json";
import { carddata } from "./DataExplore";
import { AppContext } from "../../../App";
// const collectionAddress = "0x2B060e3322D46f275fac3dc00D5c08d307b8906f";

export const Explore = () => {
  const { collectionAddress } = useContext(AppContext);
  let provider;
  const [allcollections, setAllCollections] = useState([]);
  const onPageLoad = async () => {
    provider = new ethers.providers.Web3Provider(window.ethereum);
  };

  useEffect(async () => {
    await onPageLoad();
    fetchAllCollections();
    window.scrollTo(0, 0);
  }, []);

  const fetchAllCollections = async () => {
    const contract = new ethers.Contract(
      collectionAddress,
      Collection.abi,
      provider
    );

    try {
      const collections = await contract.getAllCollections();

      setAllCollections([]);
      for (let i = 0; i < collections.length; i++) {
        const collection = await contract.collections(collections[i]);
        // console.log(collection[3])
        const ipfsLink = collection[3];
        const obj = {
          id: collection[0],
          name: collection[1],
          creator: collection[2],
        };
        fetch(ipfsLink)
          .then((res) => res.json())
          .then((data) => {
            obj.description = data.description;
            obj.image = data.image;
            setAllCollections((old) => {
              return [...old, obj];
            });
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="section-explore">
      <h2 className="title heading-secondary my-5">Explore Collections</h2>
      <div className="container-card">
        {allcollections.map((data, index) => {
          return <ExploreCard key={index} collectiondata={data} />;
        })}
      </div>
    </main>
  );
};
