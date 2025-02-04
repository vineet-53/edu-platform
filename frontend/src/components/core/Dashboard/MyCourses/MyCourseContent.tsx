import { useEffect, useState } from "react";
import { apiConnector } from "../../../../services/apiconnector";
import { profile } from "../../../../services/endpoints";
import { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import Loader from "../../../common/Loader";
import { useAppDispatch } from "../../../../hooks/store";
import { setEditCourse } from "../../../../store/slices/course.slice";
import CourseCard from "./CourseCard";

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
    <div className="flex flex-wrap gap-3 overflow-hidden rounded-2xl max-sm:max-w-max-content-mobile min-sm:max-w-max-content-mobile lg:max-w-max-content">
      {instructorCourses?.map((course: any) => {
        return (
          <>
            <CourseCard
              id={course?._id}
              courseName={course?.courseName}
              courseDescription={course?.courseDescription}
              price={course?.price}
              thumbnailImage={course?.thumbnailImage}
              status={course?.status || "draft"}
              onEdit={handleEditCourse}
              onDelete={(courseId: string) => {
                handleDeleteCourse(courseId);
              }}
            />
          </>
        );
      })}
    </div>
  );
};

export default MyCourseContent;
