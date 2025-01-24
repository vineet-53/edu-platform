import { userInfo } from "os";
import { useState } from "react";
import {
	Link,
	NavigateFunction,
	NavigationType,
	useLocation,
	useNavigate,
} from "react-router-dom";
import { useAppSelector } from "../../../../hooks/store";
import { ACCOUNT_TYPE } from "../../../../constants/AccountTypes";
import { logout } from "../../../../services/operations/authAPI";
export const data = [
	{
		icon: "",
		text: "My Profile",
		url: "/dashboard/my-profile",
		type: ["Student", "Admin", "Instructor"],
	},
	{
		icon: "",
		text: "Enrolled Courses",
		type: ["Student"],
		url: "/dashboard/enrolled-courses",
	},
	{
		icon: "",
		text: "Wishlist",
		type: ["Student"],
		url: "/dashboard/wishlist",
	},
	{
		icon: "",
		text: "Purchase history",
		type: ["Student"],
		url: "/dashboard/purchase-history",
	},
	{
		icon: "",
		text: "Courses",
		type: ["Student"],
		url: "/dashboard/courses",
	},
	{
		icon: "",
		text: "Settings",
		type: ["Admin", "Student", "Instructor"],
		url: "/dashboard/settings",
	},
	{
		icon: "",
		text: "Logout",
		type: ["Admin", "Student", "Instructor"],
		url: "",
	},
];

interface ListItem {
	icon: string;
	url: string | "";
	text: string;
	type: string[];
}

const Sidebar = () => {
	const location = useLocation();
	const user = useAppSelector((state) => state.profile.user);
	const navigate = useNavigate();
	return (
		<div className="flex-col flex gap-y-1 pt-8 flex-[.2] min-w-fit max-sm:hidden max-w-md bg-richblack-800 text-richblue-300">
			{data.map((item: ListItem, index: number) => {
				if (!item.type.includes(user?.accountType)) {
					return;
				}
				if (item.text == "Logout") {
					return (
						<button
							className="flex hover:text-richblack-200 pl-4 cursor-pointer"
							onClick={() => logout(navigate)}
							key={index}
						>
							{item.text}
						</button>
					);
				}
				return (
					<Link
						key={index}
						className={`${item.url === location.pathname && "bg-yellow-800 border-l-2 border-yellow-100 text-yellow-200"} pr-4 pl-4 py-2`}
						to={item.url}
					>
						{/* icon */}
						<div className="">
							<span></span>
							<span>{item.text}</span>
						</div>
					</Link>
				);
			})}
		</div>
	);
};

export default Sidebar;
