const AUTH_API = `auth/`;
const COURSE_API = `course/`;
const PROFILE_API = `profile/`;

export const root = {
	RESET_PASSWORD_TOKEN: {
		url: "reset-password-token",
		method: "POST",
	},
	RESET_PASSWORD: {
		url: "update-password",
		method: "POST",
	},
};

export const profile = {
	DELETE_ACCOUNT: {
		url: PROFILE_API + "deleteAccount",
		method: "DELETE",
	},
	CHANGE_PASSWORD: {
		url: PROFILE_API + "changePassword",
		method: "POST",
	},
	UPDATE_PROFILE: {
		url: PROFILE_API + "updateProfile",
		method: "PUT",
	},
	UPDATE_PROFILE_PICTURE: {
		url: PROFILE_API + "updateDisplayPicture",
		method: "PUT",
	},
	RESET_PROFILE_PICTURE: {
		url: PROFILE_API + "resetProfilePicture",
		method: "GET",
	},
	GET_USER_DETAILS: {
		url: PROFILE_API + "getUserDetails",
		method: "GET",
	},
	GET_ENROLLED_COURSE: {
		url: PROFILE_API + "getEnrolledCourses",
		method: "GET",
	},
	GET_INSTRUCTOR_COURSE: {
		url: PROFILE_API + "getInstructorCourses",
		method: "GET",

	},

};

export const category = {
	CREATE_CATEGORY: {
		url: COURSE_API + "createCategory",
		method: "POST",
	},
	GET_ALL_CATEGORY: {
		url: COURSE_API + "showAllCategories",
		method: "GET",
	},
	GET_CATEGORY_PAGE_DETAILS: {
		url: COURSE_API + "getCategoryPageDetails",
		method: "GET",
	},
};

export const course = {

	FIND_COURSES : { 
		url : COURSE_API + "findCourses",  
		method : "GET", 
	},
	CREATE_COURSE: {
		url: COURSE_API + "createCourse",
		method: "POST",
	},
	EDIT_COURSE: {
		url: COURSE_API + "editCourse",
		method: "put",
	},
	GET_ALL_COURSE: {
		url: COURSE_API + "getAllCourses",
		method: "GET",
	},
	GET_COURSE_DETAILS: {
		url: COURSE_API + "getCourseDetails",
		method: "GET",
	},
	GET_FULL_COURSE_DETAILS: {
		url: COURSE_API + "getFullCourseDetails",
		method: "GET",
	},
	DELETE_COURSE: {
		url: COURSE_API + "deleteCourse",
		method: "delete",
	},
	GET_COURSE_PROGRESS: {
		url: COURSE_API + "progress",
		method: "GET",
	},
	UPDATE_COURSE_PROGRESS: {
		url: COURSE_API + "updateCourseProgress",
		method: "POST",
	},
};

export const section = {
	CREATE_SECTION: {
		url: COURSE_API + "addSection",
		method: "POST",
	},
	UPDATE_SECTION: {
		url: COURSE_API + "updateSection",
		method: "POST",
	},
	DELETE_SECTION: {
		url: COURSE_API + "deleteSection",
		method: "POST",
	},
};

export const subSection = {
	CREATE_SUB_SECTION: {
		url: COURSE_API + "addSubSection",
		method: "POST",
	},
	UPDATE_SUB_SECTION: {
		url: COURSE_API + "updateSubSection",
		method: "POST",
	},
	DELETE_SUB_SECTION: {
		url: COURSE_API + "deleteSubSection",
		method: "POST",
	},
};

export const auth = {
	REGISTER: {
		url: AUTH_API + "signup",
		method: "POST",
	},
	LOGIN: {
		url: AUTH_API + "login",
		method: "POST",
	},
	SEND_OTP: {
		url: AUTH_API + "sendOtp",
		method: "POST",
	},
	CHANGE_ACCOUNT_TYPE: {
		url: AUTH_API + "changeAccountType",
		method: "POST",
	},
};

export const rating = {
	GET_ALL_RATINGS: {
		url: COURSE_API + "getAllReviews",
		method: "GET",
	},
};
