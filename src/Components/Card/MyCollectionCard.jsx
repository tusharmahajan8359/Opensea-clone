import React, { useState } from "react";
import "./ExploreCard.css";
import { useHistory } from "react-router-dom";
import { setCollectionData } from "../../actions/index";
import { useDispatch } from "react-redux";

const MyCollectionCard = ({ collection }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = () => {
    console.log("my clicked collection", collection);
    dispatch(setCollectionData(collection));
    history.push("/CollectionDetails", { state: collection });
  };

  return (
    <>
      <div className=" col" onClick={handleClick}>
        <div className="card h-100">
          <img
            src={collection.image}
            className="card-img-top"
            alt="..."
            style={{ height: "18rem" }}
          />
          <div className="body text-center">
            <h4 className="card-title mt-5 mb-3">{collection.name}</h4>
            <p className="author mb-3 fs-4">
              by{" "}
              <span className="text-primary ms-2">
                {collection.creator.slice(0, 5) +
                  "..." +
                  collection.creator.slice(38, 42)}
              </span>
            </p>
            <p className="card-text text-truncate px-5 my-3 description">
              {collection.description}
            </p>
            <p> {collection.itemCount}-item</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCollectionCard;
