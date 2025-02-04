const mongoose = require("mongoose");
require("dotenv").config();
exports.connect = () => {
	// Connect to MongoDB using Mongoose.
	try {
		mongoose.connect(process.env.DB_URL);
		console.log("db connected successfully");
	} catch (err) {
		console.log("error in mongoose connection to db");
	}
};
