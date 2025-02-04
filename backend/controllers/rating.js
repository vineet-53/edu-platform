const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const User = require("../models/User");
const mongoose = require("mongoose");
function isUserRated(ratingAndReviewsArr, userId) {
	let initLength = ratingAndReviewsArr.length;

	let finalLength = ratingAndReviewsArr.filter((id) => id !== userId);

	if (finalLength == initLength) {
		return 0;
	}
	return 1;
}
exports.createRating = async (req, res) => {
	try {
		const { rating, review, courseId } = req.body;

		const { userId } = req.user;

		console.log(userId);

		if (!rating || !review) {
			throw new Error("Missing Details");
		}

		// validate the user is not present in rating or not have done rating
		const courseDetail = await Course.findById(courseId);

		const user = await User.findById(userId);

		console.log("rating and reviews", courseDetail.ratingAndReviews);

		if (isUserRated(courseDetail.ratingAndReviews, user._id)) {
			throw new Error("User Already Rated");
		}
		// create rating and review
		const ratingDetails = await RatingAndReview.create({
			user: user._id,
			course: courseDetail._id,
			rating,
			review,
		});
		// put insde the course

		courseDetail.ratingAndReviews.push(ratingDetails._id);

		await courseDetail.save();

		return res.status(200).json({
			success: true,
			message: "Created Rating Successfully",
		});
	} catch (err) {
		return res.status(401).json({
			success: false,
			message: err.message,
		});
	}
};
exports.deleteRatingAndReviews = async (req, res) => {
	try {
		const { ratingId, courseId } = req.query;

		const course = await Course.findById(courseId);

		const rating = await RatingAndReview.findByIdAndDelete(ratingId, {
			new: true,
		});

		if (!rating) {
			throw "Rating Not Found";
		}

		course.ratingAndReviews = course.ratingAndReviews.filter(
			(id) => id.toString() !== ratingId
		);

		await course.save();

		return res.status(200).json({
			message: "Deleted Rating",
			success: true,
		});
	} catch (err) {
		return res.status(400).json({
			message: err.message || err,
			success: false,
		});
	}
};
exports.getAvgRating = async (req, res) => {
	try {
		const { courseId } = req.query;

		const courseDetails = await Course.findById(courseId)
			.populate("ratingAndReviews")
			.exec();

		if (!courseDetails) {
			throw new Error("Course Not Found");
		}

		const totalRatings = courseDetails.ratingAndReviews.length * 5;

		let ratingAcquired = 0;
		courseDetails.ratingAndReviews.map((rating) => {
			ratingAcquired += parseInt(rating.rating);
		});

		let avgRating;

		if (!totalRatings) {
			avgRating = 0;
		} else {
			avgRating = ratingAcquired / totalRatings;
		}
		return res.status(200).json({
			success: true,
			message: "Fetched All Ratings",
			avgRating,
		});
	} catch (err) {
		return res.status(401).json({
			success: false,
			message: err.message,
		});
	}
};

exports.getAllRatingsAndReviews = async (req, res) => {
	try {
		const { courseId } = req.query;

		let allRatings = await RatingAndReview.find({ course: courseId })
			.populate({
				path: "user",
				select: "firstName lastName email image",
			})
			.populate({
				path: "course",
				select: "courseName ",
			});

		if (!allRatings) {
			throw new Error("Error Fetching Ratings and Reviews");
		}

		return res.status(200).json({
			success: true,
			message: "fetched all ratings",
			allRatings,
		});
	} catch (err) {
		return res.status(401).json({
			success: false,
			message: err.message,
		});
	}
};
