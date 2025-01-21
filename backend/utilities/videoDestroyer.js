const cloudinary = require("cloudinary").v2;
exports.destroyVideoFromCloudinary = async (publicId) => {
	try {
		const result = await cloudinary.uploader.destroy(publicId, {
			resource_type: "video",
		});
		console.log("Deleted Video", result);
	} catch (err) {
		console.error("Error Deleting Video", err.message);
		throw err;
	}
};
