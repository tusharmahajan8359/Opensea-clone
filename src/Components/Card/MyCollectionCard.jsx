import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const MyCollectionCard = ({ collection }) => {
  const history = useHistory();

  const handleClick = () => {
    console.log("my clicked collection", collection);

    history.push(`/collection-details/${collection.id}`, { state: collection });
  };

  return (
    <>
      <div className="col" onClick={handleClick}>
        <div className="card h-100 box-shadow">

          <img
            src={collection.image}
            className="mx-auto d-block"
            alt="..."
            style={{ height: "24rem", width: "100%" }}
          />

          <div className="body text-center">
            <h4 className="card-title mt-4 fs-2">{collection.name}</h4>
            <div className="author">
              <small> by</small>
              <span className="text-primary">
                {collection.creator.slice(0, 5) +
                  "..." +
                  collection.creator.slice(38, 42)}
              </span>
            </div>
            <p className="card-text text-truncate  mb-3 description">
              {collection.description}
            </p>
            <p className="fs-4"> {collection.itemCount}-item</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCollectionCard;
