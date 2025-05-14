import { FormTemplate } from "./formTemplate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useContext, useEffect, useState } from "react";
import { StepContext } from "./StepProvider";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  SignUpType,
  useAuth,
} from "@/app/components/contextProvider/AuthContext";

export const FormPageTwo = () => {
  const { signUp } = useAuth();
  const formSchema = z
    .object({
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters." }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const { formData, setFormData } = useContext(StepContext);
  const [passwordVisible, setPasswordVisibe] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const password = form.watch("password");
  const confirmPassword = form.watch("confirmPassword");

  const isFormFilled = password.trim() !== "" && confirmPassword.trim() !== "";

  useEffect(() => {
    if (formData) {
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  }, [formData]);
  console.log(confirmPassword);
  const router = useRouter();
  console.log("formData", formData);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const allInfo: SignUpType = {
      ...formData,
      password: values.password,
    };

    signUp(allInfo);
    router.push("/");
  }

  return (
    <FormTemplate
      forNewAccount={false}
      question="Create a strong password"
      questionsContent={
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 text-white"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Create a password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Confirm your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2 text-[14px] text-[#71717A]">
                <input
                  type="checkbox"
                  disabled={!isFormFilled}
                  onChange={() => {
                    setPasswordVisibe(!passwordVisible);
                  }}
                />
                <p>Show password</p>
              </div>
            </div>
            <Button
              type="submit"
              disabled={!isFormFilled}
              className="w-full h-9 flex justify-center items-center text-black  bg-white text-[14px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Let's Go!
            </Button>
          </form>
        </Form>
      }
      description="Create a strong password with letters, numbers."
    />
  );
};
