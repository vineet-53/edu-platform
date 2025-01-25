import { useAppSelector } from "../../../../hooks/store";
import DashboardContentContainer from "../../../common/DashboardContentContainer";
import Loader from "../../../common/Loader";
import UrlText from "../../../common/UrlText";
import CartComponent from "./CartComponent";

const Cart = () => {
	const { cart } = useAppSelector((state) => state.cart);
	if (!cart) return <Loader />;

	return (
		<DashboardContentContainer>
			<UrlText />
			<CartComponent />
		</DashboardContentContainer>
	);
};

export default Cart;
