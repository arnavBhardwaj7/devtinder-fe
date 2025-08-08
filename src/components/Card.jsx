// src/components/Card.js
import React from 'react';
import TinderCard from 'react-tinder-card';

function Card({ data, onSwipe }) {
  return (
    <TinderCard
      className="swipe absolute"
      key={data._id}
      onSwipe={(dir) => onSwipe(dir, data)}
      preventSwipe={['up', 'down']}
    >
    <div className="flex items-center justify-center">
      <div className="card card-side bg-base-100 shadow-sm translate-y-3/4 h-[250px] w-[350px]">
        <figure>
          <img
            src={data.photoUrl}
            alt="Image" />
        </figure>
        <div className="card-body">
          <h1 className="card-title">{data.firstName + " " + data.lastName}</h1>
          <p>{data.about}</p>      
        </div>
      </div>
    </div>  
    </TinderCard>

  );
}

export default Card;
