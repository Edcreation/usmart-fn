import { motion } from "framer-motion";
import { FiMail, FiPhoneCall } from "react-icons/fi";
import { useAppSelector } from "../../../store/hooks";

const ProfilePage = () => {
	const { userDetails } = useAppSelector((state) => state.user);
	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="w-full max-w-4xl mx-auto bg-gradient-to-br from-white to-gray-50 overflow-hidden shadow-xl rounded-2xl p-8 md:p-12"
		>
			<div className="flex flex-col md:flex-row gap-12 items-center">
				{/* Profile Picture */}
				<motion.div
					initial={{ scale: 0.9 }}
					animate={{ scale: 1 }}
					transition={{ duration: 0.5 }}
					className="relative group"
				>
					<img
						src="https://avatars.githubusercontent.com/u/34592376?v=4"
						alt="Profile Picture"
						className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover border-4 border-white shadow-lg group-hover:border-indigo-200 transition-all duration-300"
					/>
					<div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-indigo-300/50 group-hover:scale-105 transition-all duration-300 pointer-events-none" />
				</motion.div>

				{/* Profile Content */}
				<div className="flex-1 text-center md:text-left">
					<motion.h1
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.1, duration: 0.5 }}
						className="text-3xl md:text-4xl font-bold text-gray-800 mb-2"
					>
						{userDetails?.firstName} {userDetails?.lastName}
					</motion.h1>

					<motion.p
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.2, duration: 0.5 }}
						className="text-xl text-[#0099ff] capitalize font-medium mb-6"
					>
						{userDetails?.role}
					</motion.p>

					<motion.div
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.3, duration: 0.5 }}
						className="mb-8"
					>
						<div className="flex flex-wrap justify-center md:justify-start gap-4">
							{userDetails?.phone && (
								<div className="flex items-center px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-[#0099ff] rounded-full transition-colors duration-300">
									<FiPhoneCall className="mr-2" />
									{userDetails?.phone}
								</div>
							)}
							<a
								href="mailto:ahmed@example.com"
								className="flex items-center px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-full transition-colors duration-300"
							>
								<FiMail className="mr-2" />
								{userDetails?.email}
							</a>
						</div>
					</motion.div>

					{/* Skills/Tags */}
					{userDetails?.role === "student" && (
						<motion.div
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.4, duration: 0.5 }}
							className="mt-8"
						>
							<h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
								Technologies
							</h3>
							<div className="flex flex-wrap justify-center md:justify-start gap-2">
								{[
									"React",
									"TypeScript",
									"Node.js",
									"Tailwind CSS",
									"GraphQL",
									"AWS",
								].map((tech) => (
									<span
										key={tech}
										className="px-3 py-1 bg-white text-sm text-gray-700 rounded-full shadow-sm border border-gray-200"
									>
										{tech}
									</span>
								))}
							</div>
						</motion.div>
					)}
				</div>
			</div>
		</motion.section>
	);
};

export default ProfilePage;
