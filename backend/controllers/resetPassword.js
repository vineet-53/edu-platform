const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { sendMail } = require("../utilities/sendMail");
const { passwordHash } = require("../utilities/password");

exports.resetPasswordToken = async (req, res) => {
	try {
		const { email } = req.body;
		if (!email) {
			throw new Error("Missing Email");
		}

		let randomToken = crypto.randomUUID();

		const updatedUser = await User.findOneAndUpdate(
			{ email: email },
			{
				resetPasswordToken: randomToken,
			},
			{ new: true }
		);

		console.log(updatedUser);

		if (!updatedUser) {
			throw new Error("User Not Registered");
		}

		const url =
			process.env.FRONTEND_DOMAIN ||
			`http://localhost:${
				process.env.FRONTEND_PORT || 5173
			}/update-password/${randomToken}`;
		// send url to the email
		await sendMail(
			email,
			"Password reset link",
			`<a href=${url}> reset link </a>`
		);
		return res.status(200).json({
			success: true,
			message: "Reset Password Link Sended",
			user: updatedUser,
		});
	} catch (err) {
		return res.status(400).json({
			success: false,
			message: err.message,
		});
	}
};

exports.resetPassword = async (req, res) => {
	try {
		const { resetPasswordToken } = req.params;
		const { password, confirmPassword } = req.body;

		if (!password || !confirmPassword) {
			throw new Error("Missing Details");
		}

		if (password !== confirmPassword) {
			throw new Error("Credentials Not Matched");
		}

		const user = await User.findOne({ resetPasswordToken });

		if (password === user.password) {
			throw new Error("Old Password Couldn't be set");
		}

		if (!user) {
			throw new Error("User not registered");
		}

		if (!user.resetPasswordToken) {
			throw new Error("Reset Token Expired");
		}

		if (user.resetPasswordToken !== resetPasswordToken) {
			throw new Error("Reset Token Not Matched");
		}
		// hash password
		user.password = await passwordHash(password, 10);
		// save user
		await user.save();

		return res.status(200).json({
			success: true,
			message: "Password Reset Successfully",
			user,
		});
	} catch (err) {
		return res.status(401).json({
			message: err.message,
			success: false,
		});
	}
};
