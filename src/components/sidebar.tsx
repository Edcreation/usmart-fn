import { NavLink, useLocation } from "react-router-dom";
import { ComponentProtector } from "../utils/protectors/ComponentProtector";
import { useLogout } from "../utils/useLogout";
import logo from "../assets/user_logo.png";

const SidebarItem = ({
	icon,
	label,
	id,
	onClick,
}: {
	icon: React.ReactNode;
	label: string;
	id: string;
	onClick?: () => void;
}) => {
	const location = useLocation();
	const active = location.pathname === `/${id}`;

	if (onClick) {
		return (
			<button
				onClick={onClick}
				className={`flex items-center gap-3 w-full rounded-lg px-4 py-2.5 font-semibold ${
					active
						? "bg-gray-700 text-gray-100 shadow-xs shadow-slate-300/50"
						: "text-gray-100 hover:bg-gray-600/50 hover:text-gray-200 hover:shadow-xs hover:shadow-slate-300/50"
				}`}
			>
				{icon}
				<span>{label}</span>
			</button>
		);
	}

	return (
		<NavLink
			to={`/${id}`}
			className={`flex items-center gap-3 w-full rounded-lg px-4 py-2.5 font-semibold ${
				active
					? "bg-gray-700 text-gray-100 shadow-xs shadow-slate-300/50"
					: "text-gray-100 hover:bg-gray-600/50 hover:text-gray-200 hover:shadow-xs hover:shadow-slate-300/50"
			}`}
		>
			{icon}
			<span>{label}</span>
		</NavLink>
	);
};

export const Sidebar = ({
	mobileOpen,
	setMobileOpen,
}: {
	mobileOpen: boolean;
	setMobileOpen: (open: boolean) => void;
}) => {
	const { handleLogout } = useLogout();
	const mainItems = [
		{
			icon: (
				<svg
					className="bi bi-house-heart-fill inline-block size-4 text-slate-400"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 16 16"
				>
					<path d="M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.707L8 2.207 1.354 8.853a.5.5 0 1 1-.708-.707L7.293 1.5Z" />
					<path d="m14 9.293-6-6-6 6V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9.293Zm-6-.811c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.691 0-5.018Z" />
				</svg>
			),
			label: "Dashboard",
			id: "",
			roles: ["admin", "student", "teacher"],
		},
		{
			icon: (
				<svg
					className="bi bi-people-fill inline-block size-4 text-slate-400"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 16 16"
				>
					<path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
					<path
						fillRule="evenodd"
						d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
					/>
					<path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
				</svg>
			),
			label: "Users",
			id: "users",
			roles: ["admin"],
		},
	];

	const subItems = [
		{
			icon: (
				<svg
					className="bi bi-lock-fill inline-block size-4 text-slate-400"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 16 16"
				>
					<path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
				</svg>
			),
			label: "Logout",
			id: "logout",
			onclick: () => handleLogout(),
		},
	];

	return (
		<nav
			id="page-sidebar"
			className={`fixed start-0 top-0 bottom-0 z-50 flex h-full w-80 flex-col overflow-auto bg-gray-900 transition-transform duration-500 ease-out lg:w-64 lg:translate-x-0 ${
				!mobileOpen ? "-translate-x-full" : "translate-x-0"
			}`}
			aria-label="Main Sidebar Navigation"
		>
			<div className="flex h-20 w-full flex-none items-center justify-center px-8">
				<a
					href="/"
					className="flex justify-center items-center gap-2 text-lg font-bold tracking-wide text-slate-800 transition hover:opacity-75"
				>
					<img src={logo} className="w-16" alt="logo" />
				</a>

				{/* Close Sidebar on Mobile */}
				<div className="lg:hidden">
					<button
						type="button"
						className="flex size-10 items-center justify-center text-slate-400 hover:text-slate-600"
						onClick={() => setMobileOpen(false)}
					>
						<svg
							className="hi-solid hi-x -mx-1 inline-block size-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clipRule="evenodd"
							/>
						</svg>
					</button>
				</div>
			</div>

			{/* Main Navigation */}
			<div className="w-full grow space-y-3 p-4">
				{mainItems.map((item) => (
					<ComponentProtector roles={item.roles}>
						<SidebarItem
							key={item.id}
							id={item.id}
							icon={item.icon}
							label={item.label}
						/>
					</ComponentProtector>
				))}
			</div>

			{/* Sub Navigation */}
			<div className="w-full flex-none space-y-3 p-4">
				{subItems.map((item) => (
					<SidebarItem
						key={item.id}
						id={item.id}
						icon={item.icon}
						label={item.label}
						onClick={item.onclick}
					/>
				))}
			</div>
		</nav>
	);
};
