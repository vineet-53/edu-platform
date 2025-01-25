const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const RatingAndReview = require("../models/RatingAndReview");
const { uploadToCloudinary } = require("../utilities/imageUploader");
const { passwordHash } = require("../utilities/password");
const { destroyFromCloudinary } = require("../utilities/imageDestroyer");
const Otp = require("../models/Otp");
exports.createProfile = async (req, res) => {
	try {
		const { gender, dob = "", contactNumber: phone, about = "" } = req.body;
		const { userId } = req.user;
		if (!gender || !phone) {
			throw "missing properties";
		}
		const profileDetails = await Profile.create({
			gender,
			dob,
			contactNumber: phone,
			about,
		});
		const userDetails = await User.findById(userId);
		userDetails.profile = profileDetails._id;
		await userDetails.save((err) => {
			if (err) throw "error saving user details";
		});
		return res.status(200).json({
			success: true,
			message: "Profile created successfully",
		});
	} catch (err) {
		return res.status(400).json({
			success: false,
			message: err.message,
		});
	}
};

exports.updateProfile = async (req, res) => {
	try {
		const {
			firstName,
			lastName,
			gender,
			dob,
			contactNumber,
			countryCode,
			about,
		} = req.body;
		const { userId } = req.user;

		// validate input details

		if (!firstName || !gender || !dob || !contactNumber || !about) {
			throw new Error("missing input details");
		}

		let userDetails = await User.findById(userId);
		userDetails.firstName = firstName;
		if (lastName != " ") {
			userDetails.lastName = lastName;
		}
		const profileId = userDetails.profile;
		const profileDetails = await Profile.findOneAndUpdate(
			profileId,
			{
				$set: {
					gender,
					dob,
					contactNumber: `${countryCode} ${contactNumber}`,
					about,
				},
			},
			{ new: true }
		);
		await userDetails.save();
		console.log(profileDetails);
		userDetails = await User.findById(userId).populate("profile").exec();
		return res.status(200).json({
			success: true,
			message: "Profile updated successfully",
			user: userDetails,
		});
	} catch (err) {
		return res.status(400).json({
			success: false,
			message: err.message,
		});
	}
};

exports.deleteAccount = async (req, res) => {
	try {
		const { userId } = req.user;
		console.log("Deleting User ", userId);
		const user = await User.findById(userId);
		if (!user) {
			throw new Error("User Not Found");
		}
		if (user.profile) {
			let profile = await Profile.findByIdAndDelete(user.profile._id, {
				new: true,
			});
			console.log("DELETED  USER PROFILE --- ", profile);
		}
		if (!user.courses.length) {
			for (let courseId in user.courses) {
				const course = await Course.findAndUpdate(
					{ _id: courseId },
					{ $pull: { studentEnrolled: userId } },
					{ new: true }
				);
				console.log("DELETED USER FROM COURSE --- ", course);
				const allRatings = await RatingAndReview.find(
					{ userId },
					{ new: true }
				);
				for (let ratingId in allRatings) {
					let rating = await RatingAndReview.findByIdAndDelete(ratingId, {
						new: true,
					});
					console.log("DELETED USER FROM RATINGS ---- ", rating);
				}
			}
		}

		if (!user.courseProgress.length) {
			let cp = await CourseProgress.findOneAndDelete({ userId });
			console.log("DELETED USER FROM COURSE PROGRESS ---", cp);
		}

		// DELTE USER PROFILE IAMGE
		await destroyFromCloudinary(user.imagePublicId);

		await Otp.findByIdAndDelete({ email: user.email }, { new: true });
		// courses
		let deletedUser = await User.findByIdAndDelete(userId, { new: true });
		console.log("DELETD USER ----", deletedUser);
		return res
			.clearCookie("token")
			.status(200)
			.json({
				success: true,
				message: "DELETED ACCOUNT SUCCESSFULLY",
				deletedUser,
				redirectTo: "/login",
			})
			.send();
	} catch (err) {
		return res.status(401).json({
			success: false,
			message: err.message,
		});
	}
};

exports.getUserDetails = async (req, res) => {
	try {
		const { userId } = req.user;
		if (!userId) {
			throw new Error("missing properties");
		}
		let user = await User.findById(userId)
			.populate("profile")
			.select("-resetPasswordToken -token -active ")
			.exec();
		let cart = await User.findById(userId)
			.populate({
				path: "cart",
				populate: {
					path: "ratingAndReviews",
				},
			})
			.select("cart")
			.exec();

		console.log(user);
		return res.status(200).json({
			success: true,
			message: "fetched all user details",
			user,
			cart,
		});
	} catch (err) {
		return res.status(400).json({
			success: false,
			message: err.message,
		});
	}
};

exports.updateProfilePicture = async (req, res) => {
	try {
		const image = req.file;
		const { userId } = req.user;

		console.log(image);

		if (!image) {
			throw new Error("missing image property");
		}

		if (!userId) {
			throw new Error("user id not found ");
		}

		const user = await User.findById(userId);
		console.log(user);

		const { url, publicId } = await uploadToCloudinary(
			image.path,
			process.env.CLOUD_FOLDER,
			1000,
			1000
		);
		let imageupload = url;

		console.log(imageupload);

		user.image = imageupload;
		user.imagePublicId = publicId;
		await user.save();

		return res.status(200).json({
			success: true,
			message: "updated user profile image",
			user,
			image: imageupload,
		});
	} catch (err) {
		return res.status(400).json({
			success: false,
			message: err.message,
		});
	}
};
exports.changePassword = async (req, res) => {
	try {
		const { password, confirmPassword } = req.body;

		const { email } = req.user;

		if (!password || !confirmPassword) {
			throw new Error("Missing Details");
		}

		if (password !== confirmPassword) {
			throw new Error("Creadentials not match");
		}

		let user = await User.findOne({ email });

		if (!user) {
			throw new Error("User Not Found");
		}

		user.password = await passwordHash(password, 10);
		await user.save();

		return res.status(200).json({
			success: true,
			message: "Password Changed",
			user,
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: err.message,
		});
	}
};

exports.resetProfilePicture = async (req, res) => {
	try {
		const { userId } = req.user;

		const user = await User.findById(userId);

		const resetImageUrl = `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`;

		user.image = resetImageUrl;
		await user.save();

		return res.status(200).json({
			success: true,
			message: "Reset User Picture",
		});
	} catch (err) {
		return res.status(401).json({
			success: false,
			message: err.message,
		});
	}
};
