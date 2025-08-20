import React, { useEffect, useState } from 'react'
import Card from './Card';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

function Profile() {
  // To Do -- fix CORS error
  // To Do -- get user details from redux and after api call, save the same in redux store.
  // To Do -- handle API error handling and show msg before interested/not interested button
  // To Do -- If profile is updated, show some toastr msg (use alert from daisyUI)

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [about, setAbout] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const userData = useSelector((state) => state.user?.data);
  console.log("User data", userData)


  useEffect(()=>{
    if(userData){
      setFirstName(userData?.firstName || "")
      setLastName(userData?.lastName || "")
      setGender(userData?.gender || "")
      setAge(userData?.age || "")
      setAbout(userData?.about || "")
      setPhotoUrl(userData?.photoUrl || "")

      console.log("User data", userData)
    }
  },[userData])

  const updateData = async() => {
    const updatedData = await axios.patch(
      API_BASE_URL + "/profile/edit",
      {
        firstName,
        lastName,
        photoUrl,
        age,
        gender,
        about,
      },
      { withCredentials: true }
    );
    console.log("Updated data", updatedData);  
  }

  return (
      <div className="flex min-h-screen items-center justify-center gap-4">
        <div className="w-96 h-[500px] flex flex-col justify-center">
          <div className="card-body h-full">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 h-full">
              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Gender</span>
                  </div>
                  <input
                    type="text"
                    value={gender}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Age</span>
                  </div>
                  <input
                    type="text"
                    value={age}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">About</span>
                  </div>
                  <input
                    type="text"
                    value={about}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </label>
              </div>

              <div className="card-actions justify-center m-2">
                <button
                  className="btn btn-primary"
                  onClick={updateData}
                >
                  {"Update Profile"}
                </button>
              </div>
            </fieldset>  
          </div>
        </div>
      <div className='h-[455px]'>
        <Card 
          user={{
            _id: userData?._id,
            firstName,
            lastName,
            age,
            gender,
            about,
            photoUrl
          }}
          className="h-full"
        />
      </div>
    </div>  
  );
}

export default Profile