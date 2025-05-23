"use client";
import { useContext, useEffect } from "react";
import { LogInForm } from "./_components/LogIn";
import { StepContext } from "../createnewaccount/_components/StepProvider";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function LogInHome() {
  const { setStep } = useContext(StepContext);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/login") {
      setStep(1);
    }
  }, [pathname, setStep]);

  return (
    <div className="w-screen h-screen flex gap-12 items-center p-5 pl-40 justify-center">
      <LogInForm />
      <div className="w-[856px] h-[904px] overflow-hidden rounded-3xl">
        <Image
          width={"856"}
          height={"904"}
          alt="login background"
          src="/images/loginSignupBG.jpeg"
          className="w-full h-full bg-cover"
        />
      </div>
    </div>
  );
}
