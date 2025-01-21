const express = require("express");
const router = express.Router();
const {
	signup,
	sendOTP,
	login,
	changeAccountType,
	logout,
} = require("../controllers/auth");
const { auth, isAdmin } = require("../middlewares/auth");
router.post("/signup", signup);
router.post("/login", login);
router.post("/sendotp", sendOTP);
router.post("/logout", logout);
router.post("/changeAccountType", auth, isAdmin, changeAccountType);
module.exports = router;
