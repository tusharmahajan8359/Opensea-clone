import React from 'react'
import Carousel from 'react-elastic-carousel'
import './Carousel.css'

export default function MakeCarousele(props) {
  const breakPoints = [
    { width: 400, itemsToShow: 1 },
    { width: 500, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ]

  return (
    <section className='container py-5 text-center'>
      <h3 className='heading-tertiary mt-5'> {props.heading}</h3>
      <Carousel breakPoints={breakPoints}>{props.items}</Carousel>
    </section>
  )
}
