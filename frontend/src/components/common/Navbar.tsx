import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { Link, matchPath, useLocation } from "react-router-dom";
import Logo from "../../assets/Logo/Logo-Full-Dark.png";
import { NavbarLinks } from "../../constants/NavbarLinks";
import { useAppSelector } from "../../hooks/store";
import { ACCOUNT_TYPE } from "../../constants/AccountTypes";
import ProfileDropdown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { category } from "../../services/endpoints";
import { AxiosResponse } from "axios";

function Navbar() {
	const user = useAppSelector((state) => state.profile.user);
	const location = useLocation();

	const [subLinks, setSubLinks] = useState<[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [totalItems, setTotalItems] = useState<number>(0);

	function matchRoute(route: string) {
		return matchPath({ path: route }, location.pathname);
	}

	useEffect(() => {
		(async () => {
			try {
				const response: AxiosResponse = await apiConnector(
					category.GET_ALL_CATEGORY.method,
					category.GET_ALL_CATEGORY.url
				);
				if (!response.data.success) {
					throw response.data;
				}
				console.log(response.data.categories);
				setSubLinks(response.data.categories);
			} catch (error: any) {
				console.error(error.message);
			}
		})();
	}, []);

	return (
		<div
			className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
				location.pathname !== "/" ? "bg-richblack-800" : ""
			} transition-all duration-200`}
		>
			<div className="flex w-11/12 max-w-maxContent items-center justify-between">
				<Link to="/">
					{" "}
					<img
						src={Logo}
						alt="Logo"
						width={160}
						height={32}
						loading="lazy"
						className=""
						style={{ filter: "invert(0.30)" }}
					/>{" "}
				</Link>{" "}
				{/* Logo */}
				<nav className="hidden md:block">
					{" "}
					{/* Navigation links */}
					<ul className="flex gap-x-6 text-richblack-25">
						{NavbarLinks.map(
							(link: { title: string; path: string }, index: number) => (
								<li key={index}>
									{link.title === "Catalog" ? (
										<>
											<div
												className={`group relative flex cursor-pointer items-center gap-1 ${
													matchRoute("/catalog/:catalogName")
														? "text-yellow-25"
														: "text-richblack-25"
												}`}
											>
												<p> {link.title} </p> <BsChevronDown />{" "}
												{/*   "Catalog \/"   */}
												<div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
													<div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
													{loading ? (
														<p className="text-center"> Loading... </p>
													) : subLinks?.length ? (
														<>
															{subLinks
																?.filter(
																	(subLink: { courses: [] }) =>
																		subLink?.courses?.length > 0
																)
																?.map(
																	(
																		subLink: { name: string; _id: string },
																		i
																	) => (
																		<Link
																			to={`/course/getCategoryPageDetails?categoryId=${subLink._id}`}
																			className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
																			key={i}
																		>
																			<p>{subLink.name}</p>
																		</Link>
																	)
																)}
														</>
													) : (
														<p className="text-center">No Courses Found</p>
													)}
												</div>
											</div>
										</>
									) : (
										<Link to={link?.path}>
											<p
												className={` ${
													matchRoute(link?.path)
														? "text-yellow-25"
														: "text-richblack-25"
												} `}
											>
												{" "}
												{link.title}{" "}
											</p>
										</Link>
									)}
								</li>
							)
						)}
					</ul>
				</nav>
				<div className="hidden items-center gap-x-4 md:flex">
					{!!user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
						<Link to="/dashboard/cart" className="relative">
							<AiOutlineShoppingCart className="text-2xl text-richblack-100" />{" "}
							{totalItems > 0 && (
								<span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
									{totalItems}{" "}
								</span>
							)}
						</Link>
					)}
					{!user && (
						<Link to="/login">
							<button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
								Log in
							</button>
						</Link>
					)}
					{!user && (
						<Link to="/signup">
							<button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
								{" "}
								Sign up{" "}
							</button>
						</Link>
					)}
					{!!user && <ProfileDropdown />}{" "}
					{/* added profile dropdown if token is not equal to null means user is present*/}
				</div>
				<button className="mr-4 md:hidden">
					{" "}
					<AiOutlineMenu fontSize={24} fill="#AFB2BF" />{" "}
				</button>
			</div>
		</div>
	);
}

export default Navbar;
