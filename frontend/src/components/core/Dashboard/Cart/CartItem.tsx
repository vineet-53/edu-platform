import {
	VscStarEmpty,
	VscStarFull,
	VscStarHalf,
	VscTrash,
} from "react-icons/vsc";

export interface Rating {
	rating: string;
	review: string;
	course: string;
	user: string;
	_id: string;
}
const getAvgRatings = (ratings: Rating[]) => {
	if (ratings.length == 0) {
		return 0;
	}
	let totalUserRated = ratings.length;
	let totalRatings = ratings.reduce(
		(acc, ratingObj) => acc + parseInt(ratingObj.rating),
		0
	);
	return Math.round((totalRatings / totalUserRated) * 10) / 10;
};

const formatDesc = (desc: string, length: number): string => {
	if (desc.length < length) {
		return desc;
	}
	return desc.slice(0, length) + "...";
};

const CartItem = ({ item, isLast }: { item: any; isLast: boolean }) => {
	const rating = getAvgRatings(item.ratingAndReviews);
	const ratingArr = [0, 0, 0, 0, 0];
	return (
		<div className="py-3 flex flex-col md:gap-3 md:mt-3 max-lg:max-w-[90%]">
			<div className="max-lg:flex-col flex gap-2 md:w-2xl max-md:">
				<div className="max-md:w-full md:flex-[.3]">
					<img
						className="object-contain max-sm:max-w-3xs md:max-lg:max-w-xl"
						src={item.thumbnailImage}
						alt=""
					/>
				</div>
				<div className="flex flex-col max-md:gap-2 md:gap-3 max-sm:text-sm md:flex-[.6]">
					<div className="text-white max-md:text-xl ">{item.courseName}</div>
					<p className="">{formatDesc(item.courseDescription, 63)}</p>
					<p className="">TotalCurses*Lesson*Beginner</p>
					<div className="flex gap-x-1 items-center ">
						<p className="text-yellow-100 mr-2.5 ">{rating}</p>
						{ratingArr.map((index: number) => {
							if (index + 1 <= rating) {
								return <VscStarFull className="fill-yellow-100" />;
							}
							return <VscStarEmpty />;
						})}
						{Math.floor(rating) < rating && (
							<VscStarHalf className="fill-yellow-100" />
						)}
						<p className="">(Review Count)</p>
					</div>
				</div>
				<div className="md:flex-[.1] max-md:scale-95 mr-auto">
					<button className="cursor-pointer hover:text-pink-400 bg-richblack-800 flex p-3 gap-2 rounded-xl items-center">
						<VscTrash className="text-pink-600"></VscTrash>
						<span className="text-pink-600">Remove</span>
					</button>
				</div>
			</div>

			{!isLast && (
				<div className="border-b-2 w-full  border-b-richblack-700 my-3"></div>
			)}
		</div>
	);
};

export default CartItem;
