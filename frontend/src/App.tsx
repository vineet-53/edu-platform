import { useEffect } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks/store";
import { getUserProfile } from "./services/operations/profile";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import HomePage from "./pages/HomePage";

function App() {
	const token = useAppSelector((state) => state.auth.token);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!token) {
			dispatch(getUserProfile());
		}
	}, []);

	return (
		<div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
			<Navbar />
			<Routes>
				<Route path="/" element={<HomePage />} />
			</Routes>
		</div>
	);
}

export default App;
