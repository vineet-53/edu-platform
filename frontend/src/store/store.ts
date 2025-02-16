import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import courseReducer from "./slices/course.slice";
import profileReducer from "./slices/profile.slice";
import cartReducer from "./slices/cart.slice";

const rootReducer = combineReducers({
	auth: authReducer,
	course: courseReducer,
	profile: profileReducer,
	cart : cartReducer
});

const store = configureStore({
	reducer: rootReducer,
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;
