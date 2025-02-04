const cloudinary = require("cloudinary").v2;
const uploadVideo = async (filePath, folder, height, width) => {
	try {
		let options = {
			folder: folder || "default_folder",
			resource_type: "video",
			unique_filename: true,
		};
		if (height) {
			options.height = height;
		}
		if (width) {
			options.width = width;
		}
		const result = await cloudinary.uploader.upload(filePath, options);
		return {
			url: result.secure_url,
			publicId: result.public_id,
		};
	} catch (error) {
		console.error("Error uploading video:", error);
	}
};

module.exports = uploadVideo;
