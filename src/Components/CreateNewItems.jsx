import React from "react";
import "./CreateNewItem.css";
import { FaAsterisk, FaPlus, FaStar } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import Collection from "../artifacts/contracts/CoreCollection.sol/CoreCollection.json";

const collectionAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

const SAMPLE_TOKEN_URI = "http://test.com";

export const CreateNewItems = () => {
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [currentAccount, setAccount] = useState();
  const [isDisabled, setIsDisabled] = useState(true);

  let _name = useRef();
  let _link = useRef();

  useEffect(() => {
    const fetchCollections = async () => {
      let collectionNames = [];
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(account);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        collectionAddress,
        Collection.abi,
        provider
      );

      let collectionIds = await contract.getCollectionIds(account);
      for (let i = 0; i < collectionIds.length; i++) {
        const element = collectionIds[i];
        const dt = await contract.collections(element);
        const obj = {
          index: i,
          CollectionName: dt.name.toString(),
        };
        collectionNames.push(obj);
      }
      return collectionNames;
    };

    const stateData = fetchCollections();
    stateData.then((log) => setCollections(log));
  }, [currentAccount]);

  window.ethereum.on("accountsChanged", async function (accounts) {
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(account);
    setSelectedCollection(null);
  });

  const handleChange = (e) => {
    setSelectedCollection(e);
  };

  useEffect(() => {
    handleButton();
  }, [selectedCollection]);

  const handleButton = () => {
    setIsDisabled(
      Boolean(
        !(selectedCollection && _name.current.value && _link.current.value)
      )
    );
  };

  const createNFT = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      collectionAddress,
      Collection.abi,
      signer
    );

    await contract
      .createNFT(
        _name.current.value,
        selectedCollection,
        _link.current.value,
        SAMPLE_TOKEN_URI
      )
      .then(async (transaction) => {
        const tx = await transaction.wait();
        let event = await tx.events.find(
          (event) => event.event === "NFTCreated"
        );
        console.log("Item ID: ", parseInt(event.args[0]._hex, 16));
      });
  };

  // const getCollections = async () => {
  //   const [account] = await window.ethereum.request({
  //     method: "eth_requestAccounts",
  //   });
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const contract = new ethers.Contract(
  //     collectionAddress,
  //     Collection.abi,
  //     provider
  //   );
  //   const items = (await contract.getItems(1)).map((item) => {
  //     item = parseInt(item._hex, 16);
  //     return item;
  //   });
  //   console.log(items);
  // };

  return (
    <div className="container">
      <h1>Create New Item</h1>
      <p className="sub-title text-muted">
        <FaAsterisk className="text-danger m-2" size={8} />
        Required field
      </p>
      <div className="mb-3">
        <label htmlFor="formFile" className="form-label">
          Image, Video, Audio, or 3D Model
          <FaAsterisk className="text-danger m-2" size={8} />
        </label>
        <p className="sub-title text-muted">
          File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG,
          GLB, GLTF. Max size: 100 MB
        </p>
        <input
          className="form-control choose-file"
          type="file"
          id="formFile"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="formFile" className="form-label">
          Name
          <FaAsterisk className="text-danger m-2" size={8} />
        </label>
        <input
          className="form-control form-control-lg"
          type="text"
          required
          ref={_name}
          placeholder="item name"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="formFile" className="form-label">
          External link
        </label>
        <p className="sub-title text-muted">
          Oasis will include a link to this URL on this item's detail page, so
          that users can click to learn more about it. You are welcome to link
          to your own webpage with more details.
        </p>
        <input
          className="form-control form-control-lg"
          type="text"
          ref={_link}
          placeholder="https://yoursite.io/item/123"
          aria-label=".form-control-lg example"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <p className="sub-title text-muted">
          The description will be included on the item's detail page underneath
          its image. Markdown syntax is supported.
        </p>
        <textarea
          className="form-control"
          id="description"
          placeholder="Provide a detailed description of your item."
          rows="4"
          columns="5"
        ></textarea>
      </div>

      <div className="mb-3 collection">
        <label htmlFor="collection" className="form-label">
          Collection
        </label>
        <p className="sub-title text-muted">
          This is the collection where your item will appear.
          <span
            className="d-inline-block"
            tabIndex="0"
            data-bs-toggle="popover"
            data-bs-trigger="hover focus"
            data-bs-content="Moving items to a different collection may take up to 30 minutes. You can manage your collections here."
          >
            <button className="btn i-btn" type="button" disabled>
              i
            </button>
          </span>
        </p>
        {collections.length === 0 ? (
          <h1>No Collections!</h1>
        ) : (
          <select
            className="form-select form-select-lg mb-4"
            id="collection"
            placeholder="Select collection"
            onChange={(e) => {
              handleChange(e.target.value || null);
            }}
          >
            <option value={""} defaultChecked>
              Select
            </option>
            {collections.map((collect_name) => (
              <option key={collect_name.index} value={collect_name.index}>
                {collect_name.CollectionName}
              </option>
            ))}
          </select>
        )}
      </div>

      <button
        className="btn btn-lg fs-2 btn-outline-primary px-4 my-5 mx-5"
        disabled={isDisabled}
        onClick={createNFT}
      >
        Create
      </button>
    </div>
  );
};