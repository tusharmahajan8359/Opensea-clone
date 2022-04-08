import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserInfo from '../UserInfo';
import './Hero.css';
import heroData from './HeroData';

export default function Hero() {
  // console.log(props)
  return (
    <section className='section-hero'>
      <div className='container py-5'>
        <div className='row gy-3'>
          <div className='col-lg-6 hero-text-container'>
            <h2 className='heading-primary'>{heroData.title}</h2>
            <p className='hero-description'>{heroData.text}</p>
            <div className='container-btn'>
              <Link to='/' className='btn btn-primary btn-lg py-3 px-5'>
                Explore
              </Link>
              <Link to='/' className='btn btn-outline btn-lg py-3 px-5'>
                Create
              </Link>
            </div>
          </div>
          <div className='col-lg-5 offset-lg-1 hero-img-container box-shadow '>
            <div className='nft-img cursor-pointer'>
              <img
                src={heroData.mainImg}
                className='card-img'
                alt='NFT-Image'
              />
            </div>
          </div>
          <div className='container-bottom py-2'>
            <Link to='/' className='text'>
              learn more about Oasis
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

Hero.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  profileName: PropTypes.string,
  nftName: PropTypes.string,
};

Hero.defaultProps = {
  title: 'hero title here',
  text: 'about hero title here',
  profileName: 'profilr_Name',
  nftName: 'NFT_Name',
};
