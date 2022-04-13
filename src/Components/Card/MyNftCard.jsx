import React from 'react';
import './ExploreCard.css';
import { useHistory } from 'react-router-dom';

const MyNftCard = ({ nftdata }) => {
  const history = useHistory();

  const handleViewNft = () => {
    history.push('/explore/nft', { state: nftdata });
  };
  return (
    <>
      <div className='col' onClick={handleViewNft}>
        <div className='card h-100 pb-5' >
          <img
            src={nftdata.image}
            className="d-block mx-auto"
            alt='...'
            style={{ height: '24rem', width: "100%" }}
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
