const express = require("express");
const router = express.Router();

const {
	updateProfilePicture,
	changePassword,
	getUserDetails,
	updateProfile,
	deleteAccount,
	resetProfilePicture,
} = require("../controllers/profile");
const {
	getEnrolledCourses,
	getInstructorCourses,
} = require("../controllers/course");
const { auth, isInstructor } = require("../middlewares/auth");
const upload = require("../configs/multer");

router.put(
	"/updateDisplayPicture",
	upload.single("displayPicture"),
	auth,
	updateProfilePicture
);

router.put("/updateProfile", auth, updateProfile);
router.get("/getUserDetails", auth, getUserDetails);
router.delete("/deleteAccount", auth, deleteAccount);
router.post("/changePassword", auth, changePassword);
router.get("/resetProfilePicture", auth, resetProfilePicture);
router.get("/getEnrolledCourses", auth, getEnrolledCourses);
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);

module.exports = router;
