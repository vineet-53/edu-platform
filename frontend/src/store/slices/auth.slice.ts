import { createSlice } from "@reduxjs/toolkit";
import { getItemFromLocalStorage } from "../../utils/localStorage";

interface AuthState { 
	signupData : any, 
	token : string | null, 
	loading : boolean
}

const initialState : AuthState = {
	signupData: null,
	token: getItemFromLocalStorage("token"),
	loading: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setToken: (state, action) => {
			state.token = action.payload;
		},
		setSignupData: (state, action) => {
			state.signupData = action.payload;
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
	},
});

export const { setToken, setSignupData, setLoading } = authSlice.actions;
export default authSlice.reducer;
