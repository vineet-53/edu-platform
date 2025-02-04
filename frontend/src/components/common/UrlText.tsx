import React from "react";
import { Link, useLocation } from "react-router-dom";
import { getConvertedUrlText } from "../../utils/getConvertedUrlText";

function convertedRoute(index: number, pathnameArr: string[]) {
	pathnameArr = pathnameArr.slice(1);
	let route = "/";
	pathnameArr.forEach((name, ind) => {
		if (ind > index - 1) {
			return;
		}
		if (ind == index - 1) {
			route += name;
			return;
		}
		route += name + "/";
	});
	return route;
}

const UrlText = () => {
	const location = useLocation();

	let pathnameArr = location.pathname?.split("/");
	pathnameArr = pathnameArr.filter((name) => name !== "");

	return (
		<div className="flex md:gap-2  max-sm:gap-1 text-richblack-500 max-md:text-sm max-sm:text-xs">
			<Link to="/" className="coursor-pointer">
				Home
			</Link>
			<span>/</span>
			{pathnameArr?.map((text: string, indx: number) => {
				let lastIndex = pathnameArr.length - 1;
				if (text === "") {
					return;
				}
				if (text.includes("-")) {
					return (
						<span
							key={indx}
							className={`${pathnameArr[lastIndex] === text && "text-yellow-200"}`}
						>
							{getConvertedUrlText(text)}
						</span>
					);
				}
				return (
					<span
						className={`flex gap-2 ${pathnameArr[lastIndex] === text && "text-yellow-200"}`}
						key={indx}
					>
						<Link
							to={lastIndex !== indx ? convertedRoute(indx, pathnameArr) : ""}
						>
							{text[0].toUpperCase() + text.slice(1)}
						</Link>
						{pathnameArr[lastIndex] !== text && <span>/</span>}
					</span>
				);
			})}
		</div>
	);
};

export default UrlText;
