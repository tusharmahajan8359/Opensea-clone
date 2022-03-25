import React from "react";
import dataFeature from "./FeaturesData";
import Feature from "./Feature";
import "./Features.css";

export const Features = () => {
  return (
    <div className="container features row gy-3">
      <h3 className="heading-tertiary">Create and sell your Features</h3>
      {dataFeature.map((data) => {
        <div className="col-lg-3 mb-4">
          <Feature icon={data.icon} title={data.title} content={data.content} />
        </div>;
      })}
    </div>
  );
};
