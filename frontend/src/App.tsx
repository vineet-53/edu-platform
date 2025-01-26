import { Suspense, useEffect } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks/store";
import { getUserProfile } from "./services/operations/profileAPI";
import { Route, Routes } from "react-router-dom";
import OpenRoute from "./components/core/Auth/OpenRoute";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Loader from "./components/common/Loader";
import Error from "./pages/Error";
import Dashboard from "./components/core/Dashboard/Dashboard";
import Profile from "./components/core/Dashboard/Profile/Profile";
import Settings from "./components/core/Dashboard/Settings/Settings";
import VerifyEmail from "./pages/VerifyEmail";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/common/Navbar";
import CourseDetailsPage from "./components/core/Dashboard/Courses/CourseDetailsPage";
import CourseContent from "./components/core/Dashboard/Courses/CourseContent";
import { ACCOUNT_TYPE } from "./constants/AccountTypes";
import PurchaseHistory from "./components/core/Dashboard/PurchaseHistory/PurchaseHistory";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart/Cart";
import Courses from "./components/core/Dashboard/Courses/Courses";
import MyCourses from "./components/core/Dashboard/MyCourses/MyCourses";

function App() {
	const token = useAppSelector((state) => state.auth.token);
	const user = useAppSelector((state) => state.profile.user);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (token) {
			dispatch(getUserProfile());
		}
	}, []);

	return (
		<div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
			<Navbar />
			<Routes>
				{/* public routes  */}
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

				<Route path="/course/:courseId" element={<CourseDetailsPage />} />

				{/* private routes  */}
				<Route
					path="/dashboard"
					element={
						<PrivateRoute>
							<Dashboard />
						</PrivateRoute>
					}
				>
					<Route path="my-profile" element={<Profile />} />
					<Route path="settings" element={<Settings />} />
					{user?.accountType === ACCOUNT_TYPE.STUDENT && (
						<>
							<Route path="courses" element={<Courses />} />
							<Route path="wishlist" element={<Cart />} />
							<Route path="enrolled-courses" element={<EnrolledCourses />} />
							<Route path="purchase-history" element={<PurchaseHistory />} />
						</>
					)}
					{user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
						<>
							<Route path="my-courses" element={<MyCourses />} />
						</>
					)}
				</Route>

				<Route
					path="course-content/:courseId"
					element={
						<PrivateRoute>
							<Suspense fallback={<Loader />}>
								<CourseContent />
							</Suspense>
						</PrivateRoute>
					}
				/>
				<Route path="*" element={<Error />} />
			</Routes>
		</div>
	);
}

export default App;
