import { useEffect, useRef } from "react";
import useGetConversations from "../../hooks/UseGetConversation.js";
import Skeleton from "../skeletons/Skeleton.jsx";
import Message from "./Message";
import UseListenMessages from "../../hooks/UseListenMessages.js";

const Messages = () => {
	const {messages,loading}=useGetConversations();
	UseListenMessages();
	const lastmessage=useRef();

useEffect(()=>{
	setTimeout(()=>{
lastmessage.current?.scrollIntoView({behaviour:"smooth"});
	},900)
},[messages])
	return (
		<div className='px-4 flex-1 overflow-auto'>
			{!loading&&messages.length>0&&messages.map((message)=>(
				<div key={message._id} ref={lastmessage}>

<Message  message={message}/>
				</div>
			))}
			{loading && [...Array(2)].map((_,idx)=><Skeleton key={idx}/>)}
			{!loading && messages.length=== 0 && (<p className="text-center text-white">Send a message to Start a Conversation</p>)}
		</div>
	);
};
export default Messages;