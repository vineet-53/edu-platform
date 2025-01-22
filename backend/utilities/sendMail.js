const nodemailer = require("nodemailer");
exports.sendMail = async (email, subject, html) => {
	try {
		const transporter = nodemailer.createTransport({
			service: "gmail",
			host: process.env.MAIL_HOST,
			auth: {
				user: process.env.MAIL_USER, // Your Gmail email address
				pass: process.env.MAIL_PASS, // Your Gmail app password (generate one if 2-Step Verification is enabled)
			},
		});
		const info = await transporter.sendMail({
			from: `Edusync : -`,
			to: `${email}`,
			subject: `${subject}`,
			html: `${html}`,
		});
		return info;
	} catch (err) {
		console.log("**********Error sending mail to the Client***********");
		console.error(err);
	}
};
