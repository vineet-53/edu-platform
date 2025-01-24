import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CourseDetailsPage = () => {
	const { courseId } = useParams();
	const [courseDetails, setCourseDetails] = useState(null);
	console.log(courseId);
	useEffect(() => {
		(async () => {
			// get the course details
		})();
	}, [courseId]);
	if (!courseDetails) {
		return <div className=".loader"></div>;
	}
	return <div>CourseDetailsPage</div>;
};

export default CourseDetailsPage;
