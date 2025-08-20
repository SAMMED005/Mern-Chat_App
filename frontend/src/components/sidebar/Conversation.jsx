// const Conversation = () => {
//     	return (
//     		<>
//     			<div className='flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer'>
// 				<div className="avatar avatar-online ">
//   <div className="w-24 rounded-full ">
//     <img src="cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png" />
//   </div>
// </div>

import { useSocketContext } from "../../context/SocketContext.jsx";
import UseConversation from "../../zustand/UseConversation.js";

    
//     				<div className='flex flex-col flex-1'>
//     					<div className='flex gap-3 justify-between'>
//     						<p className='font-bold text-gray-200'>John Doe</p>
//     						<span className='text-xl'>🎃</span>
//     					</div>
//     				</div>
                    
//     			</div>
    
//     			<div className='divider my-0 py-0 h-1' />
//     		</>
//     	);
//     };
//     export default Conversation;

// const Conversation = () => {
// 		return (
// 			<>
// 				<div className='flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer'>
// 					{/* <div className='avatar online'>
// 						<div className='w-12 rounded-full'>
// 							<img
// 								src='https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png'
// 								alt='user avatar'
// 							/>
// 						</div>
// 					</div>
// 	 */}
// 	 					<div className="avatar avatar-online ">
//    <div className="w-24 rounded-full ">
//      <img src="cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png" />
//    </div>
//  </div>
// 					<div className='flex flex-col flex-1'>
// 						<div className='flex gap-3 justify-between'>
// 							<p className='font-bold text-gray-200'>John Doe</p>
// 							<span className='text-xl'>🎃</span>
// 						</div>
// 					</div>
// 				</div>
	
// 				<div className='divider my-0 py-0 h-1' />
// 			</>
// 		);
// 	};
// 	export default Conversation;


const Conversation = ({conversation,lastindx,emojis}) => {
    const {selectedconversation,setselectedconversation}=UseConversation();
    const isSelected=selectedconversation?._id===conversation._id;
    const {onlineusers}=useSocketContext();
    
    const isonline=onlineusers.includes(conversation._id)
    console.log(isonline)
    return (
        <>
            <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
                ${isSelected?"bg-blue-500":""}    
                `}
                onClick={()=>setselectedconversation(conversation)}
                
                >
                    {/* {isonline} */}
                <div className={`avatar ${isonline?'avatar-online':''}`}>
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img 
                            src={conversation.profilepic}
                            alt="user avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
                <div className='flex flex-col flex-1'>
                    <div className='flex gap-3 justify-between'>
                        <p className='font-bold text-gray-200'>{conversation.fullname} </p>
                        <span className='text-xl'>{emojis}</span>
                    </div>
                </div>
            </div>
            {!lastindx&&<div className='divider my-0 py-0 h-1' />}
        </>
    );
};

export default Conversation;
