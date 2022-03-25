import React from "react";
import PropTypes from "prop-types";
import { IoWalletSharp, IoImages } from "react-icons/io5";

export default function Feature(props) {
  // const Icon = () => {
  //   return <IoImages />
  // }
  return (
    <div className="feature-card">
      <IoWalletSharp className="my-3" size={44} />

      <h5 className="feature-title fs-2 mb-4">{props.title}</h5>

      <p className="feature-text fs-3 lh-base my-3">{props.content}</p>
    </div>
  );
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
