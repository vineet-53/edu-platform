import UrlText from "../../../common/UrlText";
import DashboardContentContainer from "../../../common/DashboardContentContainer";
import ProfileComponent from "./ProfileComponent";
import { useAppDispatch, useAppSelector } from "../../../../hooks/store";
import { ProfileEditForm } from "./ProfileEditForm";
import { setEdit } from "../../../../store/slices/profile.slice";

const Profile = () => {
	const { edit } = useAppSelector((state) => state.profile);
	const dispatch = useAppDispatch();
	return (
		<DashboardContentContainer styles="">
			{edit ? (
				<div
					onClick={() => {
						dispatch(setEdit(false));
					}}
					className="cursor-pointer text-richblack-200"
				>
					{"< Back"}
				</div>
			) : (
				<UrlText />
			)}
			{edit ? <ProfileEditForm></ProfileEditForm> : <ProfileComponent />}
		</DashboardContentContainer>
	);
};

export default Profile;
