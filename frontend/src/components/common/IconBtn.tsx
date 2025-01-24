import React from "react";

export default function IconBtn({
	text,
	onclick,
	children,
	disabled,
	outline = false,
	customClasses,
	type,
}: {
	text?: string;
	onclick?: () => void;
	children?: React.ReactNode;
	disabled?: boolean;
	outline?: boolean;
	customClasses?: string;
	type?: "submit" | "reset" | "button";
}) {
	return (
		<button
			disabled={disabled}
			onClick={onclick}
			className={`flex items-center cursor-pointer gap-x-2 rounded-md py-1 px-3 font-semibold text-richblack-900
              ${
								outline
									? "border border-yellow-50 bg-transparent"
									: "bg-yellow-50"
							} ${customClasses}`}
			type={type}
		>
			{children ? (
				<>
					<span className={`${outline && "text-yellow-50"}`}> {text} </span>
					{children}
				</>
			) : (
				text
			)}
		</button>
	);
}
