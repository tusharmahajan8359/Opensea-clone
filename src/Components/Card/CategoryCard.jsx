import React from 'react'
import {Link} from "react-router-dom"
import './CategoryCards.css'
export const CategoryCard = (props) => {
    return (
        <div className='col-lg-4 col-md-6 col-sm-6'>
            <div className='category-card '>
                <img src={props.image} className='card-img' alt='...' />
                <Link to='/' className='card-link'>
                    <p className='card-title'>{props.title}</p>
                </Link>
            </div>
        </div>
    )
}
