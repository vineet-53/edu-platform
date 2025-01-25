import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../../common/IconBtn";
import { useAppDispatch, useAppSelector } from "../../../../hooks/store";
import { updateProfile } from "../../../../services/operations/profile";
import { setEdit } from "../../../../store/slices/profile.slice";

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];

type FormValues = {
	firstName: string;
	lastName: string;
	dateOfBirth: string;
	gender: string;
	contactNumber: string;
	about: string;
};
const formstyle =
	"rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none";
const labelStyle = "text-[14px] text-richblack-5";

export const ProfileEditForm = () => {
	const { user } = useAppSelector((state) => state.profile);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>();

	const submitProfileForm = async (data: any) => {
		try {
			dispatch(updateProfile(data));
		} catch (error: any) {
			console.log("ERROR MESSAGE - ", error.message);
		}
	};

	return (
		<>
			<form
				onSubmit={handleSubmit(submitProfileForm)}
				className="max-sm:max-w-max-content-mobile lg:max-w-max-content md:max-w-max-content-tab "
			>
				{/* Profile Information */}
				<div className="max-md:my-3 md:my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 max-md:p-3 max-md:px-5 md:p-8 md:px-8 mx-8">
					<h2 className="text-lg font-semibold text-richblack-5">
						Profile Information{" "}
					</h2>

					<div className="flex flex-col gap-5 lg:flex-row">
						<div className="flex flex-col gap-2 lg:w-[48%]">
							<label htmlFor="firstName" className={labelStyle}>
								{" "}
								First Name{" "}
							</label>
							<input
								type="text"
								name="firstName"
								id="firstName"
								placeholder="Enter first name"
								className={formstyle}
								{...register("firstName", { required: true })}
								defaultValue={user?.firstName}
							/>
							{errors.firstName && (
								<span className="-mt-1 text-[12px] text-yellow-100">
									{" "}
									Please enter your first name.{" "}
								</span>
							)}
						</div>
						<div className="flex flex-col gap-2 lg:w-[48%]">
							<label htmlFor="lastName" className={labelStyle}>
								{" "}
								Last Name{" "}
							</label>
							<input
								type="text"
								name="lastName"
								id="lastName"
								placeholder="Enter first name"
								className={formstyle}
								{...register("lastName", { required: true })}
								defaultValue={user?.lastName}
							/>
							{errors.lastName && (
								<span className="-mt-1 text-[12px] text-yellow-100">
									{" "}
									Please enter your last name.{" "}
								</span>
							)}
						</div>
					</div>

					<div className="flex flex-col gap-5 lg:flex-row">
						<div className="flex flex-col gap-2 lg:w-[48%]">
							<label htmlFor="dateOfBirth" className={labelStyle}>
								{" "}
								Date of Birth{" "}
							</label>
							<input
								type="date"
								name="dateOfBirth"
								id="dateOfBirth"
								className={formstyle}
								{...register("dateOfBirth", {
									required: {
										value: true,
										message: "Please enter your Date of Birth.",
									},
									max: {
										value: new Date().toISOString().split("T")[0],
										message: "Date of Birth cannot be in the future.",
									},
								})}
								defaultValue={user?.additionalDetails?.dateOfBirth}
							/>
							{errors.dateOfBirth && (
								<span className="-mt-1 text-[12px] text-yellow-100">
									{" "}
									{errors.dateOfBirth.message}
								</span>
							)}
						</div>
						<div className="flex flex-col gap-2 lg:w-[48%]">
							<label htmlFor="gender" className={labelStyle}>
								{" "}
								Gender{" "}
							</label>
							<select
								type="text"
								name="gender"
								id="gender"
								className={formstyle}
								{...register("gender", { required: true })}
								defaultValue={user?.additionalDetails?.gender}
							>
								{genders.map((ele, i) => {
									return (
										<option key={i} value={ele}>
											{" "}
											{ele}{" "}
										</option>
									);
								})}
							</select>
							{errors.gender && (
								<span className="-mt-1 text-[12px] text-yellow-100">
									{" "}
									Please enter your Date of Birth.
								</span>
							)}
						</div>
					</div>

					<div className="flex flex-col gap-5 lg:flex-row">
						<div className="flex flex-col gap-2 lg:w-[48%]">
							<label htmlFor="contactNumber" className={labelStyle}>
								{" "}
								Contact Number{" "}
							</label>
							<input
								type="tel"
								name="contactNumber"
								id="contactNumber"
								placeholder="Enter Contact Number"
								className={formstyle}
								{...register("contactNumber", {
									required: {
										value: true,
										message: "Please enter your Contact Number.",
									},
									maxLength: { value: 12, message: "Invalid Contact Number" },
									minLength: { value: 10, message: "Invalid Contact Number" },
								})}
								defaultValue={user?.additionalDetails?.contactNumber}
							/>
							{errors.contactNumber && (
								<span className="-mt-1 text-[12px] text-yellow-100">
									{" "}
									{errors.contactNumber.message}{" "}
								</span>
							)}
						</div>
						<div className="flex flex-col gap-2 lg:w-[48%]">
							<label htmlFor="about" className={labelStyle}>
								{" "}
								About{" "}
							</label>
							<input
								type="text"
								name="about"
								id="about"
								placeholder="Enter Bio Details"
								className={formstyle}
								{...register("about", { required: true })}
								defaultValue={user?.additionalDetails?.about}
							/>
							{errors.about && (
								<span className="-mt-1 text-[12px] text-yellow-100">
									{" "}
									Please enter your About.{" "}
								</span>
							)}
						</div>
					</div>
				</div>

				<div className="flex justify-end gap-2">
					<button
						onClick={() => {
							dispatch(setEdit(false));
							navigate("/dashboard/my-profile");
						}}
						className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
					>
						Cancel
					</button>
					<IconBtn type="submit" text="Save" />
				</div>
			</form>
		</>
	);
};
