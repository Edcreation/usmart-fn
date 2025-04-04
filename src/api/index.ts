import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: `${import.meta.env.VITE_API_BASE_URL || "/api"}`,
		prepareHeaders: (headers) => {
			const token = localStorage.getItem("appToken");
			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	tagTypes: ["User", "Product", "Order"],
	endpoints: () => ({}), // Start with empty endpoints
});
