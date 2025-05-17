import { FormTemplate } from "./formTemplate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useContext, useEffect, useState } from "react";
import { StepContext } from "./StepProvider";
import { Button } from "@/components/ui/button";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

type EmojiData = {
	native: string;
};

export const FormPageOne = () => {
	const formSchema = z.object({
		email: z
			.string()
			.email({ message: "Please provide a valid email address." }),

		phoneNumber: z
			.string()
			.regex(/^\d{8}$/, { message: "Phone number must be exactly 8 digits." }),

		profileEmoji: z
			.string()
			.emoji({ message: "Please provide an emoji for your Avatar!" }),

		address: z
			.string()
			.min(10, { message: "Address must be at least 5 characters long." }),
	});

	const { setStep, formData, setFormData } = useContext(StepContext);
	const [filledOut, setFilledOut] = useState(false);

	useEffect(() => {
		const storedData = localStorage.getItem("formData");
		if (storedData) {
			setFormData(JSON.parse(storedData));
		}
	}, [setFormData]);

	useEffect(() => {
		if (formData) {
			localStorage.setItem("formData", JSON.stringify(formData));
		}
	}, [formData]);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: formData.email,
			profileEmoji: formData.profileEmoji,
			phoneNumber: formData.phoneNumber,
			address: formData.address,
		},
	});

	const watchedFields = form.watch();

	useEffect(() => {
		const allFieldsFilled = Object.values(watchedFields).every(
			(val) => val !== undefined && val !== ""
		);
		setFilledOut(allFieldsFilled);
	}, [watchedFields]);

	function onSubmit(values: z.infer<typeof formSchema>) {
		setFormData((prev) => ({ ...prev, ...values }));
		setStep((prev) => prev + 1);
	}

	return (
		<FormTemplate
			forNewAccount={false}
			question="Create your account"
			questionsContent={
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email Address</FormLabel>
									<FormControl>
										<Input placeholder="e.g. cutiepie@email.com" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="phoneNumber"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Phone Number</FormLabel>
									<FormControl>
										<Input placeholder="e.g. 12345678" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="address"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Your Home Address 🏠</FormLabel>
									<FormControl>
										<Input
											placeholder="e.g. 123 Rainbow Street, Candyland"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="profileEmoji"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Pick Your Vibe Emoji ✨</FormLabel>
									<FormControl>
										<div className="flex items-center gap-3">
											<Dialog>
												<DialogTrigger asChild>
													<Button
														type="button"
														variant="outline"
														className="text-black">
														{field.value || "Pick Emoji 😄"}
													</Button>
												</DialogTrigger>
												<DialogContent className="w-auto">
													<DialogTitle></DialogTitle>
													<Picker
														data={data}
														onEmojiSelect={(emoji: EmojiData) =>
															field.onChange(emoji.native)
														}
														previewPosition="none"
														theme="light"
													/>
												</DialogContent>
											</Dialog>
											{field.value && (
												<span className="text-2xl">{field.value}</span>
											)}
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							disabled={!filledOut}
							className="w-full h-9 flex justify-center items-center text-black  bg-white text-[14px] disabled:opacity-50 disabled:cursor-not-allowed">
							Let`&apos;`s Go!
						</Button>
					</form>
				</Form>
			}
			description="Sign up to explore your favorite dishes."
		/>
	);
};
