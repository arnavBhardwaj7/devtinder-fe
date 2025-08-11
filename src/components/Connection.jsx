import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../utils/constants'
import Card from './Card'
import { useDispatch } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

function Connection() {

    const [feed, setFeed] = useState("")
    const dispatch = useDispatch()

    const fetchData = async() => {
        const res = await axios.get(API_BASE_URL+"/user/connections", {withCredentials: true})
        setFeed(res?.data?.data);
        dispatch(addConnections(res?.data?.data));
    }

    useEffect(()=>{
        fetchData();
    },[])

    if(!feed) return

    if(feed.length === 0) return <h1>No connection found</h1>

  return (
    <div className="flex items-center justify-center min-h-screen gap-6">
        {feed && 
        feed.map((data) => {
            return <Card user={data} />
        })
        }
    </div>
  )
}

export default Connection