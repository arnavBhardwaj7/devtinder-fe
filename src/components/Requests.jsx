import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../utils/constants'
import Card from './Card'

function Requests() {

    const [request, setRequest] = useState("")

    const fetchData = async() => {
        const res = await axios.get(API_BASE_URL+"/user/requests/received", {withCredentials: true})
        setRequest(res?.data?.data);
        console.log(res?.data?.data)
    }

    useEffect(()=>{
        fetchData();
    },[])

    if(!request) return

    if(request.length === 0) return <h1>No request found</h1>

  return (
    <div className="flex items-center justify-center min-h-screen gap-6">
        {request && 
        request.map((data) => {
            console.log("HELLO",data?.fromUserId);
            return <Card user={data?.fromUserId} request={true} />
        })
        }
    </div>
  )
}

export default Requests