import React from 'react';
import dataFeature from './FeaturesData';
import Feature from './Feature';
export const Features = () => {
  return (
    <div className='container features my-5'>
      <center>
        <h1 className='heading-secondary'>Create and sell your Features</h1>
      </center>

      <div className='row g-3'>
        {dataFeature.map((data) => (
          <div className='col-lg-3' key={data.id}>
            <Feature
              id={data.id}
              icon={data.icon}
              title={data.title}
              content={data.content}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
