import React from "react";
import { ErrorAlert } from "./alert";

export default function FormContainer({
	onSubmit,
	children,
	error,
	className,
}: {
	onSubmit?: React.FormEventHandler<HTMLFormElement>;
	children: React.ReactNode;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	error?: any;
	className?: string;
}) {
	return (
		<form onSubmit={onSubmit}>
			<ErrorAlert error={error} />
			<div className={className}>{children}</div>
		</form>
	);
}
