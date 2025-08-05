import axios from 'axios';
import React, { useState } from 'react'

function Login() {

  const [emailID, setEmailID] = useState("")  
  const [password, setPassword] = useState("");

  const loginAPI = async () => {
      const data =  await axios.post("http://localhost:3000/login",{"emailID": emailID, "password": password})
      console.log("DATA:", data);
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 ">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email ID</label>
        <input 
            type="email" 
            value={emailID} 
            onChange={(event)=>{ setEmailID(event.target.value) }} 
            className="input" 
            placeholder="Email ID" 
        />

        <label className="label">Password</label>
        <input 
            type="password" 
            className="input" 
            placeholder="Password"
            value={password}
            onChange={(event) => {setPassword(event.target.value)}} 
        />

        <button className="btn btn-neutral mt-4" onClick={() => {
            loginAPI()
        }}>Login</button>
      </fieldset>
    </div>
  )
}

export default Login