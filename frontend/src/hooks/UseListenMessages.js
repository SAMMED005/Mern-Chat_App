
import { useEffect } from 'react';
import {useSocketContext}from '../context/SocketContext'
import UseConversation from '../zustand/UseConversation';
import notificationsound from '../assets/sounds/frontend_src_assets_sounds_notification.mp3'
const UseListenMessages = () => {
  const{socket}=useSocketContext()
  const {messages,setmessages}=UseConversation();
  useEffect(()=>{

    socket?.on("newMessage",(newMessage)=>{
            newMessage.shouldShake=true;
            const sound=new Audio(notificationsound);
            sound.play()
        setmessages([...messages,newMessage])
    })
    return ()=>socket.off("newMessage")
  },[socket,messages,setmessages])
}

export default UseListenMessages