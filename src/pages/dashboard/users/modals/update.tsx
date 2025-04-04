import { UpdateUserPayload, User } from "../../../../api/users/types";
import { useForm } from "react-hook-form";
import { useUpdateUserMutation } from "../../../../api/users/main";
import { toastSuccess } from "../../../../utils/toast";
import { useEffect, useState } from "react";
import { MainButton } from "../../../../components/buttons";
import FormContainer from "../../../../components/form";
import Modal from "../../../../components/modal";
import InputFormField from "../../../../components/text-input";
import { motion } from "framer-motion";
import { FiEdit } from "react-icons/fi";

export default function UpdateUserModal({ user }: { user: User }) {
	const [openUpdate, setOpenUpdate] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UpdateUserPayload>();

	const [
		onUpdate,
		{
			isLoading: loading_update,
			isSuccess: success_update,
			error: update_error,
		},
	] = useUpdateUserMutation();

	useEffect(() => {
		if (success_update) {
			setOpenUpdate(false);
			toastSuccess("User Updated");
		}
	}, [success_update]);

	return (
		<div>
			<motion.button
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				onClick={() => setOpenUpdate(true)}
				className="p-2 text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
				title="Edit"
			>
				<FiEdit size={18} />
			</motion.button>
			<Modal
				isOpen={openUpdate}
				onClose={() => {
					setOpenUpdate(false);
				}}
				title="Update User"
				isLoading={loading_update}
				size="md"
			>
				<div className="text-gray-700 text-center">
					<FormContainer
						error={update_error}
						onSubmit={handleSubmit((c) =>
							onUpdate({ id: user?.id, payload: c })
						)}
						className="grid grid-cols-2 gap-3"
					>
						<InputFormField
							label="First Name"
							type="text"
							name="firstName"
							register={register}
							placeholder={"Enter First Name"}
							errors={errors}
							defaultValue={user?.firstName}
							validation={{ required: "First name is required" }}
						/>
						<InputFormField
							label="Last Name"
							type="text"
							name="lastName"
							register={register}
							placeholder={"Enter Last Name"}
							errors={errors}
							defaultValue={user?.lastName}
							validation={{ required: "Last name is required" }}
						/>
						<InputFormField
							label="Email"
							type="email"
							name="email"
							register={register}
							placeholder={"Enter Email"}
							errors={errors}
							defaultValue={user?.email}
							validation={{ required: "Email is required" }}
						/>
						<InputFormField
							label="Username"
							type="text"
							defaultValue={user?.username}
							name="username"
							register={register}
							placeholder={"Enter Username"}
							errors={errors}
							validation={{ required: "Username is required" }}
						/>

						<div className="col-span-2">
							<MainButton
								title={"Update User"}
								isLoading={loading_update}
								disabled={loading_update}
							/>
						</div>
					</FormContainer>
				</div>
			</Modal>
		</div>
	);
}
