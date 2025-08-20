import {  createContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext.jsx";
import {io} from "socket.io-client"
import { useContext } from "react";

 const SocketContext =createContext();

export const useSocketContext=()=>{
    return useContext(SocketContext)
}
export const SocketContextProvider=({children})=>{
const [socket,setsocket]=useState(null);
const[onlineusers,setonlineusers]=useState([])
const {authUser}=useAuthContext();
useEffect(()=>{
if(authUser){
    const socket=io("http://localhost:8000",{
        query:{
            userid:authUser._id}
    });
    setsocket(socket)
    socket.on("getonlineusers",(users)=>{
   
        setonlineusers(users)
    })
    return ()=>socket.close()
}else{
    if(socket){
        socket.close();
        setsocket(null)
    }
}
},[authUser])
    return (
        <SocketContext.Provider value={{socket,onlineusers}}>
            {children}
        </SocketContext.Provider>
    )
}