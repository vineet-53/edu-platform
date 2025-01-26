import { useEffect, useState } from "react";
import DashboardContentContainer from "../../../common/DashboardContentContainer";
import UrlText from "../../../common/UrlText";
import PageHeadingTitlte from "../PageHeadingTitlte";
import { getEnrolledCourses } from "../../../../services/operations/profileAPI";
import { nanoid } from "@reduxjs/toolkit";
import EnrolledCourseCard from "./EnrolledCourseCard";

const EnrolledCourses = () => {
	const [enrolledCourses, setEnrolledCourses] = useState([]);

	useEffect(() => {
		getEnrolledCourses(setEnrolledCourses);
	}, []);
	return (
		<DashboardContentContainer>
			<UrlText />

			<PageHeadingTitlte />
			{enrolledCourses.length == 0 ? (
				<div className="text-3xl text-richblack-400">No Course Available</div>
			) : (
				<div className="mr-5 bg-richblack-800 rounded-md max-sm:max-w-max-w-max-content-mobile sm:max-w-max-content  h-[400px]">
					<div className="grid items-center px-4 grid-cols-9 w-full bg-richblack-600 h-[50px] text-richblack-200 rounded-t-md">
						<div className="col-span-4">Course Name</div>
						<div className="col-span-2">Duration</div>
						<div className="col-span-3">Progress</div>
					</div>

					{enrolledCourses.length > 0 &&
						enrolledCourses.map((course: any) => {
							return <EnrolledCourseCard key={nanoid()} course={course} />;
						})}
					<div className="px-4"></div>
				</div>
			)}
		</DashboardContentContainer>
	);
};

export default EnrolledCourses;
