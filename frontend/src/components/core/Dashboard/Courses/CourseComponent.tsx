import { ChangeEvent, useMemo, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import useOnClickOutside from "../../../../hooks/useOnClickOutside";
import SearchCourseList from "./SearchCourseList";

export interface Course {
	_id: string;
	thumbnailImage: string;
	courseName: string;
	courseDescription: string;
	instructor: any;
	price: string;
}

const CourseComponent = ({ courseList }: { courseList: Course[] }) => {
	const [isSearchInputFocus, setSearchInputFocus] = useState<boolean>(true);
	const [inputLengthError, setInputLengthError] = useState(false);
	const [value, setValue] = useState<string>("");
	const inputRef = useRef(null);
	const MAX_INPUT_LENGTH = 20;

	const filterData = (courseList: Course[], value: string): Course[] => {
		if (value == "") {
			return [];
		}
		return courseList.filter((course: Course) => {
			if (
				course.courseDescription
					.trim()
					.toLocaleLowerCase()
					.includes(value.trim().toLocaleLowerCase()) ||
				course.courseName
					.trim()
					.toLocaleLowerCase()
					.includes(value.trim().toLocaleLowerCase())
			) {
				return course;
			}
		});
	};

	const searchedCourse = useMemo(
		() => filterData(courseList, value),
		[courseList, value]
	);

	useOnClickOutside(inputRef, () => setSearchInputFocus(false));
	return (
		<div className="flex flex-col gap-4">
			<div>
				{inputLengthError && (
					<span className="text-yellow-100">
						Exceeds {MAX_INPUT_LENGTH} words
					</span>
				)}
				<div
					className={`max-sm:px-1 max-sm:py-2 max-sm:w-[80%] max-w-md flex items-center justify-between px-4 py-2 border ${isSearchInputFocus && "border-richblack-200 rounded-sm"}`}
				>
					<input
						type="text"
						ref={inputRef}
						className="outline-none max-sm:text-sm text-white text-xl font-inter"
						placeholder="Search "
						onFocus={() => setSearchInputFocus(true)}
						onChange={(e: ChangeEvent<HTMLInputElement>) => {
							if (e.target.value.length > 20) {
								setInputLengthError(true);
								setTimeout(() => {
									setInputLengthError(false);
								}, 4000);
								return;
							}

							setValue(e.target.value);
						}}
					/>
					<FaSearch className="text-white" />
				</div>
			</div>
			{searchedCourse.length == 0 && value !== "" && (
				<div className="text-pure-greys-600 max-md:text-sm md:text-xl flex justify-center md:w-lg ">
					No Course Found
				</div>
			)}

			{searchedCourse.length > 0 && (
				<SearchCourseList courseList={searchedCourse} />
			)}
		</div>
	);
};

export default CourseComponent;
