import { baseApi } from "..";
import { ListResponse } from "../../utils/types";
import type { User } from "../users/types";

export const usersApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		createUser: builder.mutation<User, Partial<User>>({
			query: (body) => ({
				url: "users",
				method: "POST",
				body,
			}),
			invalidatesTags: ["User"],
		}),

		getUsers: builder.query<
			ListResponse<User>,
			{ pageNumber?: number; pageSize?: number }
		>({
			query: (params) => ({
				url: `users`,
				method: "GET",
				params,
			}),
			providesTags: ["User"],
		}),

		updateUser: builder.mutation<User, { id: string; payload: Partial<User> }>({
			query: ({ id, payload }) => ({
				url: `users/${id}`,
				method: "PATCH",
				body: payload,
			}),
			invalidatesTags: ["User"],
		}),

		deleteUser: builder.mutation<void, { id: string }>({
			query: ({ id }) => ({
				url: `users/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["User"],
		}),
	}),
});

export const {
	useCreateUserMutation,
	useGetUsersQuery,
	useUpdateUserMutation,
	useDeleteUserMutation,
} = usersApi;
