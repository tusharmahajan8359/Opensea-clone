import React from 'react';
import PropTypes from 'prop-types';
import { IoWalletSharp, IoImages } from 'react-icons/io5';
import { TiThLargeOutline } from 'react-icons/ti';
import { GiFiles } from 'react-icons/gi';

export default function Feature(props) {
  const style = { color: 'white', fontSize: '1.5em' };
  return (
    <div className='feature text-center'>
      <Icon iconName={props.icon} />

      <h2 className='subheading mt-4'>{props.title}</h2>

      <h5 className='lead fs-3'>{props.content}</h5>
    </div>
  );
}
const Icon = ({ iconName }) => {
  switch (iconName) {
    case 'IoWalletSharp':
      return <IoWalletSharp className='my-3' size={48} color='#2081e2' />;
    case 'TiThLargeOutline':
      return <TiThLargeOutline className='my-3' size={48} color='#2081e2' />;
    case 'IoImages':
      return <IoImages className='my-3' size={48} color='#2081e2' />;
    case 'GiFiles':
      return <GiFiles className='my-3' size={48} color='#2081e2' />;
    default:
      return <IoWalletSharp className='my-3' size={48} color='#2081e2' />;
  }
};

Feature.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

Feature.defaultProps = {
  title: 'title',
  content:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio delectus labore placeat nostrum laudantium explicabo nisi reprehenderit fugiat sequi excepturi voluptates.',
};
