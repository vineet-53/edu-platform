import React from "react";

const DashboardContentContainer = ({
	children,
	styles,
}: {
	children: React.ReactNode;
	styles?: string;
}) => {
	return (
		<div className={`${styles} mt-8 md:ml-8 flex flex-1 flex-col gap-5`}>
			{children}
		</div>
	);
};

export default DashboardContentContainer;
