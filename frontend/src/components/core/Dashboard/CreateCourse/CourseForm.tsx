import React, { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";

// Mock category data - in a real app, this would come from an API or props
const categories = [
  { id: 1, name: "Web Development" },
  { id: 2, name: "Mobile Development" },
  { id: 3, name: "Data Science" },
  { id: 4, name: "Cloud Computing" },
  { id: 5, name: "Artificial Intelligence" },
];

interface CourseFormData {
  courseName: string;
  courseDescription: string;
  whatYouWillLearn: string;
  price: string;
  tag: string[];
  categoryId: string;
  instructions: string[];
}

const CourseForm: React.FC = () => {
  const [formData, setFormData] = useState<CourseFormData>({
    courseName: "",
    courseDescription: "",
    whatYouWillLearn: "",
    price: "",
    tag: [],
    categoryId: "",
    instructions: [],
  });

  const [currentTag, setCurrentTag] = useState("");
  const [currentInstruction, setCurrentInstruction] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentTag.trim()) {
      e.preventDefault();
      if (!formData.tag.includes(currentTag.trim())) {
        setFormData((prev) => ({
          ...prev,
          tag: [...prev.tag, currentTag.trim()],
        }));
      }
      setCurrentTag("");
    }
  };

  const handleInstructionKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentInstruction.trim()) {
      e.preventDefault();
      if (!formData.instructions.includes(currentInstruction.trim())) {
        setFormData((prev) => ({
          ...prev,
          instructions: [...prev.instructions, currentInstruction.trim()],
        }));
      }
      setCurrentInstruction("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tag: prev.tag.filter((tag) => tag !== tagToRemove),
    }));
  };

  const removeInstruction = (instructionToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      instructions: prev.instructions.filter(
        (instruction) => instruction !== instructionToRemove,
      ),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-[#1A1A1A] rounded-xl shadow-xl"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Create New Course</h2>

      <div className="space-y-6">
        {/* Course Name */}
        <div>
          <label
            htmlFor="courseName"
            className="block text-sm font-medium text-gray-200 mb-2"
          >
            Course Name
          </label>
          <input
            type="text"
            id="courseName"
            name="courseName"
            value={formData.courseName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-[#242424] border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            required
          />
        </div>

        {/* Course Description */}
        <div>
          <label
            htmlFor="courseDescription"
            className="block text-sm font-medium text-gray-200 mb-2"
          >
            Course Description
          </label>
          <textarea
            id="courseDescription"
            name="courseDescription"
            value={formData.courseDescription}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-2 bg-[#242424] border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            required
          />
        </div>

        {/* What You Will Learn */}
        <div>
          <label
            htmlFor="whatYouWillLearn"
            className="block text-sm font-medium text-gray-200 mb-2"
          >
            What You Will Learn
          </label>
          <textarea
            id="whatYouWillLearn"
            name="whatYouWillLearn"
            value={formData.whatYouWillLearn}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-2 bg-[#242424] border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-200 mb-2"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            min="0"
            step="0.01"
            className="w-full px-4 py-2 bg-[#242424] border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="categoryId"
            className="block text-sm font-medium text-gray-200 mb-2"
          >
            Category
          </label>
          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-[#242424] border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tags */}
        <div>
          <label
            htmlFor="tag"
            className="block text-sm font-medium text-gray-200 mb-2"
          >
            Tags (Press Enter to add)
          </label>
          <input
            type="text"
            id="tag"
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
            onKeyDown={handleTagKeyDown}
            className="w-full px-4 py-2 bg-[#242424] border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            placeholder="Type and press Enter to add tags"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.tag.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-500/20 text-blue-400"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2 focus:outline-none"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div>
          <label
            htmlFor="instructions"
            className="block text-sm font-medium text-gray-200 mb-2"
          >
            Instructions (Press Enter to add)
          </label>
          <input
            type="text"
            id="instructions"
            value={currentInstruction}
            onChange={(e) => setCurrentInstruction(e.target.value)}
            onKeyDown={handleInstructionKeyDown}
            className="w-full px-4 py-2 bg-[#242424] border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            placeholder="Type and press Enter to add instructions"
          />
          <div className="space-y-2 mt-2">
            {formData.instructions.map((instruction, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50"
              >
                <span className="text-gray-300">{instruction}</span>
                <button
                  type="button"
                  onClick={() => removeInstruction(instruction)}
                  className="text-gray-400 hover:text-red-400 focus:outline-none"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          Create Course
        </button>
      </div>
    </form>
  );
};

export default CourseForm;
