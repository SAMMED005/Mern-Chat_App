import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
const useGetConversations = () => {
 const[loading,setloading]=useState(false);
 const[conversations,setconversations]=useState([]);

 useEffect(()=>{
const getconversations=async()=>{
setloading(true)
try {
  //http://localhost:8000
  const res= await fetch('/api/users')  
  const data= await res.json();
  // console.log(data);
  if(data.error)throw new Error(data.error)
    setconversations(data)
} catch (error) {
    toast.error(error.message)
}
finally{
  setloading(false);
}

}
getconversations();
 },[])
 return {loading,conversations}
}


export default useGetConversations;