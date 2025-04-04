import { ReactNode } from "react";
import { useAppSelector } from "../../store/hooks";

export function ComponentProtector({
	children,
	roles,
}: {
	children: ReactNode;
	roles: string[];
}) {
	const { userDetails } = useAppSelector((state) => state.user);
	const role = userDetails?.role ?? "none";
	console.log("====================================");
	console.log("====================================");

	if (roles.includes(role)) {
		return children;
	} else {
		return null;
	}
}
