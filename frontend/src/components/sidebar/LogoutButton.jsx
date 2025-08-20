import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/UseLogout.js";

const LogoutButton = () => {
	const { loading, logout } = useLogout();

	return (
		<div className='mt-auto'>
			{!loading ? (
				<BiLogOut className='w-6 h-6 text-red-400 cursor-pointer' onClick={logout} />
			) : (
				<span className='loading loading-spinner'></span>
				// <h1>issue caused here</h1>
			)}
            {/* <BiLogOut className="w-6 h-6 text-red-400 cursor-pointer"/> */}

		</div>
	);
};
export default LogoutButton;