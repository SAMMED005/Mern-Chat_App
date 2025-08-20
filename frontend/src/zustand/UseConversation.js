import {create} from 'zustand'
const UseConversation=create((set)=>({

selectedconversation:null,
setselectedconversation:(selectedconversation)=>set({selectedconversation}),
messages:[],
setmessages:(messages)=>set({messages})
}))
export default UseConversation;