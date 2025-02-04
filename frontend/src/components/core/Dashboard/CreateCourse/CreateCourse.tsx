import DashboardContentContainer from "../../../common/DashboardContentContainer";
import UrlText from "../../../common/UrlText";
import PageHeadingTitlte from "../PageHeadingTitlte";
import CourseForm from "./CourseForm";

const CreateCourse = () => {
  return (
    <>
      <DashboardContentContainer>
        <UrlText />
        <PageHeadingTitlte />
        <CourseForm />
      </DashboardContentContainer>
    </>
  );
};

export default CreateCourse;
