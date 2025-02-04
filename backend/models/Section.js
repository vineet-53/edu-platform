const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const subSectionSchema = new Schema({
	title: {
		type: String,
		required: true,
	},

	timeDuration: {
		type: String,
		required: true,
	},

	description: {
		type: String,
		required: true,
	},

	videoUrl: {
		type: String,
		required: true,
	},
	videoUrlPublicId: {
		type: String,
	},
	additionalUrl: {
		type: String,
	},
});
const sectionSchema = new Schema(
	{
		sectionName: {
			type: String,
			required: true,
		},
		subSection: [
			{
				type: Schema.Types.ObjectId,
				ref: "SubSection",
			},
		],
	},
	{ timestamps: true }
);

const SubSection = mongoose.model("SubSection", subSectionSchema);
const Section = mongoose.model("Section", sectionSchema);
module.exports = {
	SubSection,
	Section,
};
