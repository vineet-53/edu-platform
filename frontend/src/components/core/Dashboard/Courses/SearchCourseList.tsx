import { Course } from "./CourseComponent";
import IconBtn from "../../../common/IconBtn";
import { Link } from "react-router-dom";
const SearchCourseList = ({ courseList }: { courseList: Course[] }) => {
	return courseList.map((item: Course, index) => {
		return (
			<div key={index} className="  max-sm:w-[90%] sm:flex gap-3 ">
				{/* <div className="bg-white max-sm:h-40 max-sm:w-[100%] max-md:w-60 max-md:h-32 md:w-44 md:h-32 overflow-hidden rounded-sm ">
								<img src={item?.thumbnailImage} alt="" />
							</div> */}
				<div className=" max-md:px-2 max-md:py-3 bg-richblack-800 rounded-xl md:px-3 md:py-4 md:w-lg flex flex-col text-left max-sm:gap-y-1 max-sm:mt-4 sm:gap-y-3">
					<div className="text-white max-sm:text-2xl md:text-xl">
						{item?.courseName}
					</div>
					<div className="text-richblack-400 max-sm:text-sm md:text-sm ">
						{item?.courseDescription.length < 100
							? item?.courseDescription
							: item?.courseDescription.slice(0, 100) + "..."}
					</div>
					<div className="flex items-end ">
						<Link to={`/course/${item._id}`}>
							<IconBtn customClasses="max-sm:mt-3 max-sm:w-full max-sm:text-center max-sm:py-2 max-sm:justify-center sm:w-fit">
								More Details
							</IconBtn>
						</Link>
					</div>
				</div>
			</div>
		);
	});
};

export default SearchCourseList;
