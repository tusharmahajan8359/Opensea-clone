import React from 'react'

export const CardHelp = ({ title, desc }) => {
  return (
    <div className='col'>
      <div className='box-shadow h-100 cursor-pointer rounded text-center py-3'>
        <h3 className='title subheading'>{title}</h3>
        <p className='text-muted fw-light fs-3 px-2'>{desc}</p>
      </div>
    </div>
  )
}
