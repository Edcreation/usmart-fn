import { MainButton } from "../../components/buttons";
import InputFormField from "../../components/text-input";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../api/auth/main";
import FormContainer from "../../components/form";
import { LoginPayload } from "../../api/auth/types";
import { Link } from "react-router-dom";
import logo from "../../assets/user_logo.png";

export default function LoginPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginPayload>();
	const [login, { isLoading, error }] = useLoginMutation();

	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center">
				<div className="mt-20 sm:mx-auto sm:w-full sm:max-w-sm bg-white rounded-lg p-4 shadow-md">
					<div className="w-full flex justify-center items-center mb-4">
						<img src={logo} className="w-16" alt="logo" />
					</div>
					<div className="sm:mx-auto sm:w-full sm:max-w-sm">
						<h2 className=" text-center text-2xl/9 font-bold tracking-tight text-gray-900">
							Sign in to your account
						</h2>
					</div>
					<FormContainer
						error={error}
						onSubmit={handleSubmit(login)}
						className="space-y-6 w-full"
					>
						<InputFormField
							label="Email or Username"
							type="text"
							name="email"
							register={register}
							placeholder={"Enter Email or Username"}
							errors={errors}
							validation={{ required: "Email or username is required" }}
						/>
						<InputFormField
							label="Password"
							optionalComponent={
								<>
									<div className="text-sm">
										<a
											href="#"
											className="font-semibold text-[#0099ff] hover:text-[#0099ffbd]"
										>
											Forgot password?
										</a>
									</div>
								</>
							}
							type="password"
							name="password"
							register={register}
							placeholder="Enter Password"
							validation={{ required: "Password is required" }}
							errors={errors}
						/>
						<div className="mt-4">
							<MainButton
								title={"Sign In"}
								isLoading={isLoading}
								disabled={isLoading}
							/>
						</div>
					</FormContainer>

					<p className="mt-5 text-center text-sm/6 text-gray-500">
						Not a member?{" "}
						<Link
							to="/register"
							className="font-semibold text-[#0099ff] hover:text-[#0099ffbd]"
						>
							Register
						</Link>
					</p>
				</div>

				<div className="w-screen absolute bottom-0 z-[-10]">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
						<path
							fill="#0099ff"
							fill-opacity="1"
							d="M0,224L30,197.3C60,171,120,117,180,101.3C240,85,300,107,360,112C420,117,480,107,540,117.3C600,128,660,160,720,154.7C780,149,840,107,900,80C960,53,1020,43,1080,74.7C1140,107,1200,181,1260,218.7C1320,256,1380,256,1410,256L1440,256L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
						></path>
					</svg>
				</div>
			</div>
		</>
	);
}
