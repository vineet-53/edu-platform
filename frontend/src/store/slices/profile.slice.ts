import { createSlice } from "@reduxjs/toolkit";
import { getItemFromLocalStorage } from "../../utils/localStorage";


const initialState = {
	user: getItemFromLocalStorage("user"),
	loading: false,
};

const profileSlice = createSlice({
	name: "profile",
	initialState: initialState,

	reducers: {
		setUser(state, value) {
			state.user = value.payload;
		},
		setLoading(state, value) {
			state.loading = value.payload;
		},
	},
});

export const { setUser, setLoading } = profileSlice.actions;
export default profileSlice.reducer;
