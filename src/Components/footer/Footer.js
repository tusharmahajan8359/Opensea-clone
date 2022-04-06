import React from "react";
import {Link} from "react-router-dom"
import {
  FaTwitter,
  FaInstagram,
  FaDiscord,
  FaRedditAlien,
  FaYoutube,
  FaEnvelope,
} from "react-icons/fa";
import "./Footer.css";
import logo from "../../logo.svg";

export default function Footer() {
  const footerdata = {
    text: "Join our mailing list to stay in the loop with our newest feature releases, NFT drops, and tips and tricks for navigating Oasis.",
    searchPlaceholder: "Your email address",
    logo: logo,
    aboutBrand:
      "The world's first and largest digital marketplace for crypto collectibles and non-fungible tokens (NFTs). Buy, sell, and discover exclusive digital items.",
    twitterUrl: "",
    youtubeUrl: "",
    discordUrl: "",
    instagramUrl: "",
    emailUrl: "",
    copyRight: "© 2018 - 2022 Ozone Networks, Inc",
  };
  return (
    <>
      <div className="row py-4">
        <div className="col-lg-6 col-md-12 action-form">
          <h3 className="title fs-1">Stay in loop</h3>
          <p className="text fs-3 lh-base">{footerdata.text}</p>
          <form action="" className="search-container fs-3">
            <input type="text" placeholder={footerdata.searchPlaceholder} />
            <button className="btn search-btn fs-2">Sign up</button>
          </form>
        </div>
        <div className="col-lg-6 col-md-12 community">
          <h3 className="title m-4 fs-1">Join the community</h3>
          <i className="feature-icon cursor-pointer">
            <FaTwitter size={30} />
          </i>
          <i className="feature-icon cursor-pointer">
            <FaDiscord size={30} />
          </i>
          <i className="feature-icon cursor-pointer">
            <FaRedditAlien size={30} />
          </i>
          <i className="feature-icon cursor-pointer">
            <FaYoutube size={30} />
          </i>
          <i className="feature-icon cursor-pointer">
            <FaEnvelope size={30} />
          </i>
        </div>
      </div>
      <hr className="mb-5" />
      <div className="row">
        <div className="col-lg-4 col-md-12 company">
          <img src={footerdata.logo} alt="brand-logo" className="brand-logo" />
          <Link to="/" className="title cursor-pointer">
            <h3 className="fs-1">Oasis</h3>
          </Link>
          <p className="about-brand fs-3 lh-base">{footerdata.aboutBrand}</p>
        </div>
        <div className="col-lg-2 col">
          <h5 className="title fs-3 py-5">Markerplace</h5>

          <li className="item cursor-pointer mb-3 fs-4 py-2">Art</li>
          <li className="item cursor-pointer mb-3 fs-4 py-2">Photography</li>
          <li className="item cursor-pointer mb-3 fs-4 py-2">Sports</li>
          <li className="item cursor-pointer mb-3 fs-4 py-2">Virtual World</li>
          <li className="item cursor-pointer mb-3 fs-4 py-2">Music</li>
          <li className="item cursor-pointer mb-3 fs-4 py-2">Utility</li>
        </div>
        <div className="col-lg-2 col">
          <h5 className="title fs-3 py-5">My Account</h5>

          <li className="item cursor-pointer mb-3 fs-4 py-2">Profile</li>
          <li className="item cursor-pointer mb-3 fs-4 py-2">Favorites</li>
          <li className="item cursor-pointer mb-3 fs-4 py-2">Watchlist</li>
          <li className="item cursor-pointer mb-3 fs-4 py-2">My Collections</li>
          <li className="item cursor-pointer mb-3 fs-4 py-2">Settings</li>
        </div>
        <div className="col-lg-2 col">
          <h5 className="title fs-3 py-5">Resources</h5>

          <li className="item cursor-pointer mb-3 fs-4 py-2">Help Center</li>
          <li className="item cursor-pointer mb-3 fs-4 py-2">
            Platform Status
          </li>
          <li className="item cursor-pointer mb-3 fs-4 py-2">Partners</li>
          <li className="item cursor-pointer mb-3 fs-4 py-2">
            Gas-Free Marketplace
          </li>
          <li className="item cursor-pointer mb-3 fs-4 py-2">Taxes</li>
          <li className="item cursor-pointer mb-3 fs-4 py-2">Blog</li>
          <li className="item cursor-pointer mb-3 fs-4 py-2">Docs</li>
          <li className="item cursor-pointer mb-3 fs-4 py-2">Newsletter</li>
        </div>
        <div className="col-lg-2 col">
          <h5 className="title fs-3 py-5">Company</h5>

          <li className="item cursor-pointer mb-3 fs-4 py-2">About</li>
          <li className="item cursor-pointer mb-3 fs-4 py-2">Careers</li>
          <li className="item cursor-pointer mb-3 fs-4 py-2">Ventures</li>
          <li className="item cursor-pointer mb-3 fs-4 py-2">Grants</li>
        </div>
      </div>

      <Link to="/" className="copy-right fs-5">
        {footerdata.copyRight}
      </Link>
    </>
  );
}
