import React from 'react';
import './CreateNewItem.css';
import { FaAsterisk, FaPlus, FaStar } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { ethers } from 'ethers';
import Collection from '../artifacts/contracts/CoreCollection.sol/CoreCollection.json';
import { create as ipfsHttpClient } from 'ipfs-http-client';

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

const collectionAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

const SAMPLE_TOKEN_URI = 'http://test.com';

export const CreateNewItems = () => {
  const history = useHistory();
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [currentAccount, setAccount] = useState();
  const [isDisabled, setIsDisabled] = useState(true);
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({
    name: '',
    description: '',
  });
  const [nftState, setNftState] = useState();

  let _name = useRef();
  let _link = useRef();
  let ItemId;

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCollections = async () => {
      let collectionNames = [];
      const [account] = await window.ethereum.request({
        method: 'eth_requestAccounts',
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

  async function onFileUpload(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
      console.log('Image URL: ', url);
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
    console.log('Image Upload Complete');
  }

  async function uploadToIPFS() {
    console.log('uploading to IPFS...');
    if (!formInput.name || !fileUrl) return;
    /* first, upload to IPFS */
    const data = JSON.stringify({
      description: formInput.description,
      image: fileUrl,
    });
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;

      console.log('Collection Link: ', url);
      return url;
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  }

  window.ethereum.on('accountsChanged', async function () {
    const [account] = await window.ethereum.request({
      method: 'eth_requestAccounts',
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
    setIsDisabled(Boolean(!(selectedCollection && fileUrl && formInput.name)));
  };

  const createNFT = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      collectionAddress,
      Collection.abi,
      signer
    );

    const url = await uploadToIPFS();
    await contract
      .createNFT(formInput.name, selectedCollection, fileUrl, url)
      .then(async (transaction) => {
        const tx = await transaction.wait();
        let event = await tx.events.find(
          (event) => event.event === 'NFTCreated'
        );
        console.log('Item ID: ', parseInt(event.args[0]._hex, 16));
        ItemId = parseInt(event.args[0]._hex, 16);
      });
    const collectionId = await contract.userToCollectionIds(
      signer.getAddress(),
      selectedCollection
    );
    const collection = await contract.collections(collectionId);
    const items = await contract.getItems(collection[0]);
    const itemCount = items.length;
    const ipfsLink = collection[3];
    const obj = {
      id: collection[0],
      name: collection[1],
      itemCount: itemCount,
      creator: collection[2],
    };
    fetch(ipfsLink)
      .then((res) => res.json())
      .then((data) => {
        obj.description = data.description;
        obj.image = data.image;
        history.push('/CollectionDetails', { state: obj });
      });
  };

  return (
    <div className='container'>
      <h1 className='heading-secondary mt-5 mb-3'>Create New Item</h1>
      <small className='fs-5 text-muted'>
        <FaAsterisk className='text-danger m-2' size={8} />
        Required field
      </small>
      <div className='mb-3'>
        <label htmlFor='formFile' className='form-label'>
          Image
          <FaAsterisk className='text-danger m-2' size={8} />
        </label>
        <small className='fs-5 text-muted'>Max size: 100 MB</small>
        <div className='choose-file'>
          <input type='file' name='Asset' required onChange={onFileUpload} />
          {fileUrl && <img className='rounded' height='400' src={fileUrl} />}
        </div>
      </div>
      <div className='mb-3'>
        <label htmlFor='formFile' className='form-label'>
          Name
          <FaAsterisk className='text-danger m-2' size={8} />
        </label>
        <input
          className='form-control form-control-lg'
          type='text'
          required
          onChange={(e) =>
            updateFormInput({ ...formInput, name: e.target.value })
          }
          placeholder='item name'
        />
      </div>

      <div className='mb-3'>
        <label htmlFor='formFile' className='form-label'>
          External link
        </label>
        <small className='fs-5 text-muted'>
          This would be the ipfs link to the image.
        </small>
        <input
          className='form-control form-control-lg'
          type='text'
          disabled={true}
          placeholder={fileUrl}
          aria-label='.form-control-lg example'
        />
      </div>

      <div className='mb-3'>
        <label htmlFor='description' className='form-label'>
          Description
        </label>
        <small className='fs-5 text-muted'>
          The description will be included on the item's detail page underneath
          its image. Markdown syntax is supported.
          <FaAsterisk className='text-danger m-2' size={8} />
        </small>
        <textarea
          className='form-control fs-3'
          id='description'
          placeholder='Provide a detailed description of your item.'
          onChange={(e) =>
            updateFormInput({ ...formInput, description: e.target.value })
          }
          rows='4'
          columns='5'
        ></textarea>
      </div>

      <div className='mb-3 collection'>
        <label htmlFor='collection' className='form-label'>
          Collection
        </label>
        <small className='fs-5 text-muted'>
          This is the collection where your item will appear.
          <span
            className='d-inline-block'
            tabIndex='0'
            data-bs-toggle='popover'
            data-bs-trigger='hover focus'
            data-bs-content='Moving items to a different collection may take up to 30 minutes. You can manage your collections here.'
          >
            <button className='btn i-btn' type='button' disabled>
              i
            </button>
          </span>
        </small>
        {collections.length === 0 ? (
          <h1 className='fs-4'>No Collections!</h1>
        ) : (
          <select
            className='form-select form-select-lg mb-4'
            id='collection'
            placeholder='Select collection'
            onChange={(e) => {
              handleChange(e.target.value || null);
              console.log(e.target.value);
            }}
          >
            <option value={''} defaultChecked>
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
        className='btn btn-lg fs-1 btn-outline-primary px-4 py-2 my-5'
        disabled={isDisabled}
        onClick={createNFT}
      >
        Create
      </button>
    </div>
  );
};
