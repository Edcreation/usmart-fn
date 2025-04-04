import { Navigate, Outlet } from "react-router-dom";
import { useUserDetailsQuery } from "../../api/auth/main";

export const AuthProtector = () => {
	const token = localStorage.getItem("appToken");
	const { isError, isLoading } = useUserDetailsQuery({}, { skip: !token });

	const isDark = localStorage.getItem("ynexdarktheme") === "dark";

	if (isLoading) {
		return (
			<div
				className={`h-screen flex justify-center items-center w-screen  ${
					isDark ? "bg-[#0f0f0f]" : "bg-white"
				}  absolute`}
			>
				<div className={`w-16 h-16 text-primary relative`} role="status">
					<div
						className={
							"animate-spin h-12 w-12 border-[8px] border-dashed border-primary rounded-full"
						}
					></div>
				</div>
			</div>
		);
	}
	if (!token || isError) {
		return <Navigate to={"/login"} />;
	}

	return <Outlet />;
};
