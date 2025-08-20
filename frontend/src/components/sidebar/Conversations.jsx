import Conversation from "./Conversation";
import {getRandomEmoji} from '../../utils/getemoji.js'
import useGetConversations from "../../hooks/useGetConversations.js"

const Conversations = () => {
	const{loading,conversations}= useGetConversations();

	// console.log("conversations:",conversations)
	
	return (
		<div className='py-2 flex flex-col overflow-auto  '>
			{conversations.map((conversation,idx)=>(

				<Conversation
				conversation={conversation}
				key={conversation._id}
				emojis={getRandomEmoji()}
				lastindx={idx===conversations.length-1}
				/>
			))}
			{loading?<span className="loading loading-spinner mx-auto"></span>:null}
		</div>
	);
};
export default Conversations;