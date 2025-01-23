const AUTH_API = `auth/`;
const COURSE_API = `course/`;
const PROFILE_API = `profile/`;

export const root = {
	RESET_PASSWORD_TOKEN: {
		url: "reset-password-token",
		method: "post",
	},
	RESET_PASSWORD: {
		url: "update-password",
		method: "post",
	},
};

export const profile = {
	DELETE_ACCOUNT: {
		url: PROFILE_API + "deleteAccount",
		method: "delete",
	},
	CHANGE_PASSWORD: {
		url: PROFILE_API + "changePassword",
		method: "post",
	},
	UPDATE_PROFILE: {
		url: PROFILE_API + "updateProfile",
		method: "put",
	},
	UPDATE_PROFILE_PICTURE: {
		url: PROFILE_API + "updateDisplayPicture",
		method: "put",
	},
	RESET_PROFILE_PICTURE: {
		url: PROFILE_API + "resetProfilePicture",
		method: "get",
	},
	GET_USER_DETAILS: {
		url: PROFILE_API + "getUserDetails",
		method: "get",
	},
	GET_ENROLLED_COURSE: {
		url: PROFILE_API + "getEnrolledCourses",
		method: "get",
	},
	GET_INSTRUCTOR_COURSE: {
		url: PROFILE_API + "getInstructorCourses",
		method: "get",
	},
};

export const category = {
	CREATE_CATEGORY: {
		url: COURSE_API + "createCategory",
		method: "post",
	},
	GET_ALL_CATEGORY: {
		url: COURSE_API + "showAllCategories",
		method: "get",
	},
	GET_CATEGORY_PAGE_DETAILS: {
		url: COURSE_API + "getCategoryPageDetails",
		method: "get",
	},
};

export const course = {
	CREATE_COURSE: {
		url: COURSE_API + "createCourse",
		method: "post",
	},
	EDIT_COURSE: {
		url: COURSE_API + "editCourse",
		method: "put",
	},
	GET_ALL_COURSE: {
		url: COURSE_API + "getAllCourses",
		method: "get",
	},
	GET_COURSE_DETAILS: {
		url: COURSE_API + "getCourseDetails",
		method: "get",
	},
	GET_FULL_COURSE_DETAILS: {
		url: COURSE_API + "getFullCourseDetails",
		method: "get",
	},
	DELETE_COURSE: {
		url: COURSE_API + "deleteCourse",
		method: "delete",
	},
	GET_COURSE_PROGRESS: {
		url: COURSE_API + "progress",
		method: "get",
	},
	UPDATE_COURSE_PROGRESS: {
		url: COURSE_API + "updateCourseProgress",
		method: "post",
	},
};

export const section = {
	CREATE_SECTION: {
		url: COURSE_API + "addSection",
		method: "post",
	},
	UPDATE_SECTION: {
		url: COURSE_API + "updateSection",
		method: "post",
	},
	DELETE_SECTION: {
		url: COURSE_API + "deleteSection",
		method: "post",
	},
};

export const subSection = {
	CREATE_SUB_SECTION: {
		url: COURSE_API + "addSubSection",
		method: "post",
	},
	UPDATE_SUB_SECTION: {
		url: COURSE_API + "updateSubSection",
		method: "post",
	},
	DELETE_SUB_SECTION: {
		url: COURSE_API + "deleteSubSection",
		method: "post",
	},
};

export const auth = {
	REGISTER: {
		url: AUTH_API + "signup",
		method: "post",
	},
	LOGIN: {
		url: AUTH_API + "login",
		method: "post",
	},
	SEND_OTP: {
		url: AUTH_API + "sendOtp",
		method: "post",
	},
	CHANGE_ACCOUNT_TYPE: {
		url: AUTH_API + "changeAccountType",
		method: "post",
	},
};

export const rating = {
	GET_ALL_RATINGS: {
		url: COURSE_API + "getAllReviews",
		method: "get",
	},
};
