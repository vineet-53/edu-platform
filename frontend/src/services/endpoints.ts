const BASE_URL = `http://localhost:8000`;
const API_VERSION = `${BASE_URL}/api/v1`;

const AUTH_API = `${API_VERSION}/auth/`;
const COURSE_API = `${API_VERSION}/course/`;
const PROFILE_API = `${API_VERSION}/profile/`;
const ROOT_API = `${API_VERSION}`;

export const root = { 
	RESET_PASSWORD_TOKEN:{ 
        URL :  ROOT_API + "reset-password-token", 
        REQ : ""
    },
	RESET_PASSWORD:{ 
        URL :  ROOT_API + "update-password", 
        REQ : ""
    },
}

export const profile = {
	DELETE_ACCOUNT:{ 
        URL :  PROFILE_API + "deleteAccount", 
        REQ : "delete"
    },
	CHANGE_PASSWORD:{ 
        URL :  PROFILE_API + "changePassword", 
        REQ : "post"
    },
	UPDATE_PROFILE:{ 
        URL :  PROFILE_API + "updateProfile", 
        REQ : "put"
    },
	UPDATE_PROFILE_PICTURE:{ 
        URL :  PROFILE_API + "updateDisplayPicture", 
        REQ : "put"
    },
	RESET_PROFILE_PICTURE:{ 
        URL :  PROFILE_API + "resetProfilePicture", 
        REQ : "get"
    },
	GET_USER_DETAILS:{ 
        URL :  PROFILE_API + "getUserDetails", 
        REQ : "get"
    },
	GET_ENROLLED_COURSE:{ 
        URL :  PROFILE_API + "getEnrolledCourses", 
        REQ : "get"
    },
	GET_INSTRUCTOR_COURSE:{ 
        URL :  PROFILE_API + "getInstructorCourses", 
        REQ : "get"
    },
};


export const category = {
	CREATE_CATEGORY:{ 
        URL :  COURSE_API + "createCategory", 
        REQ : "post"
    },
	GET_ALL_CATEGORY:{ 
        URL :  COURSE_API + "showAllCategories", 
        REQ : "get"
    },
	GET_CATEGORY_PAGE_DETAILS:{ 
        URL :  COURSE_API + "getCategoryPageDetails", 
        REQ : "get"
    },
	};

export const course = {
	CREATE_COURSE:{ 
        URL :  COURSE_API + "createCourse", 
        REQ : "post"
    },
	EDIT_COURSE:{ 
        URL :  COURSE_API + "editCourse", 
        REQ : "put"
    },
	GET_ALL_COURSE:{ 
        URL :  COURSE_API + "getAllCourses", 
        REQ : "get"
    },
	GET_COURSE_DETAILS:{ 
        URL :  COURSE_API + "getCourseDetails", 
        REQ : "get"
    },
	GET_FULL_COURSE_DETAILS:{ 
        URL :  COURSE_API + "getFullCourseDetails", 
        REQ : "get"
    },
	DELETE_COURSE:{ 
        URL :  COURSE_API + "deleteCourse", 
        REQ : "delete"
    },
	GET_COURSE_PROGRESS:{ 
        URL :  COURSE_API + "progress", 
        REQ : "get"
    },
	UPDATE_COURSE_PROGRESS:{ 
        URL :  COURSE_API + "updateCourseProgress", 
        REQ : "post"
    },
};

export const section = {
	CREATE_SECTION:{ 
        URL :  COURSE_API + "addSection", 
        REQ : "post"
    },
	UPDATE_SECTION:{ 
        URL :  COURSE_API + "updateSection", 
        REQ : "post"
    },
	DELETE_SECTION:{ 
        URL :  COURSE_API + "deleteSection", 
        REQ : "post"
    },
};

export const subSection = {
	CREATE_SUB_SECTION:{ 
        URL :  COURSE_API + "addSubSection", 
        REQ : "post"
    },
	UPDATE_SUB_SECTION:{ 
        URL :  COURSE_API + "updateSubSection", 
        REQ : "post"
    },
	DELETE_SUB_SECTION:{ 
        URL :  COURSE_API + "deleteSubSection", 
        REQ : "post"
    },
};

export const auth = {
	REGISTER:{ 
        URL :  AUTH_API + "signup", 
        REQ : "post"
    },
	LOGIN:{ 
        URL :  AUTH_API + "login", 
        REQ : "post"
    },
	SEND_OTP:{ 
        URL :  AUTH_API + "sendOtp", 
        REQ : "post"
    },
	CHANGE_ACCOUNT_TYPE:{ 
        URL :  AUTH_API + "changeAccountType", 
        REQ : "post"
    },
};
