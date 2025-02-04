import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/store";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
	const { token } = useAppSelector((state) => state.auth);
	if (token != null) return children;
	else return <Navigate to="/login" />;
};

export default PrivateRoute;
