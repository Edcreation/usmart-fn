import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/auth/login";
import { Error404Page, Error500Page } from "./pages/error";
import { AuthProtector } from "./utils/protectors/MainProtector";
import { DashboardLayout } from "./pages/dashboard/layout";
import UsersPage from "./pages/dashboard/users";
import {
	LoginProtector,
	RouteProtector,
} from "./utils/protectors/RouterProtector";
import ProfilePage from "./pages/dashboard/profile";
import RegisterPage from "./pages/auth/register";

const router = createBrowserRouter([
	{
		path: "/",
		errorElement: <Error500Page />,
		children: [
			{
				path: "/",
				element: <AuthProtector />,
				children: [
					{
						path: "",
						element: <DashboardLayout />,
						children: [
							{
								index: true,
								element: <ProfilePage />,
							},
							{
								path: "users",
								element: (
									<RouteProtector roles={["admin"]}>
										<UsersPage />,
									</RouteProtector>
								),
							},
						],
					},
				],
			},
			{
				path: "",
				element: <LoginProtector />,
				children: [
					{
						path: "login",
						element: <LoginPage />,
					},
					{
						path: "register",
						element: <RegisterPage />,
					},
				],
			},
			{
				path: "*",
				element: <Error404Page />,
			},
		],
	},
]);

export default function RouterContainer() {
	return <RouterProvider router={router} />;
}
