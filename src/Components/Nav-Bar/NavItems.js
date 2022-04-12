import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import NavItemCSS from './NavItems.module.css';

export default function NavItem({ items, handleWallet }) {
  return (
    <ul className={`navbar-nav ${NavItemCSS.NavbarNav}`}>
      {items.map((item, index) => (
        <li key={index} className='nav-item dropdown'>
          <NavLink
            to={'/' + item.itemTitle.toLowerCase()}
            className={`nav-link fs-2  ${NavItemCSS.NavLink}`}
            id='dropdownMenuLink'
            aria-expanded='false'
          // data-bs-toggle='dropdown'
          >
            {item.itemTitle}
          </NavLink>
          <ul
            className={` ${item.dropdownItems.length > 0 ? `dropdown-menu` : 'd-none'
              }`}
            aria-labelledby='dropdownMenuLink'
          >
            {item.dropdownItems.map((Item, index) => (
              <li key={index}>
                <Link
                  className={`dropdown-item ${NavItemCSS.DropdownItem}`}
                  to={'/' + Item.toLowerCase()}
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
        <button
          className={`nav-link fs-2 ${NavItemCSS.NavLink} ${NavItemCSS.WalletButton}`}
          id='dropdownMenuLink'
          aria-expanded='false'
          onClick={handleWallet}
        >
          Wallet
        </button>
      </li>
    </ul>
  );
}
