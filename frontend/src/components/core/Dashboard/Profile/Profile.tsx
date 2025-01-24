import React from "react";
import UrlText from "../../../common/UrlText";
import DashboardContentContainer from "../../../common/DashboardContentContainer";
import ProfileComponent from "./ProfileComponent";

const Profile = () => {
	return (
		<DashboardContentContainer styles="">
			<UrlText />
			<ProfileComponent />
		</DashboardContentContainer>
	);
};

export default Profile;
