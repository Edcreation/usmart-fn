import { CreateUserPayload } from "../../../../api/users/types";
import { useForm } from "react-hook-form";
import { useCreateUserMutation } from "../../../../api/users/main";
import { toastSuccess } from "../../../../utils/toast";
import { useEffect, useState } from "react";
import { MainButton } from "../../../../components/buttons";
import FormContainer from "../../../../components/form";
import Modal from "../../../../components/modal";
import InputFormField from "../../../../components/text-input";
import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";

export default function CreateUserModal() {
	const [openCreate, setOpenCreate] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<CreateUserPayload>();

	const [
		onCreate,
		{
			isLoading: loading_create,
			isSuccess: success_create,
			error: create_error,
		},
	] = useCreateUserMutation();

	useEffect(() => {
		if (success_create) {
			setOpenCreate(false);
			reset();
			toastSuccess("User Created");
		}
	}, [success_create]);

	const roles = ["admin", "student", "teacher"];

	return (
		<div>
			<motion.button
				onClick={() => setOpenCreate(true)}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				className="px-4 py-2 flex flex-row gap-1 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-colors"
			>
				<FiPlus size={24} />
				Add New User
			</motion.button>
			<Modal
				isOpen={openCreate}
				onClose={() => {
					setOpenCreate(false);
				}}
				title="Create User"
				isLoading={loading_create}
				size="md"
			>
				<div className="text-gray-700 text-center">
					<FormContainer
						error={create_error}
						onSubmit={handleSubmit((c) => onCreate(c))}
						className="grid grid-cols-2 gap-3"
					>
						<InputFormField
							label="First Name"
							type="text"
							name="firstName"
							register={register}
							placeholder={"Enter First Name"}
							errors={errors}
							validation={{ required: "First name is required" }}
						/>
						<InputFormField
							label="Last Name"
							type="text"
							name="lastName"
							register={register}
							placeholder={"Enter Last Name"}
							errors={errors}
							validation={{ required: "Last name is required" }}
						/>
						<InputFormField
							label="Email"
							type="email"
							name="email"
							register={register}
							placeholder={"Enter Email"}
							errors={errors}
							validation={{ required: "Email is required" }}
						/>
						<InputFormField
							label="Username"
							type="text"
							name="username"
							register={register}
							placeholder={"Enter Username"}
							errors={errors}
							validation={{ required: "Username is required" }}
						/>
						<InputFormField
							label="Phone Number"
							type="phone"
							name="phone"
							register={register}
							placeholder={"Enter Phone Number"}
							errors={errors}
							validation={{ required: "Phone Number is required" }}
						/>
						<InputFormField
							label="Password"
							type="password"
							name="password"
							register={register}
							placeholder="Enter Password"
							validation={{ required: "Password is required" }}
							errors={errors}
						/>

						<div className="col-span-2 flex items-start gap-3 flex-col">
							<div className="mt-2 flex flex-row gap-3">
								{roles.map((role) => (
									<div key={role} className="flex items-center mb-2">
										<input
											id={role}
											type="radio"
											value={role}
											className="focus:ring-[#0099ffbd] h-4 w-4 text-[#0099ff] border-gray-300 rounded"
											{...register("role", { required: "Role is required" })}
										/>
										<label
											htmlFor={role}
											className="ml-3 capitalize block text-sm font-medium text-gray-700"
										>
											{role}
										</label>
									</div>
								))}
							</div>
							{errors.role && (
								<p className="mt-2 text-sm text-red-600">
									{errors.role?.message}
								</p>
							)}
						</div>

						<div className="col-span-2">
							<MainButton
								title={"Create User"}
								isLoading={loading_create}
								disabled={loading_create}
							/>
						</div>
					</FormContainer>
				</div>
			</Modal>
		</div>
	);
}
