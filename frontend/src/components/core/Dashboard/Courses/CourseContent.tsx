import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks/store";
import {
	fetchFullCourseDetails,
	getCompletedVideos,
} from "../../../../services/operations/courseDetailsAPI";
import Loader from "../../../common/Loader";
import CourseSection from "./CourseSection";
import { nanoid } from "@reduxjs/toolkit";
import { Section, SubSection } from "./Interface";
import VideoJS from "../../../common/Videojs";

const CourseContent = () => {
	const dispatch = useAppDispatch();
	const { courseId } = useParams();
	const { course } = useAppSelector((state) => state.course);
	const [subSection, setSubSection] = useState<null | SubSection>(null);
	const playerRef = useRef(null);
	const [completedVideos, setCompletedVideos] = useState([]);

	useEffect(() => {
		dispatch(fetchFullCourseDetails(courseId));
		(async () => {
			if (!courseId) return;
			setCompletedVideos(await getCompletedVideos(courseId));
		})();
	}, [courseId]);

	if (!courseId || courseId === "") {
		return <div>No Course Id Provided</div>;
	}

	if (!course) {
		return <Loader />;
	}

	const videoJsOptions = {
		autoplay: false,
		controls: true,
		responsive: true,
		fluid: true,
		sources: [
			{
				src: subSection?.videoUrl || "",
				type: "video/mp4",
			},
		],
	};

	const handlePlayerReady = (player: any) => {
		playerRef.current = player;
	};

	return (
		<div className="flex">
			<div className="max-lg:min-w-[150px] lg:w-3xs flex min-h-[calc(100vh-3.5rem)] flex-col text-white bg-richblue-800">
				{
					//@ts-ignore
					course.sections.map((section: Section, index: number) => {
						return (
							<CourseSection
								key={nanoid()}
								completedVideos={completedVideos}
								section={section}
								setSubSection={setSubSection}
								setCompletedVideos={setCompletedVideos}
							/>
						);
					})
				}
			</div>
			<div className="w-full">
				{subSection?.videoUrl && (
					<VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
				)}
				<div className="text-white ml-10">
					<h3 className="max-md:text-md text-xl">{subSection?.title}</h3>
					<p className="text-richblue-200">{subSection?.description}</p>
					<p>{subSection?.createdAt}</p>
				</div>
			</div>
		</div>
	);
};

export default CourseContent;
