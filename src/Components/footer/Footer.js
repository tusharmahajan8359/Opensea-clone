import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaTwitter,
  FaInstagram,
  FaDiscord,
  FaRedditAlien,
  FaYoutube,
  FaEnvelope,
} from 'react-icons/fa';
import logo from '../../logo.svg';
import Brand from '../Nav-Bar/Brand';
import './Footer.css';

export default function Footer() {
  const footerdata = {
    text: 'Join our mailing list to stay in the loop with our newest feature releases, NFT drops, and tips and tricks for navigating Oasis.',
    searchPlaceholder: 'Your email address',
    brandName: 'Oasis',
    brandLogoUrl: `${logo}`,
    aboutBrand:
      "The world's first and largest digital marketplace for crypto collectibles and non-fungible tokens (NFTs). Buy, sell, and discover exclusive digital items.",
    copyRight: '© 2018 - 2022 Ozone Networks, Inc',
  };
  return (
    <div className='container-fluid footer'>
      <div className='container'>
        <div className='row py-5 mb-5 border-bottom'>
          <div className='col-lg-6 col-md-12 action-form'>
            <h3 className='heading-tertiary text-light mb-3'>Stay in loop</h3>
            <p className='text fs-3 lh-sm'>{footerdata.text}</p>
            <form action='' className='action-search-container'>
              <input type='text' placeholder={footerdata.searchPlaceholder} />
              <button className='btn action-search-btn'>Sign up</button>
            </form>
          </div>
          <div className='col-lg-6 col-md-12 community'>
            <h3 className='heading-tertiary text-light mb-3'>
              Join the community
            </h3>
            <div className='feature-icons'>
              <FaTwitter size={42} className='feature-icon cursor-pointer' />
              <FaInstagram size={42} className='feature-icon cursor-pointer' />
              <FaDiscord size={42} className='feature-icon cursor-pointer' />
              <FaRedditAlien
                size={42}
                className='feature-icon cursor-pointer'
              />
              <FaYoutube size={42} className='feature-icon cursor-pointer' />
              <FaEnvelope size={42} className='feature-icon cursor-pointer' />
            </div>
          </div>
        </div>
        <div className='row gy-5 py-5 border-bottom'>
          <div className='col-lg-4 col-md-12 company'>
            <Brand
              brandName={footerdata.brandName}
              brandLogoUrl={footerdata.brandLogoUrl}
            />

            <p className='about-brand fs-3 lh-base'>{footerdata.aboutBrand}</p>
          </div>

          <div className='col-lg-2 col-md-4 offset-lg-2'>
            <h5 className='subheading mb-3'>Markerplace</h5>
            <ul className='list-unstyled'>
              <li className='cursor-pointer my-2 fs-4'>Art</li>
              <li className='cursor-pointer my-2 fs-4'>Photography</li>
              <li className='cursor-pointer my-2 fs-4'>Sports</li>
              <li className='cursor-pointer my-2 fs-4'>Virtual World</li>
              <li className='cursor-pointer my-2 fs-4'>Music</li>
              <li className='cursor-pointer my-2 fs-4'>Utility</li>
            </ul>
          </div>
          <div className='col-lg-2 col-md-4'>
            <h5 className='subheading mb-3'>My Account</h5>
            <ul className='list-unstyled'>
              <li className='cursor-pointer my-2 fs-4'>Profile</li>
              <li className='cursor-pointer my-2 fs-4'>Favorites</li>
              <li className='cursor-pointer my-2 fs-4'>Watchlist</li>
              <li className='cursor-pointer my-2 fs-4'>My Collections</li>
              <li className='cursor-pointer my-2 fs-4'>Settings</li>
            </ul>
          </div>
          <div className='col-lg-2 col-md-4'>
            <h5 className='subheading mb-3'>Resources</h5>
            <ul className='list-unstyled'>
              <li className='cursor-pointer my-2 fs-4'>Help Center</li>
              <li className='cursor-pointer my-2 fs-4'>Partners</li>
              <li className='cursor-pointer my-2 fs-4'>Gas-Free Marketplace</li>
              <li className='cursor-pointer my-2 fs-4'>Blog</li>
              <li className='cursor-pointer my-2 fs-4'>Newsletter</li>
            </ul>
          </div>
          {/* <div className='col-lg-2 col-md-3 col'>
            <h5 className='subheading mb-3'>Company</h5>
            <ul className='list-unstyled'>
              <li className='cursor-pointer my-2 fs-4'>About</li>
              <li className='cursor-pointer my-2 fs-4'>Careers</li>
              <li className='cursor-pointer my-2 fs-4'>Ventures</li>
              <li className='cursor-pointer my-2 fs-4'>Grants</li>
            </ul>
          </div> */}
        </div>

        <Link href='/' className='copy-right'>
          {footerdata.copyRight}
        </Link>
      </div>
    </div>
  );
}
