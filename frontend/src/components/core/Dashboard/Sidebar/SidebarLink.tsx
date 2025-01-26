import { ListItem } from "./Sidebar";
import { Link, useLocation } from "react-router-dom";
import * as Icons from "react-icons/vsc";

const SidebarLink = ({ item }: { item: ListItem }) => {
	const location = useLocation();
	//@ts-ignore
	const Icon = Icons[item.icon];

	return (
		<Link
			className={`${item.url === location.pathname && "bg-yellow-800 border-l-2 border-yellow-100 text-yellow-200"} pr-4 pl-4 py-2`}
			to={item.url}
		>
			{/* icon */}
			<div className="flex items-center max-md:gap-2 md:gap-3 ">
				<Icon />
				<span>{item.text}</span>
			</div>
		</Link>
	);
};

export default SidebarLink;
