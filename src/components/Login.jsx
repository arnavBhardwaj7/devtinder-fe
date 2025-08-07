import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../utils/constants';

function Login() {

  const [emailID, setEmailID] = useState("arnav@gmail.com")  
  const [password, setPassword] = useState("Arnav@123");
  const [error, setError] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loginAPI = async () => {
    try{
      const data =  await axios.post(API_BASE_URL+"/login",{emailID, password})
      console.log("DATA:", data);
      dispatch(addUser(data?.data));
      return navigate("/feed")
    }catch(error){
      console.log(error?.response?.data?.data);
        setError(error?.response?.data?.data);
    }
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 ">
            <legend className="fieldset-legend">Login</legend>

            <label className="label">Email ID</label>
            <input
              type="email"
              value={emailID}
              onChange={(event) => { setEmailID(event.target.value); } }
              className="input"
              placeholder="Email ID" />

            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Password"
              value={password}
              onChange={(event) => { setPassword(event.target.value); } } />

            <p className='text-red-600'>{error}</p>

            <button className="btn btn-neutral mt-4" onClick={() => {
              loginAPI();
            } }>Login</button>
          </fieldset>
      </div>
    </>
  )

}

export default Login