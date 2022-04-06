import React from "react";
import { FaAsterisk } from "react-icons/fa";
import "./CreateCollection.css";
import { useState, useRef } from "react";
import {useHistory,Link} from "react-router-dom"
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import Collection from "../../../artifacts/contracts/CoreCollection.sol/CoreCollection.json";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const collectionAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

export const CreateCollection = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [fileUrl, setFileUrl] = useState(null);
  const [description, setDescription] = useState("");
  const _name = useRef();
  const history=useHistory();

  async function onFileUpload(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
      console.log("Image URL: ", url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
    console.log("Image Upload Complete");
    handleCreateButton();
  }

  async function uploadToIPFS() {
    console.log("uploading to IPFS...");
    if (!description || !fileUrl) return;
    /* first, upload to IPFS */
    const data = JSON.stringify({
      description,
      image: fileUrl,
    });
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;

      console.log("Collection Link: ", url);
      return url;
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

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
    const url = await uploadToIPFS();

    await contract
      .createCollection(_name.current.value, url)
      .then(async (transaction) => {
        const tx = await transaction.wait();
        let event = await tx.events.find(
          (event) => event.event === "CollectionCreated"
        );
        console.log("Collection ID: ", parseInt(event.args[1]._hex, 16));
        history.push("/my Collections")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCreateButton = () => {
    const bool = Boolean(!(_name.current.value && fileUrl));
    setIsDisabled(bool);
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
          <label htmlFor="formFile" className="form-label">
            Collection Banner Image
            <FaAsterisk className="text-danger m-2" size={8} />
          </label>
          <p className="sub-title text-muted">Max size: 100 MB</p>
          <input
            type="file"
            name="Asset"
            className="my-4"
            onChange={onFileUpload}
            required
          />
          <br />
          {fileUrl && (
            <img className="rounded mt-4" width="350" src={fileUrl} />
          )}
        </div>

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
            onChange={handleCreateButton}
            placeholder="Example: Treasures of the Sea"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <p className="sub-title text-muted">
            <Link className="link text-decoration-none" to="/">
              Markdown
            </Link>{" "}
            syntax is supported. 0 of 1000 characters used.
          </p>
          <textareLink
            className="form-control"
            id="description"
            rows="4"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textareLink>
        </div>

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
