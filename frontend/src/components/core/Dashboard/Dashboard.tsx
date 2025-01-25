import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import { useAppDispatch } from "../../../hooks/store";
import { getUserProfile } from "../../../services/operations/profile";

const Dashboard = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(getUserProfile());
	}, []);
	return (
		<div className="flex min-h-[calc(100vh-3.5rem)]">
			<Sidebar />
			<Outlet />
		</div>
	);
};

export default Dashboard;
