import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import Brand from './Brand';
import NavItems from './NavItems';
import { navBarData } from './NavBarData';
import { Wallet } from '../wallet/Wallet';
import NavBarCSS from './NavBar.module.css';

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
        className={`navbar-expand-md navbar-light bg-light ${NavBarCSS.Navbar}`}
      >
        <Brand
          navbarBrand='true'
          brandName={navBarData.brandName}
          brandLogoUrl={navBarData.brandLogoUrl}
        />
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          onClick={handleClick}
          data-bs-target='#navbarItems'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className={click ? 'fa fa-times' : 'fa fa-bars'}></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarItems'>
          <div className={`container ${NavBarCSS.ContainerSearch}`}>
            <BiSearch size='24px' />
            <input
              className={`form-control ${NavBarCSS.FormControl}`}
              type='search'
              placeholder={navBarData.search}
              aria-label='Search'
            />
          </div>

          <NavItems items={navBarData.navItems} handleWallet={handleWallet} />
        </div>
      </nav>
      {wallet && (
        <Wallet stateData={props.stateData} setStateData={props.setStateData} setWallet={ setWallet}/>
      )}
    </>
  );
}
