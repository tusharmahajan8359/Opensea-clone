import React from 'react'

export default function Brand({ brandName, brandLogoUrl }) {
  //   console.log(props)
  return (
    <a className='navbar-brand fs-1 fw-bold' href='/'>
      <img
        src={brandLogoUrl}
        alt={brandName}
        width='36'
        height='30'
        className='d-inline-block align-text-top'
      />
      {brandName}
    </a>
  )
}
