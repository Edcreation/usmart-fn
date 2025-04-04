import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: ReactNode;
	acceptButton?: {
		text: string;
		action: () => void;
		variant?: "primary" | "danger" | "success";
	};
	cancelButton?: {
		text?: string;
		variant?: "secondary" | "outline";
	};
	size?: "sm" | "md" | "lg";
	isLoading?: boolean;
};

const Modal = ({
	isOpen,
	onClose,
	title,
	children,
	acceptButton,
	cancelButton,
	size = "md",
	isLoading,
}: ModalProps) => {
	// Button variants
	const buttonVariants = {
		primary: "bg-blue-600 hover:bg-blue-700 text-white",
		danger: "bg-red-600 hover:bg-red-700 text-white",
		success: "bg-green-600 hover:bg-green-700 text-white",
		secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
		outline: "border border-gray-300 hover:bg-gray-50 text-gray-700",
	};

	// Size classes
	const sizeClasses = {
		sm: "max-w-md",
		md: "max-w-xl",
		lg: "max-w-3xl",
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-[#00000067] bg-opacity-50"
						onClick={onClose}
					/>

					{/* Modal */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						className={`relative w-full ${sizeClasses[size]} rounded-lg bg-white shadow-xl`}
					>
						{/* Header */}
						<div className="flex items-center justify-between p-4">
							<h3 className="text-lg font-semibold text-gray-900">{title}</h3>
							<button
								onClick={onClose}
								className="text-gray-400 hover:text-gray-500"
							>
								<span className="sr-only">Close</span>
								<svg
									className="w-6 h-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>

						{/* Content */}
						<div className="p-6 pt-0">{children}</div>

						{/* Footer */}
						{(acceptButton || cancelButton) && (
							<div className="flex justify-end gap-3 p-4">
								{cancelButton && (
									<button
										onClick={onClose}
										className={`px-4 py-2 rounded-md ${
											buttonVariants[cancelButton.variant || "outline"]
										}`}
									>
										{cancelButton.text || "Cancel"}
									</button>
								)}
								{acceptButton && (
									<button
										disabled={isLoading}
										onClick={() => {
											acceptButton.action();
										}}
										className={`px-4 py-2 rounded-md ${
											buttonVariants[acceptButton.variant || "primary"]
										}`}
									>
										{isLoading ? "...Loading" : acceptButton.text}
									</button>
								)}
							</div>
						)}
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
};

export default Modal;
