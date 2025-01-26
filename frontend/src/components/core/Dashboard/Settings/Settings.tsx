import PageHeadingTitlte from "../PageHeadingTitlte";
import DashboardContentContainer from "../../../common/DashboardContentContainer";
import UrlText from "../../../common/UrlText";
import { ProfileEditForm } from "../Profile/ProfileEditForm";
import { FaTrash } from "react-icons/fa";
import { useRef, useState } from "react";
import { useAppDispatch } from "../../../../hooks/store";
import { deleteAccount } from "../../../../services/operations/profileAPI";
import { useNavigate } from "react-router-dom";

const Settings = () => {
	const [showDeleteAccount, setShowDeleteAccount] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const deleteInputRef = useRef(null);
	const navigate = useNavigate();
	const handleDeleteAccount = () => {
		if (deleteInputRef.current?.value !== "delete account") {
			return;
		}
		dispatch(deleteAccount(navigate));
	};
	return (
		<DashboardContentContainer>
			<UrlText />
			<PageHeadingTitlte />
			{/* <ProfilePictureEdit />  */}
			<ProfileEditForm />
			<div className="max-sm:max-w-max-content-mobile lg:max-w-max-content md:max-w-max-content-tab  rounded-md border-[1px]">
				<div className="max-md:my-3 md:my-10 flex gap-6 rounded-md border-[1px] bg-pink-700   border-pink-500 max-md:p-3 max-md:px-5 md:p-8 md:px-8 mx-8">
					<div className="flex max-sm:hidden justify-center items-center w-20 h-20 rounded-full bg-pink-500">
						<FaTrash className="fill-pink-200" size={40} />
					</div>
					<div className="text-pure-greys-300 flex flex-col items-start gap-3">
						<h3 className="text-white">Delete Account</h3>
						<p>Would you like to delete account ? </p>
						<p>
							This would contain paid courses. Deleting account will remove all
							the courses contain with it.
						</p>
						<button
							onClick={() => {
								setShowDeleteAccount(true);
							}}
							className="text-pink-500 cursor-pointer"
						>
							I want to delete by account
						</button>
						{showDeleteAccount && (
							<div className="flex gap-3">
								<input
									ref={deleteInputRef}
									type="text"
									className="border-[1px] border-white  rounded-md p-3"
									placeholder="type delete account"
								/>
								<button
									className="cursor-pointer text-white p-3 bg-pink-400 rounded-md"
									onClick={() => {
										handleDeleteAccount();
										setShowDeleteAccount(false);
									}}
								>
									delete
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</DashboardContentContainer>
	);
};

export default Settings;
