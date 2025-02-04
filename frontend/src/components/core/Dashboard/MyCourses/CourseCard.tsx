import { Pencil, Trash2, FileWarning, CheckCircle2 } from "lucide-react";

interface CourseCardProps {
  id: string;
  courseName: string;
  courseDescription: string;
  price: string;
  thumbnailImage: string;
  status: string;
  onEdit: () => void;
  onDelete: (courseId: string) => void;
}

const CourseCard = ({
  id,
  courseName,
  courseDescription,
  price,
  thumbnailImage,
  status,
  onEdit,
  onDelete,
}: CourseCardProps) => {
  return (
    <div className="group overflow-hidden rounded-lg border border-[#2C2C2C] bg-[#1C1C1C] text-white transition-all duration-300 hover:border-[#3C3C3C]">
      <div className="relative">
        {/* Course Image */}
        <img
          src={thumbnailImage}
          alt={courseName}
          className="h-48 w-full object-cover"
        />
      </div>

      <div className="p-6">
        {/* Course Title */}
        <h3 className="mb-2 truncate text-xl font-semibold">{courseName}</h3>

        {/* Course Description */}
        <p className="mb-4 line-clamp-2 text-sm text-gray-400">
          {courseDescription}
        </p>

        {/* Status Badge */}
        <div className="mb-4">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium ${
              status === "Draft"
                ? "rounded-md bg-red-500/10 text-red-400"
                : "rounded-md bg-yellow-300/10 text-yellow-300"
            }`}
          >
            {status === "Draft" ? (
              <FileWarning className="h-3.5 w-3.5" />
            ) : (
              <CheckCircle2 className="h-3.5 w-3.5" />
            )}
            {status}
          </span>
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-white">
            {price === "0" ? "Free" : `$${price}`}
          </p>
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2C2C2C] text-white transition-colors hover:bg-[#3C3C3C]"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(id)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2C2C2C] text-red-400 transition-colors hover:bg-[#3C3C3C]"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
