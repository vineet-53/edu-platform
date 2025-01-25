import { createSlice } from "@reduxjs/toolkit";

interface InitalState  { 
	cart  : null | [], 
	loading : boolean
}

const initialState : InitalState = {
	cart: null ,
	loading: false,
};

const cartSlice = createSlice({
	name: "cart",
	initialState: initialState,

	reducers: {
		setCart(state, value) {
			state.cart = value.payload;
		},
		setLoading(state, value) {
			state.loading = value.payload;
		},
	},
});

export const { setCart, setLoading } = cartSlice.actions;
export default cartSlice.reducer;