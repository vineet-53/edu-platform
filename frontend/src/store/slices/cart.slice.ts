import { createSlice } from "@reduxjs/toolkit";
import { getItemFromLocalStorage } from "../../utils/localStorage";

interface InitalState  { 
	cart  : null | any[], 
	loading : boolean
}

const initialState : InitalState = {
	cart: getItemFromLocalStorage('cart'),
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
		addToCart (state , value) { 
			state.cart?.push(value.payload)
		}
	},
});

export const {addToCart , setCart, setLoading } = cartSlice.actions;
export default cartSlice.reducer;