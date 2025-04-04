import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useGetParams = () => {
	const location = useLocation();
	const [queryParams, setQueryParams] = useState<{ [key: string]: string }>({});

	const getQueryParams = (search: string): { [key: string]: string } => {
		const params = new URLSearchParams(search);
		const result: { [key: string]: string } = {};
		for (const [key, value] of params.entries()) {
			result[key] = value;
		}
		return result;
	};

	useEffect(() => {
		const params = getQueryParams(location.search);
		setQueryParams(params);
	}, [location.search]);

	return queryParams;
};
