//packages
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv");

// file imports
const rootRoutes = require("./routes/root.route.js");
const authRoutes = require("./routes/auth.route.js");
const courseRoutes = require("./routes/course.route.js");
const profileRoutes = require("./routes/profile.route.js");
const cloudinary = require("./configs/cloudinary.js");
const db = require("./configs/db");

const app = express();
const PORT = process.env.PORT || 8000;

// middlewares
app.use(cookieParser());
app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);

// routes
app.use("/api/v1", rootRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/profile", profileRoutes);

app.get("/", (req, res) => {
	res.json("STUDY NOTION - server is running");
});
try {
	cloudinary.connect();
	db.connect();
} catch (err) {
	console.log(err);
	console.error("Error Connecting Cloudinary or DB");
}
app.listen(PORT, (err) => {
	if (!err) console.log("Server is running on port ", PORT);
});
