import { useState } from "react";
import { BsSend } from "react-icons/bs";
import UseSendMessage from "../../hooks/UseSendMessage";

// const MessageInput = () => {
// 	return (
// 		<form className='px-4 my-3'>
// 			<div className='w-full'>
// 				<input
// 					type='text'
// 					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
// 					placeholder='Send a message'
// 				/>
// 				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
// 					<BsSend />
// 				</button>
// 			</div>
// 		</form>
// 	);
// };
// export default MessageInput;


const MessageInput = () => {
	const [message,setmessage]=useState("")
	const{loading,sendmessage}=UseSendMessage();
const handlesubmit=async(e)=>{
	e.preventDefault();
	if(!message)return;
	await sendmessage(message);
	setmessage("")
}

	return (
		<form className='px-4 my-3' onSubmit={handlesubmit}>
			<div className='w-full relative'>
				<input
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
					placeholder='Send a message'
					value={message}
					onChange={(e)=>setmessage(e.target.value)}
				/>
				<button type='submit' className='absolute inset-y-0 text-white end-0 flex items-center pe-3 cursor-pointer'>
				{loading ? <div className='loading loading-spinner'></div> : <BsSend />}

				</button>
			</div>
		</form>
	);
};
export default MessageInput;