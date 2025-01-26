import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

const Dashboard = () => {
	return (
		<div className="flex min-h-[calc(100vh-3.5rem)]">
			<Sidebar />
			<Outlet />
		</div>
	);
};

export default Dashboard;
