import { formstyle, labelStyle } from "./ProfileEditForm";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../../../../hooks/store";
import { useRef } from "react";
interface FormData {
	image: string;
}

const ProfilePictureForm = () => {
	const {
		register,
		formState: { errors },
	} = useForm();
	const imageInputRef = useRef(null);

	const { user } = useAppSelector((state) => state.profile);

	return (
		<div className="max-sm:max-w-max-content-mobile lg:max-w-max-content md:max-w-max-content-tab">
			<div className="max-md:my-3 md:my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 max-md:p-3 max-md:px-5 md:p-8 md:px-8 mx-8">
				<div className="flex flex-col gap-5 lg:flex-row">
					<div className="flex flex-col gap-2 lg:w-[48%]">
						<label htmlFor="firstName" className={labelStyle}>
							Profile Image
						</label>
						<div>
							<img
								src={user?.image}
								alt=""
								className="w-14 rounded-full h-14"
							/>
							<input
								type="image"
								name="image"
								id="imageid"
								className="text-pure-greys-200"
								placeholder="Choose Image"
								{...register("image", { required: true })}
							/>
						</div>

						{errors.image && (
							<span className="-mt-1 text-[12px] text-yellow-100">
								Please provide image
							</span>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePictureForm;
