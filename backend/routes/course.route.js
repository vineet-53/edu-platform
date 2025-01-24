const express = require("express");
const router = express.Router();

const {
	createRating,
	getAvgRating,
	getAllRatingsAndReviews,
	deleteRatingAndReviews,
} = require("../controllers/rating");

const {
	createCourse,
	getAllCourses,
	getFullCourseDetails,
	getCourseDetails,
	updateCourse,
	deleteCourse,
	updateCourseProgress,
	addToCart,
	getFullCartDetails,
	removeItemFromCart,
	getProgressPercentage,
	findCourse,
} = require("../controllers/course");
const {
	createCategory,
	showAllCategories,
	updateCategory,
	getCategoryPageDetails,
	deleteCategory,
} = require("../controllers/category");
const {
	addSection,
	addSubSection,
	deleteSection,
	deleteSubSection,
	updateSubSection,
	updateSection,
} = require("../controllers/section");
const {
	auth,
	isAdmin,
	isStudent,
	isInstructor,
} = require("../middlewares/auth");

const upload = require("../configs/multer");

router.get("/findCourses", auth, isStudent, findCourse);
router.post("/createCategory", auth, isAdmin, createCategory);
router.post("/updateCategoryPageDetails", auth, isAdmin, updateCategory);
router.get("/deleteCategory", auth, isAdmin, deleteCategory);
router.get("/showAllCategories", showAllCategories);
router.get("/getCategoryPageDetails", getCategoryPageDetails);
// course
router.post(
	"/createCourse",
	auth,
	isInstructor,
	upload.single("thumbnailImage"),
	createCourse
);
router.get("/getAllCourses", getAllCourses);
router.get("/getFullCourseDetails", getFullCourseDetails);
router.put(
	"/editCourse",
	auth,
	isInstructor,
	upload.single("thumbnailImage"),
	updateCourse
);
router.get("/getCourseDetails", auth, getCourseDetails);
router.delete("/deleteCourse", auth, isInstructor, deleteCourse);

// section
router.post("/addSection", auth, isInstructor, addSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.post("/deleteSection", auth, isInstructor, deleteSection);

// sub section
router.post(
	"/addSubSection",
	auth,
	isInstructor,
	upload.single("videoFile"),
	addSubSection
);
router.post(
	"/updateSubSection",
	auth,
	isInstructor,
	upload.single("videoFile"),
	updateSubSection
);
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);

router.get("/progress", auth, getProgressPercentage);

router.post("/updateCourseProgress", auth, updateCourseProgress);
router.post("/add-to-cart", auth, addToCart);
router.get("/getFullCartDetails", auth, getFullCartDetails);
router.post("/removeItemFromCart", auth, removeItemFromCart);

// ratings
router.post("/createRating", auth, isStudent, createRating);
router.delete("/deleteRating", auth, isStudent, deleteRatingAndReviews);
router.get("/getAverageRating", getAvgRating);
router.get("/getAllReviews", getAllRatingsAndReviews);

module.exports = router;
