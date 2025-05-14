"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AdminButtonNameType } from "./contextProvider/AdminContextProvider";
import { AdminButtonType } from "./AdminButtonSideBar";

type AdminButtons = {
  button: AdminButtonType;
  clicked: boolean;
  handleButtonClick: (buttonName: AdminButtonNameType) => void;
};

export const AdminButtons = ({
  button,
  clicked,
  handleButtonClick,
}: AdminButtons) => {
  return (
    <Button
      variant="ghost"
      className="w-full h-10 flex lg:gap-3 gap-1 justify-start items-center rounded-full"
      style={{
        backgroundColor: clicked ? "red" : "",
      }}
      onClick={() => handleButtonClick(button.name)}
    >
      <div className="flex gap-2">
        {button.icon}
        <p
          className="lg:text-[14px] text-[12px] text-white "
          style={{
            fontWeight: clicked ? "bold" : "",
          }}
        >
          {button.name}
        </p>
      </div>
      {clicked ? (
        <>
          <ArrowRight color="white" />
        </>
      ) : (
        <></>
      )}
    </Button>
  );
};
