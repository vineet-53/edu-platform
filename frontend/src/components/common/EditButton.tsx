import React from "react";
import IconBtn from "./IconBtn";
import { FaEdit } from "react-icons/fa";

export const EditButton = ({
	styles,
	handler,
}: {
	styles: string;
	handler: () => void;
}) => {
	return (
		<IconBtn customClasses={styles}>
			<FaEdit></FaEdit>
			<span>Edit</span>
		</IconBtn>
	);
};
