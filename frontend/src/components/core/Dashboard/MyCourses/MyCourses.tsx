import DashboardContentContainer from "../../../common/DashboardContentContainer";
import UrlText from "../../../common/UrlText";
import PageHeadingTitlte from "../PageHeadingTitlte";
import CourseCard from "./CourseCard";
import MyCourseContent from "./MyCourseContent";

const MyCourses = () => {
  return (
    <DashboardContentContainer>
      <UrlText />
      <PageHeadingTitlte />
      <MyCourseContent />
    </DashboardContentContainer>
  );
};

export default MyCourses;
