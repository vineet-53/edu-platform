import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../../common/IconBtn";
import { useAppDispatch, useAppSelector } from "../../../../hooks/store";
import countryCode from "../../../../constants/countrycode.json";
import { updateProfile } from "../../../../services/operations/profileAPI";
import { setEdit } from "../../../../store/slices/profile.slice";
import { nanoid } from "@reduxjs/toolkit";

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];

type FormValues = {
	firstName?: string;
	lastName?: string;
	dateOfBirth?: string;
	gender?: string;
	contactNumber?: string;
	about?: string;
	countryCode?: string;
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
			dispatch(updateProfile(data, navigate));
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
								defaultValue={user?.profile?.dob}
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
								defaultValue={user?.profile?.gender}
							>
								{genders.map((ele: string) => {
									return (
										<option key={nanoid()} value={ele}>
											{ele}
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
								Country Code
							</label>

							<select
								{...register("countryCode", {
									required: {
										value: true,
										message: "Please enter country code",
									},
								})}
								name="countryCode"
								id="countrycode"
								className={formstyle}
								defaultValue={user?.profile?.contactNumber?.split(" ")[0]}
							>
								{countryCode.map((code: { [key: string]: string }) => {
									return (
										<option key={nanoid()} value={`${code.code}`}>
											{code.code === "Not Specified"
												? "Not Specified"
												: `${code.code} ${code.country}`}
										</option>
									);
								})}
							</select>
							{errors.countryCode && (
								<span className="-mt-1 text-[12px] text-yellow-100">
									{errors.countryCode.message}{" "}
								</span>
							)}
						</div>

						<div className="flex flex-col gap-2 lg:w-[48%]">
							<label htmlFor="contactNumber" className={labelStyle}>
								Contact Number
							</label>

							<input
								type="tel"
								name="contactNumber"
								id="contactNumber"
								className={formstyle}
								placeholder="Enter Contact Number"
								{...register("contactNumber", {
									required: {
										value: true,
										message: "Please enter your Contact Number.",
									},
									maxLength: { value: 12, message: "Invalid Contact Number" },
									minLength: { value: 10, message: "Invalid Contact Number" },
								})}
								defaultValue={user?.profile?.contactNumber?.split(" ")[1]}
							/>
							{errors.contactNumber && (
								<span className="-mt-1 text-[12px] text-yellow-100">
									{" "}
									{errors.contactNumber.message}{" "}
								</span>
							)}
						</div>
					</div>

					<div>
						<div className="flex flex-col gap-2 lg:w-[48%]">
							<label htmlFor="about" className={labelStyle}>
								About
							</label>
							<textarea
								name="about"
								id="about"
								placeholder="Enter Bio Details"
								className={formstyle}
								{...register("about", {
									required: {
										value: true,
										message: "Please enter about ",
									},
									maxLength: {
										value: 150,
										message: "Exceed About 150 word Limit",
									},
								})}
								defaultValue={user?.profile?.about}
							/>
							{errors.about && (
								<span className="-mt-1 text-[12px] text-yellow-100">
									{" "}
									{errors.about.message}{" "}
								</span>
							)}
						</div>
					</div>

					<div className="flex justify-end gap-3">
						<button
							onClick={() => {
								dispatch(setEdit(false));
								navigate("/dashboard/my-profile");
							}}
							type="button"
							className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
						>
							Cancel
						</button>
						<IconBtn type="submit" text="Save" />
					</div>
				</div>
			</form>
		</>
	);
};
