import { nanoid } from "@reduxjs/toolkit";
import { ChangeEvent, useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { HiDesktopComputer } from "react-icons/hi";
import { Section, SubSection } from "./Interface";
import { useParams } from "react-router-dom";
import {
	removeFromCourseProgress,
	updateCourseProgress,
} from "../../../../services/operations/courseDetailsAPI";

const CourseSection = ({
	section,
	setSubSection,
	completedVideos,
	setCompletedVideos,
}: {
	section: Section;
	setSubSection: (subSection: SubSection) => void;
	completedVideos: string[];
	setCompletedVideos: (obj: any) => void;
}) => {
	const [showSection, setShowSection] = useState(false);
	const [checked, setChecked] = useState(false);
	const { courseId } = useParams();
	return (
		<>
			<div className="bg-richblack-700 py-4 px-4 border-y-[1px] border-y-richblack-600 text-left">
				<button
					onClick={() => setShowSection((prev) => !prev)}
					className="cursor-pointer flex items-center justify-between w-full"
				>
					{section.sectionName}
					{showSection ? <FaCaretDown /> : <FaCaretUp />}
				</button>
			</div>
			{/* {showSection && <CourseSubSection subSection={section.subSection} />} */}
			{showSection && (
				<div className="py-3 px-4 bg-richblack-800 w-full">
					{section.subSection.length > 0 &&
						//@ts-ignore
						section.subSection.map((subSection: SubSection) => {
							return (
								<button
									onClick={() => {
										setSubSection(subSection);
									}}
									key={nanoid()}
									className="cursor-pointer flex gap-2 items-center"
								>
									<input
										type="checkbox"
										checked={
											completedVideos?.includes(subSection._id) ? true : false
										}
										onChange={(e: ChangeEvent) => {
											e.preventDefault();
											if (!courseId) {
												return;
											}
											//@ts-ignore
											(async () => {
												//@ts-ignore
												if (e.target.checked) {
													setCompletedVideos(
														await updateCourseProgress(courseId, subSection._id)
													);
													setChecked(true);
												} else {
													let result = await removeFromCourseProgress(
														courseId,
														subSection._id
													);
													setCompletedVideos(result);
													setChecked(false);
												}
											})();
										}}
										name="video-checkbox"
										id="checkbox"
									/>
									<span className={`${checked && "line-through"}`}>
										{subSection.title}
									</span>
									<HiDesktopComputer />
								</button>
							);
						})}
					{section.subSection.length == 0 && (
						<span className="text-richblack-200">No Lectures Available</span>
					)}
				</div>
			)}
			<div></div>
		</>
	);
};

export default CourseSection;
