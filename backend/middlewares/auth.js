const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.auth = async (req, res, next) => {
	try {
		const hashedToken = req.headers["x-auth-token"] || req.cookies?.token;

		if (!hashedToken) {
			throw new Error("Missing Access Token");
		}
		const { accessToken } = jwt.verify(hashedToken, process.env.JWT_SECRET);

		const decodedPayload = jwt.verify(accessToken, process.env.JWT_SECRET);

		req.user = decodedPayload;

		next();
	} catch (err) {
		return res.status(401).json({
			success: false,
			message: err.message,
		});
	}
};
const getUserRole = async (userId) => {
	try {
		const user = await User.findById(userId);
		if (!user) {
			throw "Unauthorisation access user is not there in db";
		}
		return user.accountType;
	} catch (err) {
		return res.status(401).json({
			success: false,
			message: err.message,
		});
	}
};
exports.isStudent = async (req, res, next) => {
	const { userId } = req.user;
	try {
		if ((await getUserRole(userId)) !== "Student") {
			throw new Error("this is a student route only");
		}
		next();
	} catch (err) {
		return res.status(401).json({
			success: false,
			message: err.message,
		});
	}
};

exports.isAdmin = async (req, res, next) => {
	const { userId } = req.user;
	try {
		if ((await getUserRole(userId)) !== "Admin") {
			throw new Error("this is admin route only");
		}
		next();
	} catch (err) {
		return res.status(401).json({
			success: false,
			message: err.message,
		});
	}
};
exports.isInstructor = async (req, res, next) => {
	const { userId } = req.user;
	try {
		if ((await getUserRole(userId)) !== "Instructor") {
			throw new Error("this is instructor route only");
		}
		next();
	} catch (err) {
		return res.status(401).json({
			success: false,
			message: err.message,
		});
	}
};
