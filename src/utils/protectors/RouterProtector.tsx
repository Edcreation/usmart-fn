import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

export function RouteProtector({
	children,
	roles,
}: {
	children: ReactNode;
	roles: string[];
}) {
	const { userDetails } = useAppSelector((state) => state.user);
	if (!userDetails) return null;

	const role = userDetails.role ?? "none";

	if (roles.includes(role)) {
		return children;
	} else {
		return <Navigate to={"/"} />;
	}
}

export function LoginProtector() {
	const { userDetails } = useAppSelector((state) => state.user);
	const token = localStorage.getItem("appToken");

	if (!userDetails && !token) {
		return <Outlet />;
	} else {
		return <Navigate to={"/"} />;
	}
}
