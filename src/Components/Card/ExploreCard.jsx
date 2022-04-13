import React from "react";
import "./ExploreCard.css";
import { useHistory, useNavigate } from "react-router-dom";

const ExploreCard = ({ collectiondata }) => {
  const history = useHistory();
  const handleClick = () => {
    console.log(collectiondata)
    history.push(`/collection-details/${collectiondata.id}`, { state: collectiondata });
  };

  return (
    <div className="card h-100" onClick={handleClick} style={{ width: "30rem" }}>
      <img
        src={collectiondata.image}
        className='mx-auto d-block'
        alt="..."
        style={{ height: "24rem", width: "100%" }}
      />
      <div className="body  text-center">
        <h4 className="card-title mt-5 mb-3">{collectiondata.name}</h4>
        <p className="author mb-3 fs-4">
          by<span className="text-primary ms-2">{collectiondata.creator.slice(0, 5) + "....." + collectiondata.creator.slice(35, 42)}</span>
        </p>
        <p className="card-text text-truncate px-5 my-3 description">
          {collectiondata.description}
        </p>
      </div>
    </div>
  );
};

export default ExploreCard;
