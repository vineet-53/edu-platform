import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	signupData: null,
	token: localStorage.getItem('token') || null,
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
