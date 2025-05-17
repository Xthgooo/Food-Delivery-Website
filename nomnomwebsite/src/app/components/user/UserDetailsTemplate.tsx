import React from "react";
import { EditUserInfo } from "./EditUserInfo";

export type ShowUserDetailsProps = {
	title: string;
	value: React.ReactNode;
	id: string;
};

export const ShowUserDetails = ({ id, title, value }: ShowUserDetailsProps) => {
	return (
		<div className="flex flex-col gap-1 px-2">
			<p className="text-[#EF4444]">{title}:</p>
			<div className="flex items-center justify-between text-[11px]">
				<p className="truncate">{value}</p>
				<EditUserInfo id={id} title={title} value={value} />
			</div>
		</div>
	);
};
