import React from 'react'
import { useAuthContext } from '../../context/AuthContext.jsx'
import UseConversation from '../../zustand/UseConversation';
import Date from "../../hooks/Convertdate.js"


function Message({message}) {
  const {authUser}=useAuthContext();
  const {selectedconversation}=UseConversation();
  const fromme=message.senderid===authUser._id
  const chatclassname=fromme?"chat-end":"chat-start"
  const profilepic=fromme?authUser.profilepic:selectedconversation.profilepic;
  const buublebgcolor=fromme?"bg-blue-500":"bg-black";
const shakeclass=message.shouldShake? "shake":"";
  return (
    
    <div className={`chat ${chatclassname} m-2.5 `}>
   
   <div className="avatar avatar-online">
  <div className="w-14 rounded-full   h-14">
    <img src={profilepic} className=' ' />
  </div>
</div>

        <div className={`chat-bubble text-white ${buublebgcolor} ${shakeclass} pb-2  ` }>{message.message}</div>
        <div className='chat-footer opacity-50 text-xs text-white   items-center'>{Date(message.createdAt)}</div>

     

    </div>
  
  )
}

export default Message