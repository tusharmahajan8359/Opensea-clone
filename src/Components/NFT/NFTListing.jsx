import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
const NFTListing = ({ TOKENID }) => {
  const [list, setList] = useState([]);
  const getListing = gql`
    query {
      itemLists(where: { tokenId: ${TOKENID}, status: true }) {
        id
        tokenId
        price
        status
      }
    }
  `;

  const { data } = useQuery(getListing);
  //   console.log(data.itemLists);

  useEffect(() => {
    if (data) {
      console.log(data.itemLists);
      setList(data.itemLists);
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
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                {console.log(list)}
                {list.map((listdata, index) => {
                  return (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{listdata.price}</td>
                      {/* <td>Otto</td>
                      <td>@mdo</td> */}
                      <td>
                        {/* <button type="button" className="btn btn-primary">
                          Cancel
                        </button> */}
                      </td>
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
