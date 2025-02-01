import { useAppSelector } from "../../../../hooks/store";
import { nanoid } from "@reduxjs/toolkit";
import SidebarLink from "./SidebarLink";
export const data = [
  {
    icon: "VscAccount",
    text: "My Profile",
    url: "/dashboard/my-profile",
    type: ["Student", "Admin", "Instructor"],
  },

  {
    icon: "VscMortarBoard",
    text: "Enrolled Courses",
    type: ["Student"],
    url: "/dashboard/enrolled-courses",
  },
  {
    icon: "VscBookmark",
    text: "Wishlist",
    type: ["Student"],
    url: "/dashboard/wishlist",
  },
  {
    icon: "VscHistory",
    text: "Purchase history",
    type: ["Student"],
    url: "/dashboard/purchase-history",
  },
  {
    icon: "VscSearch",
    text: "Courses",
    type: ["Student"],
    url: "/dashboard/courses",
  },
  {
    icon: "VscVm",
    text: "My Courses",
    type: ["Instructor"],
    url: "/dashboard/my-courses",
  },
];
export const defaultButton: ListItem[] = [
  {
    icon: "VscSettingsGear",
    text: "Settings",
    type: ["Admin", "Student", "Instructor"],
    url: "/dashboard/settings",
  },
];

export interface ListItem {
  icon: string;
  url: string | "";
  text: string;
  type: string[];
}

const Sidebar = () => {
  const user = useAppSelector((state) => state.profile.user);
  return (
    <div className="flex-col flex gap-y-1 pt-8 flex-[.2] min-w-fit max-sm:hidden max-w-md bg-richblack-800 text-richblue-200">
      {data.map((item: ListItem, index: number) => {
        if (!item.type.includes(user?.accountType)) {
          return;
        }
        return <SidebarLink item={item} key={index} />;
      })}
      <div className="border-b-2 w-[90%] mx-auto border-b-richblack-700"></div>
      <SidebarLink item={defaultButton[0]} key={nanoid()} />
    </div>
  );
};

export default Sidebar;
