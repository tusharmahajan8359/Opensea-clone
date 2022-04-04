import React from "react";
import PropTypes from "prop-types";
import "./Features.css";

export default function Feature(props) {
  return (
    <div className="feature-card">
      <span className={`feature-icon fa-3x`}>
        <i className={props.icon}></i>
      </span>

      <h2 className="feature-title">{props.title}</h2>

      <h5 className="feature-text">{props.content}</h5>
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
