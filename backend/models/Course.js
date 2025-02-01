const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const courseSchema = new Schema({
  courseName: {
    type: String,
    required: true,
  },

  courseDescription: {
    type: String,
    required: true,
  },

  instructor: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  whatYouWillLearn: {
    type: String,
  },

  sections: [
    {
      type: Schema.Types.ObjectId,
      ref: "Section",
    },
  ],

  ratingAndReviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "RatingAndReview",
    },
  ],

  price: {
    type: String,
    required: true,
  },

  thumbnailImage: {
    // path of image in the string format
    type: String,
    required: true,
  },

  thumbnailPublicId: {
    type: String,
  },

  tag: {
    type: [String],
    required: true,
  },

  studentEnrolled: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  courseDuration: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  instructions: {
    type: [String],
    required: true,
  },
  status: {
    type: String,
    enum: ["published", "draft"],
  },
});

module.exports = mongoose.model("Course", courseSchema);
