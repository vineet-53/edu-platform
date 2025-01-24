import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import { AxiosResponse } from "axios";
import { apiConnector } from "../../../services/apiconnector";
import { profile } from "../../../services/endpoints";
import { setUser } from "../../../store/slices/profile.slice";
import { setItemToLocalStorage } from "../../../utils/localStorage";
import { useAppDispatch } from "../../../hooks/store";

const Dashboard = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		(async () => {
			try {
				const response: AxiosResponse = await apiConnector(
					profile.GET_USER_DETAILS.method,
					profile.GET_USER_DETAILS.url
				);
				console.log(response.data.message);
				dispatch(setUser(response.data.user));
				setItemToLocalStorage("user", response.data.user);
			} catch (err: any) {
				console.log(err);
			}
		})();
	}, []);
	return (
		<div className="flex h-[calc(100vh-3.5rem)]">
			<Sidebar />
			<Outlet />
		</div>
	);
};

export default Dashboard;
