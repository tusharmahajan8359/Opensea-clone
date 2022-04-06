import React from 'react'
import {Link} from "react-router-dom"
export default function Brand({ brandName, brandLogoUrl }) {
  //   console.log(props)
  return (
    <Link className='navbar-brand fs-1 fw-bold' to='/'>
      <img
        src={brandLogoUrl}
        alt={brandName}
        width='36'
        height='30'
        className='d-inline-block align-text-top'
      />
      {brandName}
    </Link>
  )
}
