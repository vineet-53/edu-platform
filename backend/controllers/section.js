const Course = require("../models/Course");
const { Section, SubSection } = require("../models/Section");
const { destroyVideoFromCloudinary } = require("../utilities/videoDestroyer");
const { uploadToCloudinary } = require("../utilities/imageUploader");
const uploadVideo = require("../utilities/videoUploader");

exports.addSection = async (req, res) => {
	try {
		const { sectionName, courseId } = req.body;

		if (!sectionName || !courseId) {
			throw new Error("Missing Details");
		}

		let section = await Section.create({ sectionName });

		let course = await Course.findById(courseId);

		if (!course) {
			throw new Error("Course Not Found");
		}
		// update details of course
		course.sections.push(section._id);
		course = await course.save({ new: true });
		return res.status(200).json({
			success: true,
			message: "Section Created",
			section,
		});
	} catch (err) {
		return res.status(400).json({
			success: false,
			message: err.message,
		});
	}
};

exports.updateSection = async (req, res) => {
	try {
		const { sectionName, sectionId } = req.body;
		if (!sectionName || !sectionId) {
			throw "missing properties";
		}
		const section = await Section.findById(sectionId);
		if (!section) {
			throw new Error("section not found");
		}
		section.sectionName = sectionName;
		const updatedSection = await section.save();
		return res.status(200).json({
			success: true,
			message: "Successfully updated section",
			section: updatedSection,
		});
	} catch (err) {
		return res.status(400).json({
			success: false,
			message: err.message,
		});
	}
};

exports.deleteSection = async (req, res) => {
	try {
		const { sectionId, courseId } = req.body;
		if (!sectionId || !courseId) {
			throw new Error("Missing Details");
		}
		const section = await Section.findByIdAndDelete(sectionId);

		let course = await Course.findById(courseId);

		if (!course) {
			throw new Error("Course Not Found");
		}
		course.sections = course.sections.filter(
			(id) => id.toString() !== sectionId
		);
		const updatedCourse = await course.save();
		return res.status(200).json({
			success: true,
			message: "Successfully deleted section",
		});
	} catch (err) {
		return res.status(400).json({
			success: false,
			message: err.message,
		});
	}
};
exports.addSubSection = async (req, res) => {
	try {
		const { title, description, timeDuration, sectionId } = req.body;

		if (!title || !timeDuration || !description || !sectionId) {
			throw new Error("Missing Details");
		}

		const sectionDetails = await Section.findById(sectionId);
		let subSection = await SubSection.findOne({ title, description });

		if (subSection && sectionDetails.subSection.includes(subSection._id)) {
			throw new Error("Sub Section Existed");
		}

		// get video from req.body and upload to cloudinary
		let videoFile = req.file;

		//create subsection
		let { url, publicId } = await uploadVideo(
			videoFile.path,
			process.env.CLOUD_FOLDER
		);
		videoFileCloudURL = url;

		const subSectionDetails = await SubSection.create({
			title,
			timeDuration,
			timeDuration,
			description,
			videoUrl: videoFileCloudURL,
			videoUrlPublicId: publicId,
		});

		// update to section
		sectionDetails.subSection.push(subSectionDetails._id);
		await sectionDetails.save();
		return res.status(200).json({
			success: true,
			message: "added sub section successfully",
			sectionDetails,
			subSectionDetails,
		});
	} catch (err) {
		return res.status(400).json({
			success: false,
			message: err.message,
		});
	}
};

exports.updateSubSection = async (req, res) => {
	try {
		const { title, timeDuration, description, subSectionId } = req.body;

		if (!title || !timeDuration || !description || !subSectionId) {
			throw new Error("Missing Details");
		}

		const subSectionDetails = await SubSection.findById(subSectionId);

		if (!subSectionDetails) {
			throw new Error(" sub section not found ");
		}

		let videoFile = req.file;

		if (videoFile) {
			// destroy the previous video
			await destroyFromCloudinary(subSectionDetails.videoUrl);
			const videoFileCloudURL = await uploadVideo(
				videoFile.path,
				process.env.CLOUD_FOLDER
			);
			subSectionDetails.videoUrl = videoFileCloudURL;
		}

		if (title) {
			subSectionDetails.title = title;
		}
		if (timeDuration) {
			subSectionDetails.timeDuration = timeDuration;
		}
		if (description) {
			subSectionDetails.description = description;
		}
		const updatedSubSection = await subSectionDetails.save();

		return res.status(200).json({
			success: true,
			message: "Updated Sub Section",
			subSection: updatedSubSection,
		});
	} catch (err) {
		return res.status(400).json({
			success: false,
			message: err.message,
		});
	}
};

exports.deleteSubSection = async (req, res) => {
	try {
		const { sectionId, subSectionId } = req.body;

		if (!sectionId || !subSectionId) {
			throw new Error("Missing Details");
		}

		const sectionDetails = await Section.findById(sectionId);

		const subSectionDetails = await SubSection.findByIdAndDelete(subSectionId);

		if (!sectionDetails) {
			throw new Error("Section Not Found");
		}

		if (!subSectionDetails) {
			throw new Error("Sub Section Not Found");
		}

		sectionDetails.subSection = sectionDetails.subSection.filter(
			(id) => id.toString() !== subSectionId
		);

		await destroyVideoFromCloudinary(subSectionDetails.videoUrlPublicId)
			.then((result) => console.log("check"))
			.catch((err) => {
				console.log("error ", err);
			});
		const updatedSection = await sectionDetails.save();

		return res.status(200).json({
			success: true,
			message: "Deleted SubSection",
			sectoin: updatedSection,
		});
	} catch (err) {
		return res.status(400).json({
			success: false,
			message: err.message,
		});
	}
};

exports.showAllSections = async (req, res) => {
	try {
		const sectionDetails = await Section.find({}, { name: true })
			.populate("subSection")
			.exec();
		return res.status(200).json({
			success: true,
			message: "fetched all section successfully",
			sectionDetails,
		});
	} catch (err) {
		return res.status(400).json({
			success: false,
			message: err.message,
		});
	}
};
exports.showAllSubSections = async (req, res) => {
	try {
		const subSectionDetails = await Section.find(
			{},
			{
				title: true,
				timeDuration: true,
				description: true,
				videoUrl: true,
			}
		);
		return res.status(200).json({
			success: true,
			message: "fetched all sub section successfully",
			subSectionDetails,
		});
	} catch (err) {
		return res.status(400).json({
			success: false,
			message: err.message,
		});
	}
};
