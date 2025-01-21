const multer = require("multer");
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "/tmp");
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

// Create the multer instance
const upload = multer({ storage: storage });

module.exports = upload;
