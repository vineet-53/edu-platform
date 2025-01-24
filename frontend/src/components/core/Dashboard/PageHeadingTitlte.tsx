import React from "react";
import {
	getConvertedUrlText,
	getCurrentPageUrlText,
} from "../../../utils/getConvertedUrlText";
import { useLocation } from "react-router-dom";

const PageHeadingTitlte = () => {
	const location = useLocation();
	return (
		<h3 className="max-sm:xl max-md:text-2xl md:text-3xl text-white">
			{getConvertedUrlText(getCurrentPageUrlText(location.pathname))}
		</h3>
	);
};

export default PageHeadingTitlte;
