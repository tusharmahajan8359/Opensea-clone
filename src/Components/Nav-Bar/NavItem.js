import React, { useState } from 'react'
import { Link } from 'react-router-dom'
export default function NavItem(props) {
  // console.log(props)
  return (
    <ul className='nav-item dropdown'>
      <Link
        className='nav-link item-title'
        to={'/' + props.item.itemTitle}
        id='dropdownMenuLink'
        aria-expanded='false'
      >
        {props.item.itemTitle}
      </Link>
      <div
        className={` ${
          props.item.dropdownItems.length > 0 ? 'dropdown-menu' : 'd-none'
        }`}
      >
        {props.item.dropdownItems.map((Item, index) => (
          <li key={index}>
            <Link className='dropdown-item' to={'/' + Item}>
              {Item}
            </Link>
          </li>
        ))}
      </div>
    </ul>
  )
}
