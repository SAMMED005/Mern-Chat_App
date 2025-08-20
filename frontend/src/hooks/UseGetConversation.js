import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UseConversation from "../zustand/UseConversation";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setmessages, selectedconversation } = UseConversation();

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const res = await fetch(`/api/auth/message/${selectedconversation._id}`);
				const data = await res.json();
				if (data.error) throw new Error(data.error);
				setmessages(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedconversation?._id) getMessages();
	}, [selectedconversation?._id, setmessages]);

	return { messages, loading };
};
export default useGetMessages;