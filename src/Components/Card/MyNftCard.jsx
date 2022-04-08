import React from 'react';
import './ExploreCard.css';
import { useHistory } from 'react-router-dom';

const MyNftCard = ({ nftdata }) => {
  const history = useHistory();

  const handleViewNft = () => {
    history.push('/Explore/Nft', { state: nftdata });
  };
  return (
    <>
      <div className='col' onClick={handleViewNft}>
        <div className='card h-100'>
          <img
            src={nftdata.image}
            className='card-img-top'
            alt='...'
            style={{ height: '18rem' }}
          />
          <div className='body text-center'>
            <h4 className='card-title mt-5 mb-3'>{nftdata.name}</h4>

            <p className='card-text text-truncate px-5 my-3 description'>
              {nftdata.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyNftCard;
