import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks/store";
import { EditButton } from "../../../common/EditButton";
import PageHeadingTitlte from "../PageHeadingTitlte";

const ProfileComponent = () => {
	const { user } = useAppSelector((state) => state.profile);
	const dispatch = useAppDispatch();
	if (!user) {
		return (
			<div className="text-white flex justify-center items-center">
				No Profile Found
			</div>
		);
	}
	return (
		<div className="flex flex-col gap-10 ">
			<PageHeadingTitlte />
			<div className="flex flex-col gap-y-4">
				<div className="flex py-5 px-2 gap-x-3">
					<div className="max-sm:px-4 flex gap-3 max-sm:gap-y-4 min-md:px-4 bg-richblack-800 max-md:w-[90%] min-md:max-lg:w-[80%] min-lg:w-[70%] py-4 rounded-xl lg:px-10 lg:py-8 sm:px-7 sm:gap-y-6">
						<div className="max-sm:min-w-10  md:w-20 overflow-hidden">
							<img
								src={user.image}
								alt={`profile-${user.firstName}`}
								className="rounded-full"
							/>
						</div>

						<div className="flex-col flex gap-0 justify-center">
							<div className=" md:text-xl text-white">
								{user.firstName + " " + user.lastName}
							</div>
							<div className="text-sm text-richblack-200">{user.email}</div>
						</div>
					</div>
				</div>
				<div className="max-sm:px-4 flex flex-col max-sm:gap-y-4 min-md:px-4 bg-richblack-800 max-md:w-[90%] min-md:max-lg:w-[80%] min-lg:w-[70%] py-4 rounded-xl lg:px-10 lg:py-8 sm:px-7 sm:gap-y-6">
					<div className="flex items-center justify-between">
						<span className="font-inter text-white md:text-[1.4rem]">
							Personal Details
						</span>
						<Link to={"/dashboard/settings"}>
							<EditButton styles="ml-auto"></EditButton>
						</Link>
					</div>

					<div className="flex max-sm:flex-col">
						<div className="flex w-[50%] flex-col">
							<span className="text-richblack-400">First Name</span>
							<span className="text-white">{user?.firstName}</span>
						</div>
						<div className="flex flex-col">
							<span className="text-richblack-400">Last Name</span>
							<span className="text-white">{user?.lastName}</span>
						</div>
					</div>

					<div className="flex max-sm:flex-col">
						<div className="flex w-[50%] flex-col">
							<span className="text-richblack-400">Email</span>
							<span className="text-white">{user?.email}</span>
						</div>
						<div className="flex flex-col">
							<span className="text-richblack-400">Phone Number</span>
							<span className="text-white">
								{user?.profile?.contactNumber || "undefined"}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileComponent;
