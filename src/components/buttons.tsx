export function MainButton({
	title,
	disabled = false,
	onClick,
	isLoading = false,
}: {
	title: string;
	disabled?: boolean;
	onClick?: () => void;
	isLoading?: boolean;
}) {
	return (
		<button
			type="submit"
			className={`flex w-full py-4 justify-center rounded-md ${
				disabled
					? "bg-gray-400 cursor-not-allowed"
					: "bg-[#0099ff] hover:bg-[#0099ffbd] cursor-pointer"
			} px-3 py-1.5 text-sm font-semibold text-white shadow-xs ${
				disabled ? "cursor-not-allowed" : ""
			} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0099ff]`}
			onClick={onClick}
			disabled={disabled}
		>
			{isLoading ? "Loading..." : title}
		</button>
	);
}
