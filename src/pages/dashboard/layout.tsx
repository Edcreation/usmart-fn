import { useState } from "react";
import { Sidebar } from "../../components/sidebar";
import { Outlet } from "react-router-dom";
import logo from "../../assets/user_logo.png";

export const DashboardLayout = () => {
	const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

	return (
		<div
			id="page-container"
			className="mx-auto flex min-h-screen w-full min-w-[320px] flex-col bg-white lg:ps-64"
		>
			{/* Sidebar */}
			<Sidebar
				mobileOpen={mobileSidebarOpen}
				setMobileOpen={setMobileSidebarOpen}
			/>

			{/* Page Header */}
			<header
				id="page-header"
				className="fixed start-0 end-0 top-0 z-30 flex h-20 flex-none items-center bg-white shadow-xs lg:hidden"
			>
				<div className="container mx-auto flex justify-between px-4 lg:px-8">
					{/* Left Section - Toggle Sidebar */}
					<div className="flex items-center gap-2">
						<button
							type="button"
							className="inline-flex items-center justify-center gap-2 rounded-sm border border-slate-200 bg-white px-2 py-1.5 font-semibold leading-6 text-slate-800 shadow-xs hover:border-slate-300 hover:bg-slate-100 hover:shadow-sm focus:outline-hidden focus:ring-3 focus:ring-slate-500/25 active:border-white active:bg-white active:shadow-none"
							onClick={() => setMobileSidebarOpen(true)}
						>
							<svg
								className="hi-solid hi-menu-alt-1 inline-block size-5"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
					</div>

					{/* Middle Section - Brand */}
					<div className="flex items-center gap-2">
						<a
							href="/"
							className="inline-flex items-center gap-2 text-lg font-bold tracking-wide text-slate-800 transition hover:opacity-75"
						>
							<img src={logo} className="w-16" alt="logo" />
						</a>
					</div>

					<div className=""></div>
				</div>
			</header>

			{/* Page Content */}
			<main
				id="page-content"
				className="flex max-w-full bg-slate-200 p-3 pt-30 md:pt-30 lg:pt-10 md:p-10 flex-auto flex-col "
			>
				<Outlet />
			</main>
		</div>
	);
};
