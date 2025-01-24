const User = require("../models/User");
const { uploadToCloudinary } = require("../utilities/imageUploader");
const Course = require("../models/Course");
const Category = require("../models/Category");
const mongoose = require("mongoose");
const { Section, SubSection } = require("../models/Section");
const CourseProgress = require("../models/CourseProgress");
const { destroyFromCloudinary } = require("../utilities/imageDestroyer");
exports.createCourse = async (req, res) => {
	try {
		//get the input data
		const {
			courseName,
			courseDescription,
			whatYouWillLearn,
			price,
			tag,
			categoryId,
			instructions,
		} = req.body;
		const thumbnailImage = req.file;
		const { userId } = req.user;

		if (
			!courseName ||
			!courseDescription ||
			!whatYouWillLearn ||
			!price ||
			!tag
		) {
			throw new Error("Missing Details");
		}

		const user = await User.findById(userId);

		if (!user) {
			throw new Error("User Not Found");
		}

		// validate the user is not uploading course twice
		let course = await Course.findOne({ instructor: userId });

		if (course && course.courseName === courseName) {
			throw new Error("Course already exists ");
		}

		const category = await Category.findById(categoryId);

		// get link to thumbnail
		const { url: thumbnailLink, publicId } = await uploadToCloudinary(
			thumbnailImage.path,
			process.env.CLOUD_FOLDER
		);

		//create course
		const courseDetails = await Course.create({
			courseName,
			courseDescription,
			whatYouWillLearn,
			price,
			tag,
			instructor: userId,
			thumbnailImage: thumbnailLink,
			thumbnailPublicId: publicId,
			category: categoryId,
			instructions,
		});

		user.courses.push(courseDetails._id);
		category.courses.push(courseDetails._id);

		await user.save();
		await category.save();

		return res.status(200).json({
			success: true,
			message: "Course Created",
			course: courseDetails,
		});
	} catch (err) {
		return res.status(401).json({
			success: false,
			message: err.message,
		});
	}
};
exports.getAllCourses = async (req, res) => {
	try {
		const courses = await Course.find(
			{},
			{
				courseName: true,
				courseDescription: true,
				price: true,
				courseContent: true,
				instructor: true,
			}
		)
			.populate("instructor")
			.exec();

		return res.status(200).json({
			success: true,
			message: "Fetched Courses",
			courses,
		});
	} catch (err) {
		return res.status(401).json({
			success: false,
			message: err.message,
		});
	}
};
exports.getFullCourseDetails = async (req, res) => {
	try {
		const { courseId } = req.query;

		if (!courseId) {
			throw new Error("missing details");
		}
		const courseDetails = await Course.findById(courseId)
			.populate({
				path: "instructor",
				populate: {
					path: "profile",
				},
			})
			.populate({
				path: "sections",
				populate: {
					path: "subSection",
				},
			})
			.populate("category")
			.populate({
				path: "ratingAndReviews",
				populate: {
					path: "user",
				},
			})
			.populate({
				path: "tag",
				populate: {
					path: "courses",
				},
			})
			.populate({
				path: "studentEnrolled",
			})
			.exec();
		if (!courseDetails) {
			throw new Error("course not found");
		}
		console.log(courseDetails.tag);
		return res.status(200).json({
			success: true,
			message: "fetched all courses ",
			course: courseDetails,
		});
	} catch (err) {
		return res.status(401).json({
			success: false,
			message: err.message,
		});
	}
};
exports.updateCourse = async (req, res) => {
	try {
		const {
			courseName,
			courseDescription,
			tag,
			price,
			whatYouWillLearn,
			categoryId,
			courseId,
		} = req.body;

		const thumbnailImage = req.file;

		// find the course
		const course = await Course.findById({ _id: courseId });
		if (!course) {
			throw new Error("Course Not Found");
		}

		if (categoryId) {
			// find the present category
			const presentCategoryId = course.category;
			const newCategoryId = categoryId;
			// remove course id from present category
			// find category
			const presentCategory = await Category.findById(presentCategoryId);
			presentCategory.courses =
				presentCategory.courses.filter((id) => id.toString() !== courseId) ||
				presentCategory.courses;
			await presentCategory.save();
			// add new category id to coures
			course.category = newCategoryId;
		}

		if (courseName) {
			course.courseName = courseName;
		}
		if (courseDescription) {
			course.courseDescription = courseDescription;
		}
		if (tag) {
			course.tag = [];
			const tags = tag.trim();
			const tagArr = tags.split(" ");
			tagArr.forEach((word) => {
				course.tag.push(word);
			});
		}
		if (price) {
			course.price = price;
		}
		if (whatYouWillLearn) {
			course.whatYouWillLearn = whatYouWillLearn;
		}
		if (thumbnailImage) {
			course.thumbnailImage = await uploadToCloudinary(
				thumbnailImage.path,
				process.env.CLOUD_FOLDER
			);
		}

		const updatedCourse = await course.save();

		return res.status(200).json({
			success: true,
			message: "Updated Course",
			course: updatedCourse,
		});
	} catch (err) {
		return res.status(401).json({
			success: false,
			message: err.message,
		});
	}
};
exports.deleteCourse = async (req, res) => {
	try {
		const { courseId } = req.query;
		if (!courseId) {
			throw new Error("Missing Params");
		}
		let course = await Course.findById(courseId);
		if (!course) {
			throw new Error("Course Not Found");
		}
		// find user
		const instructorId = course.instructor;
		const instructor = await User.findById(instructorId);
		if (instructor.courses) {
			instructor.courses =
				instructor.courses.filter((id) => id.toString() !== courseId) ||
				instructor.courses;
			await instructor.save();
		}

		const studentEnrolled = course.studentEnrolled;
		if (studentEnrolled?.length) {
			studentEnrolled.forEach(async (userId) => {
				const user = await User.findById(userId);
				user.courses = user.courses
					? user.courses.filter((id) => id.toString() !== courseId)
					: user.courses;
				await user.save();
			});
		}

		for (let sectionId of course.sections) {
			const section = await Section.findById(sectionId);
			if (section) {
				if (section.subSection) {
					for (let subSectionId of section.subSection) {
						await SubSection.findByIdAndDelete(subSectionId);
					}
				}
			}
			await Section.findByIdAndDelete(sectionId, {
				$pull: { courses: courseId },
			});
		}
		await destroyFromCloudinary(course.thumbnailPublicId);
		course = await Course.findByIdAndDelete(courseId, { new: true });

		return res.status(200).json({
			success: true,
			message: "Course Deleted",
			course,
			destroyImage: destroy,
		});
	} catch (err) {
		return res.status(401).json({
			success: false,
			message: err.message,
		});
	}
};

exports.getCourseDetails = async (req, res) => {
	try {
		const { courseId } = req.query;

		if (!courseId) {
			throw new Error("Missing Params");
		}

		const course = await Course.findById(courseId)
			.populate("instructor")
			.populate("ratingAndReviews");
		if (!course) {
			throw new Error("Course Not Found");
		}

		return res.status(200).json({
			success: true,
			message: "Fetched Course",
			course,
		});
	} catch (err) {
		return res.status(401).json({
			success: false,
			message: err.message,
		});
	}
};

exports.getInstructorCourses = async (req, res) => {
	try {
		const { userId } = req.user;

		const allCourses = await Course.find({ instructor: userId });

		return res.status(200).json({
			success: true,
			message: "Fetched Created Courses",
			courses: allCourses,
		});
	} catch (err) {
		return res.status(401).json({
			success: false,
			message: err.message,
		});
	}
};

exports.getEnrolledCourses = async (req, res) => {
	try {
		const { userId } = req.user;

		const user = await User.findById(userId).populate("courses").exec();
		if (!user) {
			throw new Error("User Not Found");
		}
		return res.status(200).json({
			success: true,
			message: "Fetched Enrolled Courses",
			enrolledCourses: user.courses,
		});
	} catch (err) {
		return res.status(401).json({
			success: false,
			message: err.message,
		});
	}
};

exports.updateCourseProgress = async (req, res) => {
	try {
		const { courseId, subsectionId: subSectionId } = req.body;

		if (!courseId || !subSectionId) {
			throw new Error("missing details");
		}

		const { userId } = req.user;
		const course = await Course.findById(courseId);
		const subSection = await SubSection.findById(subSectionId);
		if (!course || !subSection) {
			throw new Error("input model not exist in db");
		}
		let courseProgress = await CourseProgress.findOne({
			courseId: courseId,
			userId: userId,
		});
		if (!courseProgress) {
			throw new Error("course progress not exist");
		}
		if (courseProgress.completedVideos.includes(subSectionId)) {
			throw new Error("already completed subSection");
		}
		courseProgress.courseId = courseId;
		courseProgress.completedVideos.push(subSectionId);
		await courseProgress.save();
		return res.status(200).json({
			success: true,
			message: "fetched enrolled courses",
			courseProgress,
		});
	} catch (err) {
		return res.status(401).json({
			success: false,
			message: err.message,
		});
	}
};

exports.getProgressPercentage = async (req, res) => {
	try {
		const { courseId } = req.query;

		if (!courseId) {
			throw new Error("Missing Details");
		}

		const courseProgress = await CourseProgress.find({ courseId });

		if (!courseProgress) {
			throw new Error("Course Progress Not Found");
		}

		let course = await Course.findById({ _id: courseId });
		if (!course) {
			throw new Error("Course Not Found");
		}
		course = await Course.findById(courseId).populate({
			path: "sections",
			populate: {
				path: "subSection",
			},
		});
		const totalLectures = course.sections.subSection.length;

		let percentage =
			(courseProgress.completedVideos.length / totalLectures) * 100;

		if (!course) {
			throw new Error("course not found");
		}

		return res.status(200).json({
			success: true,
			message: "Fetched Course Progress",
			courseProgress,
			percentage,
		});
	} catch (err) {
		return res.status(401).json({
			success: false,
			message: err.message,
		});
	}
};
exports.addToCart = async (req, res) => {
	try {
		const { courseId } = req.body;
		const { userId } = req.user;
		if (!userId) {
			throw new Error("user not authorized");
		}
		if (!courseId) {
			throw new Error("Please send all details ");
		}
		const user = await User.findById(userId);
		user.cart.push(courseId);
		await user.save();
		return res.status(200).json({
			success: true,
			message: "added to cart succcessfully",
			cart: user.cart,
		});
	} catch (err) {
		return res.status(401).json({
			success: false,
			message: err.message,
		});
	}
};

exports.getFullCartDetails = async (req, res) => {
	try {
		const { userId } = req.user;
		const user = await User.findById(userId).populate("cart").exec();
		if (!user) {
			throw new Error("user not existed");
		}
		await user.save();
		return res.status(200).json({
			success: true,
			message: "Sended full cart details",
			cart: user.cart,
		});
	} catch (err) {
		return res.status(401).json({
			success: false,
			message: err.message,
		});
	}
};

exports.removeItemFromCart = async (req, res) => {
	try {
		const { userId } = req.user;
		const { courseId } = req.body;
		let user = await User.findById(userId).populate("cart");
		user.cart = user.cart.filter((course) => {
			return course._id.toString() !== courseId;
		});
		console.log(user.cart);
		await user.save();

		return res.status(200).json({
			success: true,
			message: "removed item from cart",
			cart: user.cart,
		});
	} catch (err) {
		return res.status(401).json({
			success: false,
			message: err.message,
		});
	}
};

async function contains(string, tokenArr) {
	const result = await new Promise((res, rej) => {
		tokenArr.forEach((token) => {
			if (string.trim().toLowerCase().includes(token)) {
				res(true);
				return;
			}
		});

		rej(false);
	})
		.then((res) => res)
		.catch((res) => false);

	return result;
}

exports.findCourse = async (req, res) => {
	try {
		const search = req.query.search;
		if (!search) {
			throw "Search Query Not Found";
		}
		let courses = await Course.find(
			{},
			{
				_id: true,
				courseName: true,
				courseDescription: true,
				category: true,
				whatYouWillLearn: true,
				thumbnailImage: true,
			}
		)
			.populate("category")
			.select()
			.exec();
		console.log("COURSES", courses);
		let searchTokens = search?.split("+");
		console.log("SEARCH TOKEN ", searchTokens);
		let coursesArr = courses.map((course) => {
			if (
				contains(course.courseName, searchTokens) ||
				contains(course.courseDescription, searchTokens) ||
				contains(course.category.name, searchTokens) ||
				contains(course.whatYouWillLearn, searchTokens)
			) {
				return course;
			}
		});

		return res.status(200).json({
			success: true,
			message: "Found all Courses",
			courses: coursesArr,
		});
	} catch (err) {
		return res.status(401).json({
			success: false,
			message: err.message,
		});
	}
};
