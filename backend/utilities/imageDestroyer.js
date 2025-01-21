const cloudinary = require("cloudinary").v2;

exports.destroyFromCloudinary = async (publicId) => {
	try {
		const result = await cloudinary.uploader.destroy(publicId);
		console.log("DELETED USER PROFILE IMAGE", result);
	} catch (err) {
		console.error("ERROR DELETING USER PROFILE IMAGE", err.message);
		throw err;
	}
};
