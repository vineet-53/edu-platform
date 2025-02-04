import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiConnector } from "../../../../services/apiconnector";
import { course } from "../../../../services/endpoints";
import { AxiosResponse } from "axios";
import toast, { ToastIcon } from "react-hot-toast";

const CourseDetailsPage = () => {
	const { courseId } = useParams();
	const [courseDetails, setCourseDetails] = useState(null);
	console.log(courseId);
	useEffect(() => {
		(async () => {
			const toastId = toast.loading("Fetching Course Details....");
			try {
				// get the course details
				const response: AxiosResponse = await apiConnector(
					course.GET_FULL_COURSE_DETAILS.method,
					`${course.GET_FULL_COURSE_DETAILS.url}?courseId=${courseId}`
				);
				if (!response.data.success) {
					throw response.data;
				}
				console.log(response.data.course);
			} catch (err: any) {
				console.error(err.message);
				toast.error(err.message);
			} finally {
				toast.dismiss(toastId);
			}
		})();
	}, [courseId]);
	if (!courseDetails) {
		return <div className=".loader"></div>;
	}
	return <div>CourseDetailsPage</div>;
};

export default CourseDetailsPage;
