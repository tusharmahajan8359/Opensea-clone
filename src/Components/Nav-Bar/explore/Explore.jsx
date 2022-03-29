import React from "react";
import "./Explore.css";
import ExploreCard from "../../Card/ExploreCard";
import { carddata } from "./DataExplore";
export const Explore = () => {
  return (
    <main className="section-explore">
      <h2 className="title heading-secondary my-5">Explore Collections</h2>
      <div className="container-card">
        {carddata.map((data, index) => {
          return (
            <ExploreCard
              key={index}
              title={data.title}
              desc={data.desc}
              imgsrc={data.imgsrc}
              uname={data.uname}
            />
          );
        })}
      </div>
    </main>
  );
};
