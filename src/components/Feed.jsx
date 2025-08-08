import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { API_BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import Card from './Card';


function Feed() {

  const dispatch = useDispatch()
  const feed = useSelector((store) => store.feed)
  const [cards, setCards] = useState("")

  const getFeed = async() =>{
    if(!feed || feed?.length === 0){
      const res = await axios.get(API_BASE_URL+"/feed", {withCredentials: true});
      console.log("RESSSS",res)
      dispatch(addFeed(res?.data));
      setCards(res?.data);
    }
    else{
      setCards(feed)
    }
    console.log("CARDDDD", cards);
  }

  useEffect(()=>{
    getFeed();
  },[])

  const handleSwipe = (direction, data) => {
    console.log(`Swiped ${direction} on:`, data.title);
    // Optionally trigger an API or store action here
  };

  console.log("CARD DETAILS", cards)

  return (
    <div className="relative w-80 h-[28rem] mx-auto">
      {cards.length > 0 ? (
        cards.map((card) => (
          <Card key={card._id} data={card} onSwipe={handleSwipe} />
        ))
      ) : (
        <p className="text-center">Loading feed...</p>
      )}
    </div>
  );
  

}

export default Feed