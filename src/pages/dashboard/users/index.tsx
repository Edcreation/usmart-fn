import { motion } from "framer-motion";
import { FiUser, FiMail } from "react-icons/fi";
import { useGetUsersQuery } from "../../../api/users/main";
import { User } from "../../../api/users/types";
import DataTable, { TableColumn } from "../../../components/table";

import UpdateUserModal from "./modals/update";
import DeleteUserModal from "./modals/delete";
import CreateUserModal from "./modals/create";
import { useState } from "react";

const UsersPage = () => {
	const [pageNumber, setPageNumber] = useState(1);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [pageSize, _] = useState(10);
	const { data, isLoading } = useGetUsersQuery({ pageNumber, pageSize });

	const users: User[] = data?.list || [];

	const columns: TableColumn<User>[] = [
		{
			title: "User",
			field: "firstName",
			Cell: ({ entry }) => (
				<div className="flex items-center">
					<div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-[#0099ff] mr-3">
						<FiUser size={18} />
					</div>
					<div>
						<p className="font-medium">
							{entry.firstName} {entry.lastName}
						</p>
					</div>
				</div>
			),
		},
		{
			title: "Email",
			field: "email",
			Cell: ({ entry }) => (
				<div className="flex items-center text-sm">
					<FiMail className="mr-2 mt-1 text-gray-400" />
					{entry.email}
				</div>
			),
		},
		{
			title: "Role",
			field: "role",
			Cell: ({ entry }) => (
				<span className="text-xs capitalize font-medium px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
					{entry.role}
				</span>
			),
		},
		{
			title: "Status",
			field: "status",
			Cell: ({ entry }) => (
				<span className="text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center w-fit bg-emerald-100 text-emerald-800">
					{entry.status}
				</span>
			),
		},
		{
			title: "Actions",
			Cell: ({ entry }) => (
				<div className="flex flex-row gap-2">
					<UpdateUserModal user={entry} />
					{entry.role !== "admin" && <DeleteUserModal user={entry} />}
				</div>
			),
		},
	];

	return (
		<div className="w-full max-w-6xl mx-auto bg-gradient-to-br from-white to-gray-50 overflow-hidden shadow-xl rounded-2xl p-6 md:p-8">
			<div className="flex justify-between items-center mb-6">
				<motion.h1
					initial={{ x: -20, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.4 }}
					className="text-2xl font-bold text-gray-800"
				>
					User Management
				</motion.h1>
				<CreateUserModal />
			</div>

			<DataTable<User>
				columns={columns}
				isLoading={isLoading}
				data={users}
				total={data?.total ?? 0}
				currentPage={data?.currentPage ?? 0}
				nextPageNumber={data?.nextPage ?? null}
				nextPage={() => (data ? setPageNumber(data.currentPage + 1) : {})}
				previousPage={() => (data ? setPageNumber(data.currentPage - 1) : {})}
				lastPage={12}
				onRowClick={(user) => console.log("Row clicked", user)}
			/>
		</div>
	);
};

export default UsersPage;
