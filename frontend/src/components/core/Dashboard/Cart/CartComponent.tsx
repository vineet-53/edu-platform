import { useAppSelector } from "../../../../hooks/store";
import IconBtn from "../../../common/IconBtn";
import PageHeadingTitlte from "../PageHeadingTitlte";
import CartItem from "./CartItem";

const getCartTotal = (cart: [] | null) => {
	if (!cart) {
		return;
	}
	return cart.reduce(
		(total, currentCourse: { price: string }) =>
			total + parseInt(currentCourse.price),
		0
	);
};

const CartComponent = () => {
	const { cart } = useAppSelector((state) => state.cart);
	const total = getCartTotal(cart);
	console.log(total);
	return (
		<div className="flex flex-col gap-6">
			<PageHeadingTitlte />
			<div className="flex flex-col gap-3 text-richblack-500">
				<p>{cart?.length} Courses in Wishlist</p>
				<div className="border-b-2 w-[90%]  border-b-richblack-700"></div>

				<div className="flex gap-5 max-lg:flex-col ">
					<div className="">
						{cart?.map((item, index: number) => {
							return (
								<CartItem
									isLast={index == cart.length - 1 ? true : false}
									item={item}
									key={index}
								/>
							);
						})}
					</div>

					<div className="flex flex-col gap-3 w-3xs h-fit bg-richblue-800 rounded-md p-6">
						<div className="flex flex-col gap-2">
							<span>Total:</span>
							<span className="text-xl text-yellow-200">Rs.{total}</span>
						</div>
						<IconBtn>Buy Now</IconBtn>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartComponent;
