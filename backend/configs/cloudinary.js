const cloudinary = require("cloudinary").v2;
require("dotenv").config();
exports.connect = () => {
	try {
		cloudinary.config({
			cloud_name: process.env.CLOUDNAME,
			api_key: process.env.CLOUDINARY_API_KEY,
			api_secret: process.env.CLOUDINARY_ACCESS_KEY,
		});
	} catch (err) {
		console.log("error connecting cloudinary");
	}
};
