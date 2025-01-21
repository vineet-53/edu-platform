const Contact = require("../models/Contact");
require("dotenv").config();
exports.contactUs = async (req, res) => {
	try {
		let {
			firstName,
			lastName,
			phoneNumber,
			email,
			message,
			countryCode = "+91",
		} = req.body;

		firstName = firstName.replace("/s/", "");
		lastName = lastName.replace("/s/", "");

		if (!firstName || !email || !phoneNumber || !message) {
			throw new Error("Missing Details");
		}

		if (message.length > 500) {
			throw new Error("Could Not Accept Large Message");
		}

		const contactDetails = await Contact.create({
			name: firstName + " " + lastName,
			email,
			phoneNumber: countryCode + " " + phoneNumber,
			message,
		});

		await contactDetails.save();

		return res.status(200).json({
			success: true,
			message: "Message Sent Successfully",
			contactDetails,
		});
	} catch (err) {
		return res.status(401).json({
			success: false,
			message: err.message,
		});
	}
};
