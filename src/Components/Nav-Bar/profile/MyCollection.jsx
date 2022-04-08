import React from 'react';
import { Link } from 'react-router-dom';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Collection from '../../../artifacts/contracts/CoreCollection.sol/CoreCollection.json';
import MyCollectionCard from '../../Card/MyCollectionCard';

const collectionAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

export const MyCollection = () => {
  const [currentAccount, setCurrentAccount] = useState('');
  const [collectionList, setCollectionList] = useState([]);
  let provider;
  let account;

  const onPageLoad = async () => {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    account = await provider.listAccounts();
    setCurrentAccount(account[0]);
    setCollectionList([]);
  };

  useEffect(async () => {
    window.scrollTo(0, 0);
    await onPageLoad();
    fetchMyCollections();
  }, [currentAccount]);

  const fetchMyCollections = async () => {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      collectionAddress,
      Collection.abi,
      signer
    );

    try {
      const collections = await contract.getCollectionIds(currentAccount);

      for (let i = 0; i < collections.length; i++) {
        const collection = await contract.collections(collections[i]);
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
            setCollectionList((old) => {
              return [...old, obj];
            });
          });
      }
    } catch (err) {}
  };

  window.ethereum.on('accountsChanged', async () => {
    await onPageLoad();
  });

  return (
    <div className='container px-5 mb-5'>
      <h1 className='heading-secondary mt-5'>My Collections</h1>
      <p className='subheading text-muted'>
        Create, curate, and manage collections of unique NFTs to share and sell.
        <span
          className='d-inline-block box-shadow rounded-circle p-1 px-3 fs-2 m-2'
          tabIndex='0'
          data-bs-toggle='popover'
          data-bs-trigger='hover focus'
          data-bs-content='Collections can be created either directly on Oasis or imported from an existing smart contract. You can also mint on other services like Rarible or Mintable and import the items to Oasis. Learn more about creating NFTs for free on Oasis'
        >
          i
        </span>
      </p>
      <Link to='/my collections/create' className='btn btn-primary btn-lg me-3'>
        Create a Collection
      </Link>
      <button type='button' className='btn btn-outline-primary btn-lg p-3 px-5'>
        <BsThreeDotsVertical size={24} />
      </button>

      <div className='row row-cols-md-3 gy-3 p-0 mt-5'>
        {collectionList.map((list, index) => {
          console.log(collectionList);
          return <MyCollectionCard key={index} collection={list} />;
        })}
      </div>
    </div>
  );
};
