import { useEffect, useState } from "react";
import { FaCheckCircle, FaEdit, FaTrash } from "react-icons/fa";
import { apiConnector } from "../../../../services/apiconnector";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { profile } from "../../../../services/endpoints";
import { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import Loader from "../../../common/Loader";
import { nanoid } from "@reduxjs/toolkit";
import { calcTimeDuration } from "../EnrolledCourses/EnrolledCourseCard";
import IconBtn from "../../../common/IconBtn";
import { formatDate } from "../../../../utils/formatDate";
import { useAppDispatch, useAppSelector } from "../../../../hooks/store";
import { setEditCourse } from "../../../../store/slices/course.slice";

const MyCourseContent = () => {
  const [loading, setLoading] = useState(false);
  const [instructorCourses, setInstructorCourses] = useState([]);
  const dispatch = useAppDispatch();
  const handleDeleteCourse = (courseId: string) => {
    console.log("Delete this course", courseId);
  };
  const handleEditCourse = () => {
    dispatch(setEditCourse(true));
  };

  const getInstructorCourse = async () => {
    try {
      const response: AxiosResponse = await apiConnector(
        profile.GET_INSTRUCTOR_COURSE.method,
        profile.GET_INSTRUCTOR_COURSE.url,
      );
      console.log(response.data);
      toast.success(response.data.message);
      return response.data.courses;
    } catch (err: any) {
      console.error(err?.message || err);
      toast.error("Error Getting Course");
    }
    return [];
  };
  useEffect(() => {
    (async () => {
      setLoading(true);
      setInstructorCourses(await getInstructorCourse());
      setLoading(false);
    })();
  }, []);
  if (loading) {
    return <Loader />;
  }
  if (instructorCourses.length == 0) {
    return <div className="text-3xl text-pure-greys-200 ">No Course Found</div>;
  }
  return (
    <div className="flex flex-col gap-3 overflow-hidden rounded-2xl max-sm:max-w-max-content-mobile min-sm:max-w-max-content-mobile lg:max-w-max-content">
      {instructorCourses?.map((course: any) => {
        return (
          <div
            key={nanoid()}
            className="py-2 gap-2 items-center flex flex-col lg:flex-row"
          >
            <div className="flex-[.3] aspect-ratio:4/3">
              <img
                src={course?.thumbnailImage}
                alt={course?.courseName + "-image"}
              />
            </div>
            <div className="flex gap-2 flex-[.5] flex-col text-richblack-200">
              <h3 className="font-bold text-white text-xl">
                {course?.courseName}
              </h3>
              <p>{course?.courseDescription}</p>
              <span>
                Created At: {formatDate(course?.createdAt?.split("T")[0])}
              </span>

              <div className="flex gap-3 items-center">
                <span
                  className={`${
                    course?.status == "published"
                      ? "text-yellow-200 "
                      : "text-pink-100"
                  } w-fit bg-richblack-600 p-2 px-3 rounded-xl`}
                >
                  {course?.status == "published" ? (
                    <span className="flex gap-x-2  items-center ">
                      <FaCheckCircle />
                      published
                    </span>
                  ) : (
                    <span className="flex gap-x-2 items-center">
                      <MdOutlineAccessTimeFilled></MdOutlineAccessTimeFilled>
                      drafted
                    </span>
                  )}
                </span>
                <div className="text-yellow-100">${course?.price}</div>
              </div>
            </div>
            <div
              className={
                "flex-[.2] gap-4 flex sm:items-center sm:justify-center"
              }
            >
              <IconBtn
                onclick={handleEditCourse}
                customClasses="px-3 py-1 max-sm:w-full max-sm:text-center"
              >
                <FaEdit />
                Edit
              </IconBtn>
              <button
                onClick={() => handleDeleteCourse(course._id)}
                className="px-3 py-1 rounded-md flex items-center gap-3 hover:bg-pink-400  max-sm:w-full text-white cursor-pointer max-sm:text-center bg-pink-100"
              >
                <FaTrash />
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyCourseContent;
