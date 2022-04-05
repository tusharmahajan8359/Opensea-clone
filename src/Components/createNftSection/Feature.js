import React from "react";
import PropTypes from "prop-types";
import { IoWalletSharp,IoImages} from "react-icons/io5";
import { TiThLargeOutline} from "react-icons/ti";
import { GiFiles} from "react-icons/gi";
import "./Features.css";

export default function Feature(props) {
  return (
    <div className="feature-card">
      
      <Icon iconName={props.icon} />
      <h2 className="feature-title">{props.title}</h2>

      <h5 className="feature-text">{props.content}</h5>
    </div>
  );
}
const Icon = ({iconName}) => {
  switch(iconName){
    case "IoWalletSharp":return <IoWalletSharp className="my-3" size={32} />
    case "TiThLargeOutline":return <TiThLargeOutline className="my-3" size={32} />
    case "IoImages":return <IoImages className="my-3" size={32} />
    case "GiFiles":return <GiFiles className="my-3" size={32} />
    default:return <IoWalletSharp className="my-3" size={32} />
  }
}

Feature.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

Feature.defaultProps = {
  title: "title",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio delectus labore placeat nostrum laudantium explicabo nisi reprehenderit fugiat sequi excepturi voluptates.",
};
