"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useContext } from "react";
import { StepContext } from "./StepProvider";
import { useRouter } from "next/navigation";

export type FormTemplateType = {
	question: string;
	description: string;
	questionsContent: React.ReactNode;
	forNewAccount: boolean;
};

export const FormTemplate = ({
	question,
	description,
	questionsContent,
	forNewAccount,
}: FormTemplateType) => {
	const { step, setStep } = useContext(StepContext);

	const handlePrevButton = () => {
		if (step === 1) {
			router.push("/");
		}
		if (step > 1) setStep((prev) => prev - 1);
	};

	const router = useRouter();

	return (
		<div className="w-100 flex flex-col gap-6 text-white">
			<Button
				className="w-9 h-9 flex justify-center items-center rounded-[8px] bg-white border-[1px] border-[#E4E4E7]"
				onClick={handlePrevButton}>
				<ArrowLeft color="black" />
			</Button>
			<div className="w-full flex flex-col gap-1">
				<p className="text-2xl font-semibold">{question}</p>
				<p className="text-[16px] text-[#71717A]">{description}</p>
			</div>
			<div className="w-full h-fit">{questionsContent}</div>
			{forNewAccount ? (
				<div className="w-full h-6 justify-center not-first:flex gap-3">
					<p className="text-[16px] text-[#71717A]">Don't have an account?</p>
					<a
						onClick={(e) => {
							e.preventDefault();
							setStep(1);
							router.push("/createnewaccount");
						}}
						className="text-[#2563EB] hover:underline bg-transparent h-full cursor-pointer">
						Sign Up
					</a>
				</div>
			) : (
				<div className="w-full justify-center not-first:flex gap-3">
					<p className="text-[16px] text-[#71717A]">Already have an account?</p>
					<a
						onClick={(e) => {
							e.preventDefault();
							router.push("/login"), setStep(1);
						}}
						className="text-[#2563EB] hover:underline">
						Log in
					</a>
				</div>
			)}
		</div>
	);
};
