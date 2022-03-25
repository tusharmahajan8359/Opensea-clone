import React from 'react'
import './CategoryCards.css'
export const CategoryCard = (props) => {
    return (
        <div className='col-lg-4 col-md-6 col-sm-6'>
            <div className='category-card '>
                <img src={props.image} className='card-img' alt='...' />
                <a href='/' className='card-link'>
                    <p className='card-title'>{props.title}</p>
                </a>
            </div>
        </div>
    )
}
