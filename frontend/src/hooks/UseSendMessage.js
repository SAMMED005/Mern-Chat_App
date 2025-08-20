import React, { useState } from 'react'
import UseConversation from '../zustand/UseConversation';
import toast from 'react-hot-toast'

const UseSendMessage = () => {
 const [loading,setloading]=useState(false);
  const{messages,setmessages,selectedconversation}=  UseConversation();

  const sendmessage=async(message)=>{
    try {
        const res=await fetch(`/api/auth/message/send/${selectedconversation._id}`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({message}),
        })

        const data=await res.json();
        if(data.error)throw new Error(data.error)
          setmessages([...messages,data])
    } catch (error) {
        toast.error(error.message)
        console.log(error)
    }
    finally{
        setloading(false)
    }
  }
  return {sendmessage,loading};
}

export default UseSendMessage;