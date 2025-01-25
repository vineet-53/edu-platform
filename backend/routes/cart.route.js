const express = require("express");
const { auth, isStudent } = require("../middlewares/auth");
const {
	addCourseToCart,
	removeCourseFromCart,
	getCartTotal,
} = require("../controllers/cart");
const router = express.Router();

router.post("/addToCart", auth, isStudent, addCourseToCart);
router.delete("/removeFromCart", auth, isStudent, removeCourseFromCart);
router.get("/getCartTotal", auth, isStudent, getCartTotal);

module.exports = router;
