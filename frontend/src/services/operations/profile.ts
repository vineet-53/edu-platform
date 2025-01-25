import { AxiosResponse } from "axios";
import { setCart } from "../../store/slices/cart.slice";
import { setUser } from "../../store/slices/profile.slice";
import { AppDispatch } from "../../store/store";
import { apiConnector } from "../apiconnector";
import { profile } from "../endpoints";
import { setItemToLocalStorage } from "../../utils/localStorage";

export function getUserProfile() {
	return async (dispatch: AppDispatch) => {
		try {
			const response: AxiosResponse = await apiConnector(
				profile.GET_USER_DETAILS.method,
				profile.GET_USER_DETAILS.url
			);
			dispatch(setUser(response.data.user));
			dispatch(setCart(response.data.cart.cart));
			setItemToLocalStorage("user", response.data.user);
		} catch (err: any) {
			console.log(err);
		}
	};
}

export function updateProfile(data : any) {
	return async () => {
		try {
		} catch (err: any) {
			console.error(err);
		}
	};
}
