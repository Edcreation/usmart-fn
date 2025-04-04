import { Icon } from "@iconify/react";
import toast from "react-hot-toast";

type ToastType = "success" | "error" | "info" | "warning";

export function showToast(type: ToastType, message: string) {
	const toastConfig = {
		success: {
			icon: <Icon icon="heroicons:check-circle" className="text-emerald-500" />,
			className: "bg-emerald-50 text-emerald-800 border-emerald-200",
		},
		error: {
			icon: (
				<Icon icon="heroicons:exclamation-circle" className="text-red-500" />
			),
			className: "bg-red-50 text-red-800 border-red-200",
		},
		info: {
			icon: (
				<Icon icon="heroicons:information-circle" className="text-blue-500" />
			),
			className: "bg-blue-50 text-blue-800 border-blue-200",
		},
		warning: {
			icon: (
				<Icon
					icon="heroicons:exclamation-triangle"
					className="text-amber-500"
				/>
			),
			className: "bg-amber-50 text-amber-800 border-amber-200",
		},
	};

	return toast.custom((t) => (
		<div
			className={`${
				toastConfig[type].className
			} flex items-start gap-3 rounded-lg border p-4 shadow-lg transition-all ${
				t.visible ? "animate-enter" : "animate-leave"
			}`}
		>
			<div className="text-xl">{toastConfig[type].icon}</div>
			<div className="flex-1">
				<p className="font-medium">{message}</p>
			</div>
			<button
				onClick={() => toast.dismiss(t.id)}
				className="text-gray-400 hover:text-gray-500"
			>
				<Icon icon="heroicons:x-mark" />
			</button>
		</div>
	));
}

// Convenience methods
export const toastSuccess = (message: string) => showToast("success", message);
export const toastError = (message: string) => showToast("error", message);
export const toastInfo = (message: string) => showToast("info", message);
export const toastWarning = (message: string) => showToast("warning", message);
