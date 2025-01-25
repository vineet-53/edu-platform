import { useEffect, useState } from "react";
import PageHeadingTitlte from "../PageHeadingTitlte";
import DashboardContentContainer from "../../../common/DashboardContentContainer";
import UrlText from "../../../common/UrlText";
import CourseComponent from "./CourseComponent";
import { course } from "../../../../services/endpoints";
import { apiConnector } from "../../../../services/apiconnector";

const Courses = () => {
	const [courseList, setCourseList] = useState<[]>([]);
	useEffect(() => {
		(async () => {
			try {
				const response = await apiConnector(
					course.GET_ALL_COURSE.method,
					course.GET_ALL_COURSE.url
				);
				if (!response.data.success) {
					throw response.data;
				}
				console.log("Setting The Course Details for Search Course");
				setCourseList(response.data.courses);
			} catch (err: any) {
				console.error(err.message);
			}
		})();
	}, []);

	return (
		<DashboardContentContainer styles="">
			<UrlText />
			<div className="flex flex-col gap-4">
				<PageHeadingTitlte />
				<CourseComponent courseList={courseList} />
			</div>
		</DashboardContentContainer>
	);
};

export default Courses;
