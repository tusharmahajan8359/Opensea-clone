import React, { useEffect, useState } from 'react'
import { ethers } from "ethers";
import Collection from "../../artifacts/contracts/CoreCollection.sol/CoreCollection.json";
import Market from "../../artifacts/contracts/Market.sol/Market.json";

const collectionAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const marketAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";


const NFTOffer = ({ TOKENID }) => {
    const [offerList, setOfferList] = useState([]);

    useEffect(async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            marketAddress,
            Market.abi,
            signer
        );

        // const offers = await contract.idToOffers(TOKENID);
        // for (let i = 0; i < offers.length; i++) {
        //     const offer = {
        //         user: await contract.offerIdToUser(offers[i]),
        //         price: await contract.offerIdToPrice(offers[i]),
        //         status: await contract.offerStatus(offers[i])
        //     }
        //     setOfferList((old) => {
        //         return [...old, offer];
        //     })

        // }

    }, [])

    const aceeptOffer = async (user) => {
        //  await contract.offerIdToUser(offers[i]) 
    }

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
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">price</th>
                                    <th scope="col">User</th>
                                    <th scope="col">status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {offerList.map((data, index) => {

                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{data.price}</td>
                                        <td>{data.user}</td>
                                        <td>{data.status}</td>
                                        <td>
                                            <button type="button"
                                                className="btn btn-primary"
                                                onClick={() => aceeptOffer(data.user)}
                                            >
                                                Accept Offer
                                            </button>
                                        </td>
                                    </tr>
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NFTOffer