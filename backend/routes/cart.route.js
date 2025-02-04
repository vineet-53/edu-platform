const express = require("express");
const { auth, isStudent } = require("../middlewares/auth");
const {
	addCourseToCart,
	removeCourseFromCart,
	getCartDetails,
	getCartTotal,
} = require("../controllers/cart");
const router = express.Router();

router.post("/addToCart", auth, isStudent, addCourseToCart);
router.delete("/removeFromCart", auth, isStudent, removeCourseFromCart);
router.get("/getCartTotal", auth, isStudent, getCartTotal);
router.get("/getCartDetails", auth, isStudent, getCartDetails);

module.exports = router;
