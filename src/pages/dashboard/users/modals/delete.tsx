import { useEffect, useState } from "react";
import { useDeleteUserMutation } from "../../../../api/users/main";
import { User } from "../../../../api/users/types";
import { ErrorAlert } from "../../../../components/alert";
import Modal from "../../../../components/modal";
import { toastSuccess } from "../../../../utils/toast";
import { motion } from "framer-motion";
import { FiTrash2 } from "react-icons/fi";

export default function DeleteUserModal({ user }: { user: User }) {
	const [openDelete, setOpenDelete] = useState(false);

	const [
		onDelete,
		{
			isLoading: loading_delete,
			isSuccess: success_delete,
			error: delete_error,
		},
	] = useDeleteUserMutation();

	useEffect(() => {
		if (success_delete) {
			setOpenDelete(false);
			toastSuccess("User Deleted");
		}
	}, [success_delete]);

	return (
		<>
			<motion.button
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				onClick={() => setOpenDelete(true)}
				className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
				title="Delete"
			>
				<FiTrash2 size={18} />
			</motion.button>

			<Modal
				isOpen={openDelete}
				onClose={() => {
					setOpenDelete(false);
				}}
				title="Confirm Deletion"
				isLoading={loading_delete}
				acceptButton={{
					text: "Delete",
					action: () => onDelete({ id: user.id }),
					variant: "danger",
				}}
				cancelButton={{
					text: "Cancel",
					variant: "outline",
				}}
				size="md"
			>
				<div className="text-gray-700 text-center">
					<ErrorAlert error={delete_error} />
					<p className="text-lg mt-3">
						Are you sure you want to delete user
						<span className="text-red-500 mx-2 font-semibold">
							{user.firstName} {user.lastName}?
						</span>
					</p>
					<p className="mt-2 text-xs text-gray-500">
						This action cannot be undone.
					</p>
				</div>
			</Modal>
		</>
	);
}
