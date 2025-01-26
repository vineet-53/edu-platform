import { useEffect, useState } from "react";
import { getCompletedVideos } from "../../../../services/operations/courseDetailsAPI";
import { Section, SubSection } from "../Courses/Interface";
import { Link } from "react-router-dom";

const EnrolledCourseCard = ({ course }: { course: any }) => {
	const [completedVideos, setCompletedVideos] = useState([]);
	const [courseProgress, setCourseProgress] = useState(0);

	const calcTimeDuration = (sections: Section[]) => {
		let h = 0;
		let m = 0;
		let s = 0;
		sections.forEach((section: Section) => {
			let subSections = section.subSection;
			subSections.forEach((subSection: SubSection) => {
				let timeArr = subSection.timeDuration.split(":");
				let length = timeArr.length;
				if (length == 3) {
					h += parseInt(timeArr[0]);
					m += parseInt(timeArr[1]);
					s += parseInt(timeArr[2]);
				} else if (length == 2) {
					m += parseInt(timeArr[0]);
					s += parseInt(timeArr[1]);
				} else if (length == 1) {
					s += parseInt(timeArr[0]);
				}
				return;
			});
		});
		return `${h} hrs ${m} min`;
	};

	const getCourseProgress = () => {
		if (completedVideos.length == 0) {
			return 0;
		}

		let totalVideos = 0;

		course.sections.forEach((section: Section) => {
			totalVideos += section.subSection.length;
		});

		const res = (completedVideos.length / totalVideos) * 100;
		console.log(res);
		return res;
	};

	useEffect(() => {
		(async () => {
			const res: [] = await getCompletedVideos(course._id);
			if (res.length > 0) {
				setCompletedVideos(res);
				setCourseProgress(getCourseProgress());
			}
		})();
	}, []);
	return (
		<Link
			to={`/course-content/${course._id}`}
			className="cursor-pointer grid items-center px-4 grid-cols-9 w-full text-richblack-200 border-b-[1px] border-b-richblack-200 "
		>
			<div className="col-span-4 flex gap-2 py-3 items-center">
				<img src={course.thumbnailImage} alt="" className="w-10 h-10" />
				<div className="flex flex-col">
					<span className="md:text-md text-white max-sm:text-sm">
						{course.courseName}
					</span>
					<span className="text-xs">
						{course.courseDescription.slice(0, 20)}
					</span>
				</div>
			</div>
			<div className="col-span-2">{calcTimeDuration(course.sections)}</div>
			<div className="col-span-3 w-full h-[10px] bg-white rounded-md">
				<div
					className={`w-[${courseProgress}%] h-full bg-blue-400 rounded-md`}
				></div>
			</div>
		</Link>
	);
};

export default EnrolledCourseCard;
