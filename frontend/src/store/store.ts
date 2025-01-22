import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import courseReducer from "./slices/course.slice";
import profileReducer from "./slices/profile.slice";

const rootReducer = combineReducers({
	auth: authReducer,
	course: courseReducer,
	profile: profileReducer,
});

const store = configureStore({
	reducer: rootReducer,
});

export default store;
