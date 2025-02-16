import { useState } from "react";
import { Course, HomePageExplore } from "../../../constants/HomePageExplore";
import CourseCard from "./CourseCard";
import HighlightText from "./HighlightText";

const tabsName: string[] = [
	"Free",
	"New to coding",
	"Most popular",
	"Skill paths",
	"Career paths",
];

const ExploreMore = () => {
	const [currentTab, setCurrentTab] = useState<string>(tabsName[0]);
	const [courses, setCourses] = useState<Course[]>(HomePageExplore[0].courses);
	const [currentCard, setCurrentCard] = useState<string>(
		HomePageExplore[0].courses[0].heading
	);

	const setMyCards = (value: string) => {
		setCurrentTab(value);
		const result = HomePageExplore.filter((ele) => ele.tag === value);
		setCourses(result[0].courses);
		setCurrentCard(result[0].courses[0].heading);
	};

	return (
		<div>
			<div className="text-4xl font-semibold text-center my-10">
				Unlock the
				<HighlightText text={"Power of Code"} />
				<p className="text-center text-richblack-300 text-lg font-semibold mt-1">
					{" "}
					Learn to build anything you can imagine{" "}
				</p>
			</div>

			<div className="hidden lg:flex gap-5 -mt-5 mx-auto w-max bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
				{tabsName.map((element, index) => {
					return (
						<div
							className={`text-[16px] duration-200 flex flex-row items-center gap-2 rounded-full transition-all duration-200 cursor-pointer  hover:bg-richblack-900 hover:text-richblack-5 px-7 py-[7px]
                                    ${currentTab === element ? "bg-richblack-900 text-richblack-5 font-medium" : "text-richblack-200"} `}
							key={index}
							onClick={() => setMyCards(element)}
						>
							{element}
						</div>
					);
				})}
			</div>

			<div className="hidden lg:block lg:h-[200px]"></div>

			<div className="lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3">
				{courses.map((ele, index) => {
					return (
						<CourseCard
							key={index}
							cardData={ele}
							currentCard={currentCard}
							setCurrentCard={setCurrentCard}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default ExploreMore;
