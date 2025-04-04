import React, { useState } from "react";
import {
	FieldError,
	FieldErrors,
	FieldValues,
	Path,
	RegisterOptions,
	UseFormRegister,
} from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface AppProps<T extends FieldValues> {
	title?: string;
	placeholder: string;
	type:
		| "text"
		| "password"
		| "email"
		| "number"
		| "date"
		| "file"
		| "datetime-local"
		| "time"
		| "search"
		| "phone";
	register: UseFormRegister<T>;
	name: Path<T>;
	errors: FieldErrors<T>;
	validation?: RegisterOptions<T, Path<T>>;
	disabled?: boolean;
	className?: string;
	label?: string;
	optionalComponent?: React.ReactNode;
	defaultValue?: string;
}

export default function InputFormField<T extends FieldValues>({
	label,
	validation,
	placeholder,
	type,
	register,
	name,
	errors,
	disabled,
	className,
	optionalComponent,
	defaultValue,
}: AppProps<T>) {
	const error = errors[name] as FieldError | undefined;
	const [pass, setPass] = useState<string | undefined>(undefined);

	// Handle number input formatting
	const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		// Remove non-numeric characters (except decimal point)
		const numericValue = value.replace(/[^0-9.]/g, "");
		// Ensure only one decimal point
		e.target.value = numericValue.replace(/(\..*)\./g, "$1");
	};

	return (
		<div className="mt-2">
			<div className="flex items-center justify-between">
				<label
					htmlFor="password"
					className="block text-sm/6 font-medium text-gray-900"
				>
					{label}
				</label>
				{optionalComponent && optionalComponent}
			</div>
			<div className="input-group relative">
				<input
					{...register(name, {
						...validation,
						setValueAs: (value) => {
							if (type === "number") {
								// Convert the value to a number or return undefined if empty
								return value === "" ? undefined : Number(value);
							}
							if (type === "date" || type === "datetime-local") {
								return value ? new Date(value) : undefined;
							}
							return value;
						},
						onChange: type === "number" ? handleNumberInput : undefined,
					})}
					type={pass ? "text" : type}
					defaultValue={defaultValue}
					className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#0099ff] sm:text-sm/6 ${className}`}
					id={`form-${name}`}
					placeholder={placeholder}
					disabled={disabled}
				/>
				{type === "password" && (
					<div
						onClick={() =>
							setPass((prev) => (prev === undefined ? "text" : undefined))
						}
						title="Show Password"
						className="absolute right-0 top-0 px-3 py-2.5 rounded-r-sm cursor-pointer bg-gray-200/40"
					>
						{pass === "text" ? <FaEye /> : <FaEyeSlash />}
					</div>
				)}
			</div>
			<div className="text-red-600 text-xs">
				{error && (
					<div className="invalid-feedback">
						{error.message as React.ReactNode}
					</div>
				)}
			</div>
		</div>
	);
}
