const User = require("../models/User");

exports.addCourseToCart = async (req, res) => {
	try {
		const { courseId } = req.body;

		if (!courseId) {
			throw "Missing CourseId";
		}
		const { userId } = req.user;

		let user = await User.findById(userId);

		if (!user) {
			throw "User Not Found";
		}

		if (user.cart.includes(courseId)) {
			throw "Course Already Added";
		}

		user.cart.push(courseId);

		await user.save();

		return res.status(200).json({
			message: "Course Added To Cart",
			success: true,
		});
	} catch (err) {
		return res.status(400).json({
			message: err?.message || err,
			success: false,
		});
	}
};

exports.removeCourseFromCart = async (req, res) => {
	try {
		const { courseId } = req.query;

		const { userId } = req.user;
		if (!courseId) {
			throw "Missing CourseId";
		}
		let user = await User.findById(userId);
		if (!user) {
			throw "User Not Found";
		}

		user.cart = user.cart.filter((id) => id.toString() !== courseId);

		await user.save();

		user = await User.findById(userId).populate("cart").exec();

		return res.status(200).json({
			message: "Removed Course From Cart",
			success: true,
			cart: user.cart,
		});
	} catch (err) {
		return res.status(400).json({
			message: err?.message || err,
			success: false,
		});
	}
};

exports.getCartTotal = async (req, res) => {
	try {
		const { userId } = req.user;
		let user = await User.findById(userId).populate("cart");
		if (!user) {
			throw "User Not Found";
		}
		let courses = user.cart;
		let totalCartPrice = 0;

		totalCartPrice = courses.reduce(
			(totalCartPrice, currentCourse) =>
				totalCartPrice + parseInt(currentCourse.price),
			0
		);
		console.log("cart total", totalCartPrice);

		return res.status(200).json({
			message: "Cart Total",
			success: true,
			total: totalCartPrice,
		});
	} catch (err) {
		return res.status(400).json({
			message: err?.message || err,
			success: false,
		});
	}
};

exports.getCartDetails = async (req, res) => {
	try {
		const { userId } = req.user;

		let user = await User.findById(userId).populate("cart");

		if (!user) {
			throw "User Not Found";
		}

		return res.status(200).json({
			message: "Cart Total",
			success: true,
			cart: user.cart,
		});
	} catch (err) {
		return res.status(400).json({
			message: err?.message || err,
			success: false,
		});
	}
};
