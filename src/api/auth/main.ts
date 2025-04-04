import { baseApi } from "..";
import { appLogin } from "../../store/reducers/auth";
import { setAppUserDetails } from "../../store/reducers/userDetails";
import { toastSuccess } from "../../utils/toast";
import type {
	LoginPayload,
	LoginResponse,
	RegisterPayload,
} from "../auth/types";
import { User } from "../users/types";

export const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation<LoginResponse, LoginPayload>({
			query: (body) => ({
				url: "auth/login",
				method: "POST",
				body,
			}),
			onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
				const data = await queryFulfilled;
				localStorage.setItem("appToken", data.data.access_token);
				dispatch(appLogin());
				dispatch(setAppUserDetails(data.data.user));
				toastSuccess("Login successful.");
				window.location.href = "/";
			},
			invalidatesTags: ["User"],
		}),

		register: builder.mutation<LoginResponse, RegisterPayload>({
			query: (body) => ({
				url: "auth/register",
				method: "POST",
				body: {
					...body,
					role: "student",
				},
			}),
			onQueryStarted: async (_, { queryFulfilled }) => {
				await queryFulfilled;
				toastSuccess("Registration successful, Please Login");
			},
			invalidatesTags: ["User"],
		}),

		userDetails: builder.query<{ user: User }, object>({
			query: () => ({
				method: "GET",
				url: `/auth/check`,
			}),
			providesTags: [],
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				const user = await queryFulfilled;
				dispatch(setAppUserDetails(user.data.user));
			},
		}),
	}),
});

export const { useLoginMutation, useUserDetailsQuery, useRegisterMutation } =
	authApi;
