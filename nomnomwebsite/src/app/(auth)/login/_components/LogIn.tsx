"use client";

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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormTemplate } from "@/app/(auth)/createnewaccount/_components/formTemplate";
import { useAuth } from "@/app/components/contextProvider/AuthContext";
import { useRouter } from "next/navigation";

export const LogInForm = () => {
  const formSchema = z.object({
    email: z
      .string()
      .email({ message: "Please provide a valid email address." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
  });
  const { signIn } = useAuth();
  const route = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const emailValue = form.watch("email");
  const passwordFilled = form.watch("password");

  const isFormFilled = emailValue.trim() !== "" && passwordFilled.trim() !== "";
  function onSubmit(values: z.infer<typeof formSchema>) {
    const email = values.email;
    const password = values.password;
    signIn({ email, password });
  }

  return (
    <FormTemplate
      forNewAccount={true}
      question="Log in "
      questionsContent={
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 text-white"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter your email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <a href="/resetPassword" className="underline text-sm">
                Forgot Password ?
              </a>
            </div>

            <Button
              type="submit"
              disabled={!isFormFilled}
              className="w-full h-9 flex justify-center items-center bg-white text-black text-[14px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Let's Go!
            </Button>
          </form>
        </Form>
      }
      description="Log in to enjoy your favorite dishes."
    />
  );
};
