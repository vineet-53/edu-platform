const express = require("express");
const router = express.Router();
const { contactUs } = require("../controllers/contact");
const {
	resetPasswordToken,
	resetPassword,
} = require("../controllers/resetPassword");
router.post("/reset-password-token", resetPasswordToken);
router.post("/update-password/:resetPasswordToken", resetPassword);
router.post("/contact-us", contactUs);
module.exports = router;
