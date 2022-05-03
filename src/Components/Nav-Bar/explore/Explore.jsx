import React from "react";
import "./Explore.css";
import ExploreCard from "../../Card/ExploreCard";
import { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import Collection from "../../../artifacts/contracts/CoreCollection.sol/CoreCollection.json";
import { carddata } from "./DataExplore";
import { AppContext } from "../../../App";
import { useQuery, gql } from "@apollo/client";
import { GET_All_Collections } from "../../../Graphql/collectionQuerys";

export const Explore = () => {
  const GET_Collections = gql`
    query {
      collections {
        id
        name
        collectionId
        creator
        collectionLink
      }
    }
  `;
  const { data } = useQuery(GET_Collections);
  // console.log(data.collections[0].creator);
  const { collectionAddress } = useContext(AppContext);
  let provider;
  const [allcollections, setAllCollections] = useState([]);
  // const onPageLoad = async () => {
  //   provider = new ethers.providers.Web3Provider(window.ethereum);
  // };

  useEffect(async () => {
    // await onPageLoad();
    if (data) {
      fetchAllCollections();
    }
    window.scrollTo(0, 0);
  }, [data]);

  const fetchAllCollections = async () => {
    //   const contract = new ethers.Contract(
    //     collectionAddress,
    //     Collection.abi,
    //     provider
    //   );

    try {
      // const collections = await contract.getAllCollections();

      setAllCollections([]);
      for (let i = 0; i < data.collections.length; i++) {
        // const collection = await contract.collections(collections[i]);
        // console.log(collection[3])
        const ipfsLink = data.collections[i].collectionLink;
        const obj = {
          id: data.collections[i].collectionId,
          name: data.collections[i].name,
          creator: data.collections[i].creator,
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
