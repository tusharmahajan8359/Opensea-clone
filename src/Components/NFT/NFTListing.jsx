import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { gql, useQuery } from "@apollo/client";
const NFTListing = ({ TOKENID }) => {
  const [list, setList] = useState([]);
  const myTokenId = '"' + TOKENID + '"';
  const getListing = gql`
    query {
      listings(where:{tokenId:${myTokenId}}){
          id
          tokenId
          price
          time
  }
    }
  `;

  const { data } = useQuery(getListing);
  //   console.log(data.itemLists);

  useEffect(() => {
    if (data) {
      setList(data.listings);
      console.log(data.listings);
    }
  }, [data]);

  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id="headingTwo">
        <button
          className="accordion-button fs-2 collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseTwo"
          aria-expanded="false"
          aria-controls="collapseTwo"
        >
          Listing
        </button>
      </h2>
      <div
        id="collapseTwo"
        className="accordion-collapse collapse"
        aria-labelledby="headingTwo"
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body fs-3">
          <div className="table-responsive-md">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Price</th>
                  <th scope="col">Date</th>
                  <th scope="col">Time</th>
                </tr>
              </thead>
              <tbody>
                {list.map((listdata, index) => {
                  const price = ethers.utils.formatEther(
                    "" + JSON.parse(listdata.price)
                  );

                  const date = new Date(listdata.time * 1000);
                  let listdate =
                    date.getDate() +
                    "/" +
                    (date.getMonth() + 1) +
                    "/" +
                    date.getFullYear();
                  let listtime =
                    date.getHours() +
                    ":" +
                    date.getMinutes() +
                    ":" +
                    date.getSeconds();

                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>

                      <td>{price}</td>

                      <td>{listdate}</td>

                      <td>{listtime}</td>
                      <td></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTListing;
