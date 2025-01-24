import { useEffect } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks/store";
import { getUserProfile } from "./services/operations/profile";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import OpenRoute from "./components/core/Auth/OpenRoute";
import VerifyEmail from "./pages/VerifyEmail";
import Profile from "./components/core/Dashboard/Profile/Profile";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./components/core/Dashboard/Dashboard";
import Sidebar from "./components/core/Dashboard/Sidebar/Sidebar";
import Courses from "./components/core/Dashboard/Courses/Courses";

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
				<Route
					path="/"
					element={
						<OpenRoute>
							<HomePage />
						</OpenRoute>
					}
				/>

				<Route
					path="/login"
					element={
						<OpenRoute>
							<LoginPage />
						</OpenRoute>
					}
				/>

				<Route
					path="/signup"
					element={
						<OpenRoute>
							<SignupPage />
						</OpenRoute>
					}
				/>

				<Route
					path="/verify-email"
					element={
						<OpenRoute>
							<VerifyEmail />
						</OpenRoute>
					}
				/>

				<Route
					path="/dashboard"
					element={
						<PrivateRoute>
							<Dashboard />
						</PrivateRoute>
					}
				>
					<Route path="my-profile" element={<Profile />} />
					<Route path="courses" element={<Courses />} />
					{/* <Route path="enrolled-courses" element={<Profile />} />
					<Route path="wishlist" element={<Profile />} />
					<Route path="purchase-history" element={<Profile />} />
					<Route path="settings" element={<Profile />} /> */}
				</Route>
				{/* <Route path="courses/:courseId" element={<CourseDetails />} /> */}
				{/* <Route path="forgot-password" element = { <OpenRoute> <ForgotPassword /> </OpenRoute> } />
          <Route path="update-password/:id" element = { <OpenRoute> <UpdatePassword /> </OpenRoute> } />
          <Route path="about" element = { <OpenRoute> <About /> </OpenRoute> } />
          <Route path="/contact" element={<Contact />} /> */}
			</Routes>
		</div>
	);
}

export default App;
