import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const Offers = (props) => {
  const [tableVisibility, setTableVisibility] = useState(false);
  useEffect(() => {
    if (props.data.offers && props.data.offers.length > 0) {
      setTableVisibility(true);
    }
  }, []);
  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id="headingThree">
        <button
          className="accordion-button fs-2 collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseThree"
          aria-expanded="false"
          aria-controls="collapseThree"
        >
          Offers
        </button>
      </h2>
      <div
        id="collapseThree"
        className="accordion-collapse collapse"
        aria-labelledby="headingThree"
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body fs-3">
          <div className="table-responsive-md">
            {tableVisibility ? (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">price</th>
                    <th scope="col">User</th>
                  </tr>
                </thead>
                <tbody>
                  {props.data.offers.map((data, index) => {
                    const price = ethers.utils.formatEther(
                      "" + JSON.parse(data.offerPrice)
                    );

                    return (
                      <tr key={index}>
                        <th scope="row">{index}</th>
                        <td>{price}</td>
                        <td title={data.offerSender}>
                          {data.offerSender.slice(0, 4) +
                            "..." +
                            data.offerSender.slice(39, 42)}
                        </td>

                        {props.ifOwner ? (
                          <td>
                            {props.currentAccount ==
                              data.offerSender.toLowerCase() && (
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => props.cancelOffer(data.offerId)}
                              >
                                Cancel Offer
                              </button>
                            )}
                          </td>
                        ) : (
                          <td>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() => props.acceptOffer(data.offerId)}
                            >
                              Accept Offer
                            </button>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <h1>No Offers</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;
