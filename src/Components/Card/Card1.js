import React from 'react'
import { AiOutlineEye } from 'react-icons/ai'
import './Card1.css'

export default function Card1(props) {
  return (
    <div className='card notable m-1 cursor-pointer' style={{ width: '32rem' }}>
      <img
        src='https://source.unsplash.com/collection/190727/500x500'
        className='img-fluid'
        alt='card-img'
        style={{ width: '32rem', height: '48rem' }}
      />
      <span className='card-tag bg-danger text-white rounded-pill p-2 fs-3 my-4'>
        <AiOutlineEye /> Live
      </span>
      <div className='card-body-overlay'>
        <h5 className='card-title heading-tertiary'>Card title</h5>
        <p className='card-text fs-3 text-truncate'>
          This is a wider card with supporting text
        </p>
        <p className='card-text fs-4'>Last updated 3 mins ago</p>
      </div>
    </div>
  )
}
