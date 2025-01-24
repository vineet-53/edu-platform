import React from "react";
import PageHeadingTitlte from "../PageHeadingTitlte";
import DashboardContentContainer from "../../../common/DashboardContentContainer";
import UrlText from "../../../common/UrlText";
import CourseComponent from "./CourseComponent";

const Courses = () => {
	return (
		<DashboardContentContainer styles="">
			<UrlText />
			<div className="flex flex-col gap-4">
				<PageHeadingTitlte />
				<CourseComponent />
			</div>
		</DashboardContentContainer>
	);
};

export default Courses;
