import React from "react";
import dataFeature from "./FeaturesData";
import Feature from "./Feature";
export const Features = () => {
  return (
    <>
      <center>
        <h1 className="title my-3">Create and sell your Features</h1>
      </center>
      <br />
      <div className="container features row">
        {dataFeature.map((data) => (
          <div className="col-lg-3 col-md-12" key={data.id}>
            <Feature
              id={data.id}
              icon={data.icon}
              title={data.title}
              content={data.content}
            />
          </div>
        ))}
      </div>
    </>
  );
};
