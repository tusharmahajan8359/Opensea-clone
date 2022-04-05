import React from 'react'
import "./ExploreCard.css";
const MyNftCard = () => {
  return (
    <>
    <div className=" col"  >
      <div className="card h-100">
        <img
          src={"https://picsum.photos/200/300"}
          className="card-img-top"
          alt="..."
          style={{ height: "18rem" }}
        />
        <div className="body text-center">
         
          <h4 className="card-title mt-5 mb-3">NFT</h4>
          
          <p className="card-text text-truncate px-5 my-3 description">
           this is nft
          </p>
          <p> 7-item</p>
        </div>

      </div>
    </div>
     
    </>
  )
}

export default MyNftCard