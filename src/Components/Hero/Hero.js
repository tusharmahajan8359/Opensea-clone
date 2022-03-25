import React from "react";
import PropTypes from "prop-types";
import UserInfo from "../UserInfo";
import "./Hero.css";
import heroData from "./HeroData";

export default function Hero() {
  // console.log(props)
  return (
    <section className="section-hero">
      <div className="container py-5">
        <div className="row gy-3">
          <div className="col-lg-6 hero-text-container">
            <h2 className="heading-primary">{heroData.title}</h2>
            <p className="hero-description">{heroData.text}</p>
            <div className="container-btn">
              <a href="/" className="btn btn-primary me-5">
                Explore
              </a>
              <a href="/" className="btn btn-outline">
                Create
              </a>
            </div>
          </div>
          <div className="col-lg-6 hero-img-container">
            <div className="nft-img box-shadow cursor-pointer">
              <img
                src={heroData.mainImg}
                className="card-img-top"
                style={{ height: "350px", width: "600px" }}
                alt="NFT-Image"
              />
              <div className="hero-img-container-body">
                <UserInfo user={heroData.userInfo[0]} />

                <span
                  className="d-inline-block box-shadow rounded-circle p-1 px-3 fs-2"
                  tabIndex="0"
                  data-bs-toggle="popover"
                  data-bs-trigger="hover focus"
                  data-bs-content=""
                >
                  i
                </span>
              </div>
            </div>
          </div>
          <div className="container-bottom py-2">
            <a href="/" className="text">
              learn more about Oasis
            </a>
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
  title: "hero title here",
  text: "about hero title here",
  profileName: "profilr_Name",
  nftName: "NFT_Name",
};
