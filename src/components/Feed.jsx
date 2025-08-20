import axios from "axios";
import React from "react";
import { API_BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import Card from "./Card";

const Feed = () => {
  const feed = useSelector((store) => store.feed?.data);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(API_BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data));
    } catch (err) {
      err
      //TODO: handle error
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  
  if (!feed) return;

  if (feed.length <= 0)
    return <h1 className="flex items-center justify-center min-h-screen">No new users founds!</h1>;


  return (
    feed && (
      <div className="flex items-center justify-center min-h-screen">
        <Card user={feed[0]} feed={true} />
      </div>
    )
  );
};
export default Feed;