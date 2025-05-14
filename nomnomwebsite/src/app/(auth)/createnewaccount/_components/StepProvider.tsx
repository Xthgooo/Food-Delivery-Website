"use client";
import {
	createContext,
	PropsWithChildren,
	useState,
	Dispatch,
	SetStateAction,
} from "react";

type StepContextType = {
	step: number;
	setStep: Dispatch<SetStateAction<number>>;
	formData: CustomFormData;
	setFormData: Dispatch<SetStateAction<CustomFormData>>;
};

type CustomFormData = {
	profileEmoji: string;
	phoneNumber: string;
	email: string;
	address: string;
};

export const StepContext = createContext<StepContextType>({
	step: 1,
	setStep: () => {},
	formData: {
		profileEmoji: "",
		phoneNumber: "",
		email: "",
		address: "",
	},
	setFormData: () => {},
});

export const StepProvider = ({ children }: PropsWithChildren) => {
	const [step, setStep] = useState<number>(1);
	const [formData, setFormData] = useState<CustomFormData>({
		profileEmoji: "",
		phoneNumber: "",
		email: "",
		address: "",
	});

	return (
		<StepContext.Provider value={{ step, setStep, formData, setFormData }}>
			{children}
		</StepContext.Provider>
	);
};
