import React from "react";

const NFTDescription = ({ nftData, TOKENID, collectionAddress }) => {
  return (
    <div className="accordion" id="">
      <div className="accordion-item discription">
        <h2 className="accordion-header " id="panelsStayOpen-headingOne">
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
              Created by :-
              <span className="text-primary fs-5 ms-1">{nftData.creator}</span>
            </p>
            <p className="description">Descrioption :-{nftData.description}</p>
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
                {collectionAddress}
              </p>
            </div>
            <div className="detail-item contract-address">
              <p className="title">Token Id</p>
              <p className="text ms-5 text-truncate address">#{TOKENID}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDescription;
