import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/store";
import DashboardContentContainer from "../../../common/DashboardContentContainer";
import UrlText from "../../../common/UrlText";
import CartComponent from "./CartComponent";
import { cart as CART } from "../../../../services/endpoints";
import { apiConnector } from "../../../../services/apiconnector";
import { setCart } from "../../../../store/slices/cart.slice";
import { setItemToLocalStorage } from "../../../../utils/localStorage";

const Cart = () => {
	const { cart } = useAppSelector((state) => state.cart);
	const dispatch = useAppDispatch();
	useEffect(() => {
		(async () => {
			try {
				const response = await apiConnector(
					CART.GET_CART_DETAILS.method,
					CART.GET_CART_DETAILS.url
				);
				console.log(response.data);
				if (!response.data.success) {
					throw response.data;
				}
				dispatch(setCart(response.data.cart));
				setItemToLocalStorage("cart", response.data.cart);
			} catch (err: any) {
				console.error("Error Fetching Cart Details");
			}
		})();
	}, []);
	if (!cart)
		return (
			<DashboardContentContainer>
				<div className="text-3xl text-white ">Cart Empty</div>
			</DashboardContentContainer>
		);
	return (
		<DashboardContentContainer>
			<UrlText />
			<CartComponent />
		</DashboardContentContainer>
	);
};

export default Cart;
