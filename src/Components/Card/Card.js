import React from 'react'
import PropTypes from 'prop-types'
import './Card.css'
import Avatar from '../Avatar'

export default function Card({
  profileURL,
  userName,
  avtarUrl,
  category,
  NFTName,
  description,
}) {
  console.log(profileURL, userName, avtarUrl, category, NFTName, description)

  return (
    <>
      {/* <div class='card h-100' style={{ width: '32rem' }}>
        <img
          src='https://source.unsplash.com/collection/190727/500x500'
          class='card-img-top main-img'
          alt='...'
          style='height: 14rem'
        />
        <div class='card-body py-0'>
          <img
            src='https://images.unsplash.com/profile-1446404465118-3a53b909cc82?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64&s=3ef46b07bb19f68322d027cb8f9ac99f'
            style='width: 64px'
            class='avtar-img rounded-circle'
            alt='avtar-img'
          />
          <h5 class='collectionCard-name'>Card title</h5>
          <p class='author'>
            <span>by</span> xyxs
          </p>
          <p class='card-text description'>
            Explore the MultiFaucet NFT - qh34rf24iu collection
          </p>
        </div>
      </div> */}

      <div className='card cursor-pointer' style={{ width: '32rem' }}>
        <img
          src={profileURL}
          className='card-img-top'
          alt='image'
          style={{ height: '18rem' }}
        />

        <div className='card-body mx-3'>
          <img className='avtar' src={avtarUrl} alt='{props.user.name}' />
          <h5 className='card-title'>{userName}</h5>

          <h4 className='nft-title'>{NFTName}</h4>

          <p className='card-text text-truncate'>{description}</p>
        </div>
        {/* <Avatar user={props.user} className='avtar' /> */}
      </div>
    </>
  )
}

// Card.propTypes = {
//   id: number,
//   profileURL: string,
//   userName: string,
//   avtarUrl: string,
//   category: string,
//   NFTName: string,
//   description: string,
// }

Card.defaultProps = {
  profileURL: 'https://source.unsplash.com/collection/190737/',
  userName: 'User_Name',
  avtarUrl:
    'https://images.unsplash.com/profile-1446404465118-3a53b909cc82?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64&s=3ef46b07bb19f68322d027cb8f9ac99f',
  category: 'Catogory',
  NFTName: 'NFT_Name',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio delectus labore placeat nostrum laudantium explicabo nisi reprehenderit fugiat sequi excepturi voluptates.',
}
