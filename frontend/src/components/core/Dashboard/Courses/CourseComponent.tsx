import { AxiosResponse } from "axios";
import React, {
	ChangeEvent,
	FormEvent,
	MutableRefObject,
	RefObject,
	useEffect,
	useRef,
	useState,
} from "react";
import { FaSearch } from "react-icons/fa";
import { apiConnector } from "../../../../services/apiconnector";
import { course } from "../../../../services/endpoints";
import toast from "react-hot-toast";
import IconBtn from "../../../common/IconBtn";
import { Link } from "react-router-dom";

const CourseComponent = () => {
	const [value, setValue] = useState("");
	const [isFocus, setIsFocus] = useState<boolean>(true);
	const [inputLengthError, setInputLengthError] = useState(false);
	const [courseList, setCourseList] = useState([]);
	const handleSearchCourse = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const search = value.trim().split(" ").join("+");
		console.log("searching ", search);
		(async () => {
			try {
				const response: AxiosResponse = await apiConnector(
					course.FIND_COURSES.method,
					`${course.FIND_COURSES.url}?search=${search}`
				);
				if (!response.data.success) {
					throw response.data;
				}
				console.log(response.data.courses);
				setCourseList(response.data.courses);
			} catch (err: any) {
				console.error(err.message);
				toast.error(err.message);
			}
		})();
	};

	return (
		<div className="flex flex-col gap-4">
			<form onSubmit={handleSearchCourse}>
				{inputLengthError && (
					<span className="text-yellow-100">Exceeds 20 words</span>
				)}
				<div
					className={`max-sm:px-1 max-sm:py-2 max-sm:w-[80%] max-w-md flex items-center justify-between px-4 py-2 border ${isFocus && "border-richblack-200 rounded-sm"}`}
				>
					<input
						type="text"
						className="outline-none max-sm:text-sm text-white text-xl font-inter"
						placeholder="Search Courses"
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
					<button type="submit" className="cursor-pointer">
						<FaSearch className="text-white" />
					</button>
				</div>
			</form>
			{courseList.length &&
				courseList.map((item: any, index) => {
					return (
						<div key={index} className=" max-sm:w-[90%] sm:flex gap-3 ">
							<div className="bg-white max-sm:h-40 max-sm:w-[100%] max-md:w-60 max-md:h-32 md:w-44 md:h-32 overflow-hidden rounded-sm ">
								<img src={item?.thumbnailImage} alt="" />
							</div>
							<div className="flex flex-col text-left max-sm:gap-y-1 max-sm:mt-4 sm:gap-y-3">
								<div className="text-white max-sm:text-2xl md:text-xl">
									{item?.courseName}
								</div>
								<div className="text-richblack-400 max-sm:text-sm md:text-sm text-balance">
									{item?.courseDescription.length < 100
										? item?.courseDescription
										: item?.courseDescription.slice(0, 100) + "..."}
								</div>
								<div className="flex items-end ">
									<Link to={`/course?courseId=${item._id}`}>
										<IconBtn customClasses="max-sm:mt-3 max-sm:w-full max-sm:text-center max-sm:py-2 max-sm:justify-center sm:w-fit">
											More Details
										</IconBtn>
									</Link>
								</div>
							</div>
						</div>
					);
				})}
		</div>
	);
};

export default CourseComponent;
