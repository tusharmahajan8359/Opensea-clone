import React from 'react';
import { Link } from 'react-router-dom';
export default function Brand({ navbarBrand, brandName, brandLogoUrl }) {
  return (
    <Link
      className={navbarBrand ? 'navbar-brand fw-bold me-4 fs-1' : 'brand'}
      to='/'
    >
      <img
        src={brandLogoUrl}
        alt={brandName}
        width='36'
        height='30'
        className='d-inline-block align-text-top'
      />
      {brandName}
    </Link>
  );
}
