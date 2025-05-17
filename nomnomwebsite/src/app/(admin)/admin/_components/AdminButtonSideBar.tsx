"use client";
import { NomNomLogo } from "@/app/components/Logo";
import { AdminButtons } from "./AdminButtons";
import { ReactNode, useContext } from "react";
import {
	AdminButtonNameType,
	AdminContext,
} from "./contextProvider/AdminContextProvider";
import { FoodMenuIcon } from "./assets/FoodMenuIcon";
import { OrderTruck } from "./assets/OrderTruck";

import { useRouter } from "next/navigation";
import { SettingsIcon } from "./assets/SettingsIcon";
import { AdminProfile } from "./AdminProfile";
import { Line } from "@/app/components/assets/Line";

export type AdminButtonType = {
	name: "Food Menu" | "Orders" | "Settings";
	icon: ReactNode;
};

const adminButtons: AdminButtonType[] = [
	{
		name: "Food Menu",
		icon: <FoodMenuIcon />,
	},
	{
		name: "Orders",
		icon: <OrderTruck />,
	},
	{
		name: "Settings",
		icon: <SettingsIcon />,
	},
];

export const AdminButtonsSidebar = () => {
	const { clickedButton, setClickedButton } = useContext(AdminContext);
	const router = useRouter();

	const handleButtonClick = (name: AdminButtonNameType) => {
		setClickedButton(name);
		if (name === "Food Menu") {
			router.push("./foodMenu");
		} else if (name === "Orders") {
			router.push("./orders");
		} else if (name === "Settings") {
			router.push("./settings");
		}
	};

	return (
		<div className="fixed top-0 lg:w-[240px] w-[180px]  h-screen flex flex-col gap-10 py-9 px-5 bg-black overflow-hidden">
			<NomNomLogo flexRow={true} textColor="white" />
			<AdminProfile />
			<Line />
			<div className="w-full flex flex-col gap-6 text-white">
				{adminButtons.map((button: AdminButtonType, index) => (
					<AdminButtons
						key={index}
						button={button}
						clicked={clickedButton === button.name}
						handleButtonClick={() => handleButtonClick(button.name)}
					/>
				))}
			</div>
		</div>
	);
};
