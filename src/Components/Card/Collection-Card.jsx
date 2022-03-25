import React from 'react'
import './Collection-Card.css'
import { FaEthereum } from 'react-icons/fa'

export const TopCollection = (props) => {
  return (
    <div className='collection-card m-2 cursor-pointer'>
      <span className='inline-block fs-3 me-4'>{props.no}</span>
      <div className='container-info mx-2'>
        <div className='container-avtar'>
          <img
            src={props.imgsrc}
            style={{ borderRadius: ' 50%', width: ' 60px' }}
            className='card-img-avtar'
            alt='avtar-url'
          />
        </div>
        <div className='mx-3'>
          <h6 className='card-title mb-0 fs-3 text-start'>{props.title}</h6>
          <p className='text text-muted mb-0 fs-4'>
            Floor price:
            <span className='icon'>
              <FaEthereum className='ms-2' />
            </span>
            <span className='value m-0'>20.0</span>
          </p>
        </div>
      </div>
      <div className='market-value ms-3 fs-4'>
        <p className='text m-0 pt-1'>{props.marketvalue}</p>
        <p className='text m-0 p-1'>
          <span className='icon'>
            <FaEthereum className='me-2' />
          </span>
          <span className='value'>{props.value}</span>
        </p>
      </div>
    </div>
  )
}
