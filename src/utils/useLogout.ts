import { useAppDispatch } from "../store/hooks";
import { appLogOut } from "../store/reducers/auth";

export const useLogout = () => {
	const dispatch = useAppDispatch();

	const handleLogout = () => {
		dispatch(appLogOut());
		localStorage.removeItem("appToken");
		window.location.href = "/login";
	};

	return {
		handleLogout,
	};
};
