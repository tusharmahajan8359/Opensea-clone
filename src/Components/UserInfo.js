import React from 'react'
import Avatar from './Avatar'

export default function UserInfo(props) {
  // console.log(props)
  return (
    <div className='user-info'>
      <Avatar user={props.user} />
      <div className='user-info-name'>{props.user.name}</div>
    </div>
  )
}
