import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import NavItemCSS from './NavItems.module.css';

export default function NavItem({ items, handleWallet }) {
  return (
    <ul className={`navbar-nav ${NavItemCSS.NavbarNav}`}>
      {items.map((item) => (
        <li className='nav-item dropdown'>
          <NavLink
            to={'/' + item.itemTitle}
            className={`nav-link fs-2  ${NavItemCSS.NavLink}`}
            id='dropdownMenuLink'
            aria-expanded='false'
            // data-bs-toggle='dropdown'
          >
            {item.itemTitle}
          </NavLink>
          <ul
            className={` ${
              item.dropdownItems.length > 0 ? `dropdown-menu` : 'd-none'
            }`}
            aria-labelledby='dropdownMenuLink'
          >
            {item.dropdownItems.map((Item, index) => (
              <li>
                <Link
                  className={`dropdown-item ${NavItemCSS.DropdownItem}`}
                  to={'/' + Item}
                >
                  {Item}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
      {/* for wallet */}
      <li className={`nav-item dropdown`}>
        <Link
          to='#'
          // activeStyle={(borderBottom = '4px solid red')}
          className={`nav-link fs-2 ${NavItemCSS.NavLink}`}
          id='dropdownMenuLink'
          aria-expanded='false'
          onClick={handleWallet}
        >
          Wallet
        </Link>
      </li>
    </ul>
  );
}

{
  /* 
  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </li>
      </ul>
   */
}
