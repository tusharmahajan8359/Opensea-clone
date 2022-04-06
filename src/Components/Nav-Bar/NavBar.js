import React, { useState } from "react";
import {Link} from "react-router-dom"
import { BiSearch } from "react-icons/bi";
import "./NavBar.css";
import Brand from "./Brand";
import NavItem from "./NavItem";
import { navBarData } from "./NavBarData";
import { Wallet } from "../wallet/Wallet";

export default function Navbar(props) {
  const [click, setClick] = useState(false);
  const [wallet, setWallet] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };
  const handleWallet = () => {
    setWallet(!wallet);
  };

  return (
    <>
      <nav
        className={`navbar navbar-expand-md isvisible sticky-top navbar-${navBarData.theme} bg-${navBarData.theme} border-bottom px-5`}
      >
        <Brand
          brandName={navBarData.brandName}
          brandLogoUrl={navBarData.brandLogoUrl}
        />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          onClick={handleClick}
          data-bs-target="#navbarItems"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className={click ? "fa fa-times" : "fa fa-bars"}></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarItems">
          <form className={`container container-search`}>
            <BiSearch size="24px" />
            <input
              className="form-control box-shadow-none"
              type="search"
              placeholder={navBarData.search}
              aria-label="Search"
            />
          </form>

          <ul className="navbar-nav mx-5">
            {navBarData.navItems.map((item) => (
              <NavItem key={item.id} item={item} />
            ))}
            <li className="nav-item dropdown">
              <a 
                className="nav-link item-title"
                id="dropdownMenuLink"
                aria-expanded="false"
                onClick={handleWallet}
              >
                wallet
              </a>
            </li>
          </ul>
        </div>

        {/* </div> */}
      </nav>
      {wallet && (
        <Wallet stateData={props.stateData} setStateData={props.setStateData} />
      )}

     
    </>
  );
}
