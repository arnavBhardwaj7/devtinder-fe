import React from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { API_BASE_URL } from '../utils/constants'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import axios from 'axios'


function Body() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userData = useSelector((state) => state.user)

  const fetchUser = async() => {
    try{
      const user = await axios.get(API_BASE_URL + "/profile/view", {withCredentials: true});
      dispatch(addUser(user.data))
    }catch(error){
      error;
      navigate("/login")
    }
  }

  useEffect(() => {
    if(!userData?.data){
      fetchUser();
    }
  }, [])

  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body