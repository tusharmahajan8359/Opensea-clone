import React from "react";
import { FaAsterisk } from "react-icons/fa";
import "./CreateCollection.css";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { ethers } from "ethers";
import Collection from "../../../artifacts/contracts/CoreCollection.sol/CoreCollection.json";

const collectionAddress = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318";

export const CreateCollection = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const _name = useRef();

  const createCollection = async () => {
    await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      collectionAddress,
      Collection.abi,
      signer
    );

    await contract
      .createCollection(_name.current.value)
      .then(async (transaction) => {
        const tx = await transaction.wait();
        let event = await tx.events.find(
          (event) => event.event === "CollectionCreated"
        );
        console.log("Collection ID: ", parseInt(event.args[1]._hex, 16));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container-fluid">
      <nav aria-label="breadcrumb" className="border-bottom">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/My Collections">My Collections</Link>
          </li>
          <li className="breadcrumb-item " aria-current="page">
            Create a Collection
          </li>
        </ol>
      </nav>
      <div className="container">
        <h1>Create a Collection</h1>
        <p className="sub-title text-muted">
          <FaAsterisk className="text-danger m-2" size={8} />
          Required fields
        </p>

        <div className="mb-3">
          <label htmlFor="formName" className="form-label">
            Name
            <FaAsterisk className="text-danger m-2" size={8} />
          </label>
          <input
            className="form-control form-control-lg"
            type="text"
            id="formName"
            required
            ref={_name}
            onChange={(e) => {
              e.target.value ? setIsDisabled(false) : setIsDisabled(true);
            }}
            placeholder="Example: Treasures of the Sea"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <p className="sub-title text-muted">
            <a className="link text-decoration-none" href="/">
              Markdown
            </a>{" "}
            syntax is supported. 0 of 1000 characters used.
          </p>
          <textarea
            className="form-control"
            id="description"
            rows="4"
          ></textarea>
        </div>

        {/* <div className='mb-3'>
          <label htmlFor='creator-Earning' className='form-label'>
            Creator Earnings
          </label>
          <p className='sub-title text-muted mb-0'>
            Collect a fee when a user re-sells an item you originally created.
            This is deducted from the final sale price and paid monthly to a
            payout address of your choosing.
          </p>
          <a href='/' className='link text-decoration-none sub-title mt-0'>
            Learn more about creator earnings.
          </a>
          <h6 className='text-muted mt-2'>Percentage fee</h6>
          <input
            className='form-control form-control-lg'
            type='text'
            id='creator-Earning'
            placeholder='Example: 2.5'
          />
        </div> */}

        <button
          className="btn btn-primary my-5 px-4"
          disabled={isDisabled}
          onClick={createCollection}
        >
          Create
        </button>
      </div>
    </div>
  );
};
