"use client";

import { Button } from "@/components/ui/button";
import { Line } from "./assets/Line";
import TextCarousel from "./TextCarousel";
import { NomNomLogo } from "./Logo";
import { FooterContentTemplate } from "./FooterContentTemplate";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

const footerEndButtons = [
	"Copy right 2024 © Nomnom LLC",
	"Privacy policy",
	"Terms and conditoin",
	"Cookie policy",
];

type CatogoryNames = {
	categoryName: string;
};

export const Footer = () => {
	const [categories, setCategories] = useState<CatogoryNames[]>([]);

	useEffect(() => {
		const fetchCategories = async () => {
			const response = await axios.get(
				`${process.env.API_URL}/category/getCategoriesWithCounts`
			);
			setCategories(response.data.categories);
			console.log(response.data.categories);
		};
		fetchCategories();
	}, []);

	const FooterContentButtons = [
		{ title: "nomnom", buttons: ["Home", "Contact us", "Delivery zone"] },
		{
			title: "menu",
			buttons: categories.map((category) => category.categoryName).slice(0, 5),
		},
		{
			title: "",
			buttons: categories.map((category) => category.categoryName).slice(5, 10),
		},
		{ title: "socials", buttons: ["Facebook", "Instagram"] },
	];
	return (
		<div className="w-full h-[755px] flex flex-col bg-black pt-15 gap-19">
			<TextCarousel />
			<div className="w-full px-22 flex flex-col gap-19">
				<div className="w-full flex justify-between items-start">
					<Link href="/">
						<NomNomLogo flexRow={false} textColor="white" />
					</Link>
					<div className="flex gap-[112px]">
						{FooterContentButtons.map((section, index) => (
							<FooterContentTemplate
								key={index}
								title={section.title}
								content={section.buttons.map((button, buttonIndex) => (
									<Button
										key={buttonIndex}
										className="justify-start max-w-33 w-full p-0 h-6 flex-wrap "
										variant="ghost">
										{button}
									</Button>
								))}
							/>
						))}
					</div>
				</div>
				<div className="w-full flex flex-col gap-8 overflow-hidden">
					<Line />
					<div className="flex gap-12 text-[#71717A] text-sm">
						{footerEndButtons.map((text, index) => (
							<Button key={index} variant="ghost" className="p-0 h-fit">
								{text}
							</Button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
