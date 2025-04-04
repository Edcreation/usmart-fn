export function Error404Page() {
	return (
		<div className="h-screen flex flex-col items-center justify-center">
			<h1 className="text-6xl font-bold text-red-600">Error 404</h1>
			<p className="text-2xl text-gray-600">Page not found</p>
			<a
				href="/"
				className="mt-8 px-4 py-2 bg-[#0099ff] text-white rounded-md hover:bg-indigo-700"
			>
				Go back home
			</a>
		</div>
	);
}
export function Error500Page() {
	return (
		<div className="h-screen flex flex-col items-center justify-center">
			<h1 className="text-6xl font-bold text-red-600">Error 500</h1>
			<p className="text-2xl text-gray-600">
				Something went wrong, our team has been notified
			</p>
			<a
				href="/"
				className="mt-8 px-4 py-2 bg-[#0099ff] text-white rounded-md hover:bg-indigo-700"
			>
				Go back home
			</a>
		</div>
	);
}
