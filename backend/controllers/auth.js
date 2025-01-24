const User = require("../models/User");
const Otp = require("../models/Otp");
const { generateOtp } = require("../utilities/otp");
const jwt = require("jsonwebtoken");
const { passwordHash } = require("../utilities/password");
const Profile = require("../models/Profile");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
	try {
		// get all details
		const {
			firstName,
			lastName = " ",
			password,
			confirmPassword,
			email,
			accountType,
			otp,
			phoneNumber,
			countryCode,
		} = req.body;
		// validate details
		if (
			!firstName ||
			!password ||
			!confirmPassword ||
			!email ||
			!accountType ||
			!otp
		) {
			throw new Error("Missing Details");
		}
		// chech password validation
		if (password !== confirmPassword) {
			throw new Error("Credentails Not Matched");
		}
		// check for existing user
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			throw new Error("User Existed");
		}
		// check for the latest otp and match it with the given one
		const recentOtpDoc = await Otp.findOne({ email })
			.sort({ createdAt: -1 })
			.limit(1);
		// if validated otp then hash the password
		if (otp != recentOtpDoc.otpNumber) {
			throw new Error("otp not matched");
		}
		// hash password
		const hashPassword = await passwordHash(password, 10);
		// generate null profile
		const profileDetails = await Profile.create({
			gender: null,
			dob: "",
			about: null,
			contactNumber: `${countryCode} ${phoneNumber}`,
		});

		// create user with given details
		let userPayload = {
			firstName,
			lastName,
			accountType,
			email,
			password: hashPassword,
			image: `https://ui-avatars.com/api/?name=${firstName}+${lastName}`,
			profile: profileDetails._id,
			courses: [],
			courseProgress: [],
		};
		const userDoc = await User.create(userPayload);
		const user = await User.findById(userDoc._id).select(
			"-password -active -accountType -courseProgress"
		);
		if (!userDoc) {
			throw new Error("Error Creating User");
		}
		return res.status(200).json({
			success: true,
			message: "User Registered Successfully",
			user: user,
		});
	} catch (err) {
		console.error(err.message);
		return res.status(401).json({
			success: false,
			message: err.message,
		});
	}
};
exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			throw new Error("Missing Details");
		}

		let user = await User.findOne({ email: email });

		if (!user) {
			throw new Error("User Not Found");
		}

		const result = await bcrypt.compare(password, user.password);

		if (!result) {
			throw new Error("Credentials Not Matched");
		}

		const JWT_SECRET = process.env.JWT_SECRET;
		const JWT_PAYLOAD = {
			userId: user._id,
			email,
		};
		const token = jwt.sign(JWT_PAYLOAD, JWT_SECRET);

		// store in the browser cookies
		user.token = token;
		user.active = true;
		user = await user.save({ new: true });
		user = await User.findById(user._id)
			.populate("profile")
			.select("-password -token -active -resetPasswordToken")
			.exec();

		// hash the token and save to cookie
		const hashedToken = jwt.sign({ accessToken: token }, JWT_SECRET);

		return res
			.cookie("token", hashedToken)
			.status(200)
			.json({
				success: true,
				message: "Logged In Succesfully",
				token: hashedToken,
				user,
			})
			.send();
	} catch (err) {
		console.log(err.message);
		return res.status(400).json({
			success: false,
			message: err.message,
		});
	}
};
exports.sendOTP = async (req, res) => {
	try {
		const { email } = req.body;

		//validate data
		if (!email) {
			return res.status(401).json({
				message: "Missing Email",
				success: false,
			});
		}

		// generate new otp
		let otpNumber = await generateOtp();

		// entry to db
		const otpDoc = await Otp.create({ email, otpNumber });

		return res.status(200).json({
			message: "Otp Sended",
			success: true,
			otp: otpDoc,
		});
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.changeAccountType = async (req, res) => {
	try {
		const { userId, ADMIN_ACCESS_KEY, accountType } = req.body;

		// validate detials
		if (!userId || !ADMIN_ACCESS_KEY) {
			throw new Error("Missing Details");
		}

		if (ADMIN_ACCESS_KEY != process.env.ADMIN_ACCESS_KEY) {
			throw new Error("Access Key Invalid");
		}

		// find user
		const user = await User.findById(userId);

		// validate user
		if (!user) {
			throw new Error("User Not Exist");
		}

		user.accountType = accountType;
		await user.save();

		return res.status(200).json({
			success: true,
			message: "User Type Changed",
		});
	} catch (err) {
		return res.status(401).json({
			success: false,
			message: err.message,
		});
	}
};

exports.logout = async (req, res) => {
	try {
		const { email } = req.body;

		if (!email) {
			throw new Error("Missing Email");
		}

		if (res.cookies.token) {
			res.clearCookie("token");
		}

		const user = await User.findOne({ email });
		user.token = null;
		user.active = false;
		user.save();

		return res.status(200).json({
			success: true,
			message: "Logged Out",
		});
	} catch (err) {
		return res.status(401).json({
			success: false,
			message: err.message,
		});
	}
};
