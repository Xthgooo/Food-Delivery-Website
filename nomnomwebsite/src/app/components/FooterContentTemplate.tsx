type FooterContent = {
	title: string;
	content: React.ReactNode;
};

export const FooterContentTemplate = ({ title, content }: FooterContent) => {
	return (
		<div className="w-fit h-57 flex flex-col gap-4">
			<p className="h-7 text-[#71717A] text-[16px] uppercase">{title}</p>
			<div className="h-50 w-fit flex flex-col flex-wrap gap-4 capitalize text-white items-start">
				{content}
			</div>
		</div>
	);
};
