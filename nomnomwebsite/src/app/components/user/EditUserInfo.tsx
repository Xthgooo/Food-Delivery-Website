"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import { useEffect, useState } from "react";
import { ShowUserDetailsProps } from "./UserDetailsTemplate";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";

export const EditUserInfo = ({ id, title, value }: ShowUserDetailsProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState(value);
	const [infoTitle, setInfoTitle] = useState<string>("");

	useEffect(() => {
		if (title === "Phone") {
			setInfoTitle("phoneNumber");
		} else if (title === "Address") {
			setInfoTitle("address");
		}
	}, [title]);

	const handleSubmit = async () => {
		if (
			infoTitle === "phoneNumber" &&
			inputValue !== undefined &&
			!/^\d{8}$/.test(inputValue)
		) {
			toast.error("Invalid phone number", {
				description: "Phone number must be exactly 8 digits.",
			});
		}

		if (infoTitle === "address") {
			const trimmedInput = inputValue?.trim() ?? "";

			if (trimmedInput.length <= 10) {
				toast.error("Invalid address", {
					description: "Address must be more than 10 characters.",
				});
				return;
			}
		}

		try {
			setIsOpen(false);

			const updatedData = {
				[infoTitle]: inputValue,
			};

			await axios.put(`${process.env.API_URL}/user/${id}`, updatedData);

			toast.success("User info successfully updated!", {
				description: "Your changes have been saved.",
			});
		} catch (error) {
			toast.error("Update failed", {
				description: "Something went wrong while updating the user.",
			});
			console.error("Update error:", error);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger className="ml-2 text-xs text-gray-500 hover:text-black">
				✏️
			</DialogTrigger>

			<DialogContent className="w-[460px] bg-white text-black rounded-xl shadow-lg">
				<DialogHeader>
					<DialogTitle className="text-lg font-semibold mb-2">
						Edit {title}
					</DialogTitle>
					<DialogDescription className="text-sm text-gray-500 mb-4">
						Update your {title.toLowerCase()} below.
					</DialogDescription>
				</DialogHeader>

				<Input
					value={inputValue ? inputValue : ""}
					onChange={(e) => setInputValue(e.target.value)}
					className="mb-4 text-sm"
					placeholder={`Enter new ${title.toLowerCase()}`}
				/>

				<Button
					onClick={handleSubmit}
					className="w-full mt-2 bg-white border-1 border-[#EF4444] hover:bg-[#EF4444] text-[#EF4444] hover:text-white text-xs py-1 rounded-md duration-150 transition-all">
					💾 Save Changes
				</Button>
			</DialogContent>
		</Dialog>
	);
};
