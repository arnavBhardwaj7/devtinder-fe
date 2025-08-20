import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../utils/constants'
import Card from './Card'
import { useDispatch } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

function Connection() {

    const [connection, setConnection] = useState("")
    const dispatch = useDispatch()

    const fetchData = async() => {
        const res = await axios.get(API_BASE_URL+"/user/connections", {withCredentials: true})
        setConnection(res?.data?.data);
        dispatch(addConnections(res?.data?.data));
        console.log(res?.data?.data, "@#$%^&");
    }

    useEffect(()=>{
        fetchData();
    },[])

    if(!connection) return

    if(connection.length === 0) return <div className="flex items-center justify-center min-h-screen font-extrabold">No connection found!!</div>

  return (
    <div className="flex items-center justify-center min-h-screen gap-6">
        {connection && 
        connection.map((data) => {
            return <Card user={data} />
        })
        }
    </div>
  )
}

export default Connection