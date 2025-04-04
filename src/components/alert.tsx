/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

type AlertProps = {
	type: "success" | "danger" | "info" | "warning";
	text: ReactNode;
	closable?: boolean;
	onClose?: () => void;
	className?: string;
	autoDismiss?: number | false; // Time in ms or false to disable
};

export default function AppAlert({
	type,
	text,
	onClose,
	closable = true,
	className = "",
	autoDismiss = 10000,
}: AlertProps) {
	// Color mappings based on alert type
	const alertColors = {
		success: {
			bg: "bg-emerald-50",
			text: "text-emerald-800",
			border: "border-emerald-200",
			icon: "bx bx-check-circle text-emerald-500",
		},
		danger: {
			bg: "bg-red-50",
			text: "text-red-800",
			border: "border-red-200",
			icon: "bx bx-error-circle text-red-500",
		},
		info: {
			bg: "bg-blue-50",
			text: "text-blue-800",
			border: "border-blue-200",
			icon: "bx bx-info-circle text-blue-500",
		},
		warning: {
			bg: "bg-amber-50",
			text: "text-amber-800",
			border: "border-amber-200",
			icon: "bx bx-error text-amber-500",
		},
	};

	useEffect(() => {
		if (autoDismiss && onClose) {
			const timer = setTimeout(() => {
				onClose();
			}, autoDismiss);
			return () => clearTimeout(timer);
		}
	}, [autoDismiss, onClose]);

	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			className={`rounded-lg ${alertColors[type].bg} ${alertColors[type].border} border px-4 py-3 shadow-sm transition-all duration-300 ${className}`}
			role="alert"
		>
			<div className="flex items-start">
				<i className={`${alertColors[type].icon} mr-2 mt-0.5 text-xl`}></i>
				<div className={`flex-1 capitalize ${alertColors[type].text}`}>
					{text}
				</div>
				{closable && (
					<button
						type="button"
						onClick={() => onClose && onClose()}
						className={`ml-4 inline-flex rounded-md p-1 transition-colors hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-${type}-500 focus:ring-offset-2`}
						aria-label="Close"
					>
						<i className="bx bx-x text-xl"></i>
					</button>
				)}
			</div>
		</motion.div>
	);
}

export function ErrorAlert({
	error,
	className,
}: {
	error: any;
	className?: string;
}) {
	const [showAlert, setShowAlert] = useState(!!error);

	useEffect(() => {
		setShowAlert(!!error);
	}, [error]);

	if (!showAlert || !error) {
		return null;
	}

	return (
		<AppAlert
			type="danger"
			onClose={() => setShowAlert(false)}
			text={
				error.data
					? error.data.message ?? error.data.error ?? "An error occurred"
					: "Server error"
			}
			className={className}
		/>
	);
}

export function SuccessAlert({
	text,
	className,
}: {
	text: string | undefined;
	className?: string;
}) {
	const [showAlert, setShowAlert] = useState(!!text);

	useEffect(() => {
		setShowAlert(!!text);
	}, [text]);

	if (!showAlert || !text) {
		return null;
	}

	return (
		<AppAlert
			type="success"
			onClose={() => setShowAlert(false)}
			text={text}
			className={className}
		/>
	);
}

export function InfoAlert({
	text,
	className,
}: {
	text: string | undefined;
	className?: string;
}) {
	const [showAlert, setShowAlert] = useState(!!text);

	useEffect(() => {
		setShowAlert(!!text);
	}, [text]);

	if (!showAlert || !text) {
		return null;
	}

	return (
		<AppAlert
			type="info"
			onClose={() => setShowAlert(false)}
			text={text}
			className={className}
		/>
	);
}

export function WarningAlert({
	text,
	className,
}: {
	text: string | undefined;
	className?: string;
}) {
	const [showAlert, setShowAlert] = useState(!!text);

	useEffect(() => {
		setShowAlert(!!text);
	}, [text]);

	if (!showAlert || !text) {
		return null;
	}

	return (
		<AppAlert
			type="warning"
			onClose={() => setShowAlert(false)}
			text={text}
			className={className}
		/>
	);
}
