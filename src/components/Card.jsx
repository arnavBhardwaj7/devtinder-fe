import axios from "axios";
import React from "react";
import { API_BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const Card = ({ user, feed=false, request=false }) => {
  console.log("USERRRR", user);
  const { _id, firstName, lastName, age, gender, about } = user;
  const dispatch = useDispatch();


  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        API_BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      console.log(res);
      dispatch(removeUserFromFeed(userId))
    } catch (err) {
      console.log(err)
    }
  };

  const reviewRequest = async (status, _id) => {
    try{
        axios.post(API_BASE_URL + "/request/review/" + status + "/" + _id, {}, {withCredentials: true});
    }catch(err){
      console.log(err);
    }
  }


  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={user.photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        {feed && <div className="card-actions justify-center my-4">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>}
        {request && <div className="card-actions justify-center my-4">
          <button
            className="btn btn-primary"
            onClick={() => reviewRequest("rejected", _id)}
          >
            Rejected
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => reviewRequest("accepted", _id)}
          >
            Accepted
          </button>
        </div>}
      </div>
    </div>
  );
};
export default Card;