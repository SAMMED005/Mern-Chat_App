import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import UseConversation from '../../zustand/UseConversation.js'
import toast from 'react-hot-toast'
import UseGetConversations from '../../hooks/useGetConversations.js'
const SearchInput = () => {
	const [search,setsearch]=useState();
	const {setselectedconversation}=UseConversation()
	const {conversations}=UseGetConversations();
	const handlesubmit=(e)=>{
		e.preventDefault();
		if(!search)return;
		if(search.length<3){
			return toast.error("search term should be atleast 3 characters long")
		}
		const conversation=conversations.find((c)=>c.fullname.toLowerCase().includes(search.toLowerCase()));
		if(conversation){
			setselectedconversation(conversation);
			setsearch("")
		}
		else{
			toast.error("No such user found")
		}
	}
	return (
		<form onSubmit={handlesubmit} className='flex items-center gap-2'>
			<input type='text' placeholder='Search…' value={search} onChange={(e)=>setsearch(e.target.value)} className='input input-bordered rounded-full' />
			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
				<IoSearchSharp className='w-6 h-6 outline-none' />
			</button>
		</form>
	);
};
export default SearchInput;