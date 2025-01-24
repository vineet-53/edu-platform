const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
	try {
		let { name, description } = req.body;
		if (!name || !description) {
			throw "missing Properties";
		}
		let nameArr = name.split(" ");
		let newName = "";
		nameArr.forEach((word) => {
			newName += `${word[0].toUpperCase()}${word.slice(1)}`;
			if (word != nameArr[nameArr.length - 1]) {
				newName += " ";
			}
		});
		console.log("new name ", newName);
		const categoryDetails = await Category.create({
			name: newName,
			description,
		});

		return res.status(200).json({
			success: true,
			message: "created Category successfully",
			category: categoryDetails,
		});
	} catch (err) {
		return res.status(400).json({
			success: false,
			message: err.message,
		});
	}
};
exports.deleteCategory = async (req, res) => {
	try {
		const { categoryId: id } = req.query;
		if (!id) {
			throw "Missing Details";
		}
		const categoryDetails = await Category.findByIdAndDelete(
			{ _id: id },
			{ new: true }
		);

		return res.status(200).json({
			success: true,
			message: "Deleted Category",
			deleted: categoryDetails,
		});
	} catch (err) {
		return res.status(400).json({
			success: false,
			message: err.message,
		});
	}
};
exports.updateCategory = async (req, res) => {
	try {
		const { CategoryId, updateName, updateDesc } = req.body;

		if (!CategoryId) {
			throw "Category Not Found";
		}

		if (!updateName || !updateDesc) {
			throw "Missing Details";
		}

		const categoryDetails = await Category.findByIdAndUpdate(CategoryId, {
			$set: {
				name: updateName,
				description: updateDesc,
			},
		});

		if (!categoryDetails) {
			throw "Category Details Not Found";
		}

		return res.status(200).json({
			success: true,
			message: "Updated Category",
			category: categoryDetails,
		});
	} catch (err) {
		return res.status(400).json({
			success: false,
			message: err.message,
		});
	}
};
exports.showAllCategories = async (req, res) => {
	try {
		const categoryDetails = await Category.find({});

		return res.status(200).json({
			success: true,
			message: "Fetched Categtory",
			categories: categoryDetails,
		});
	} catch (err) {
		return res.status(401).json({
			success: false,
			message: err.message,
		});
	}
};
exports.getCategoryPageDetails = async (req, res) => {
	try {
		const { categoryId } = req.query;

		if (!categoryId) {
			throw new Error("Missing Details");
		}

		const category = await Category.findById(categoryId)
			.populate("courses")
			.exec();

		if (!category) {
			throw new Error("Category Not Found");
		}

		return res.status(200).json({
			success: true,
			message: "Fetched Category Courses",
			category,
			courses: category.courses,
		});
	} catch (err) {
		return res.status(401).json({
			success: false,
			message: err.message,
		});
	}
};
