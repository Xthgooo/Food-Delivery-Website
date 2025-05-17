"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { FormTemplate } from "../createnewaccount/_components/formTemplate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ResetPasswordHome() {
	const formSchema = z.object({
		email: z
			.string()
			.email({ message: "Please provide a valid email address." }),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
		},
	});

	const emailValue = form.watch("email");

	function onSubmit(values: z.infer<typeof formSchema>) {}

	return (
		<div className="w-screen h-screen flex gap-12 items-center p-5 pl-40 justify-center">
			<FormTemplate
				question="Reset your password "
				forNewAccount={true}
				questionsContent={
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												placeholder="Enter your email address"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								type="submit"
								disabled={!emailValue}
								className="w-full h-9 flex justify-center items-center text-white text-[14px] disabled:opacity-50 disabled:cursor-not-allowed">
								Send Link
							</Button>
						</form>
					</Form>
				}
				description="Enter your email to receive a password reset link."
			/>
			<div className="w-[856px] h-[904px]">
				<img src="/images/deliveryMan.png" className="w-full h-full bg-cover" />
			</div>
		</div>
	);
}
