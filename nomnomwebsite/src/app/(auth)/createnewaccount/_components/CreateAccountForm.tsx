"use client";

import { useContext } from "react";
import { StepContext } from "./StepProvider";
import { FormPageTwo } from "./FormPageTwo";
import { FormPageOne } from "./FormPageOne";

export function CreateAccountForm() {
  const { step } = useContext(StepContext);

  return (
    <>
      {step === 1 && <FormPageOne />}
      {step === 2 && <FormPageTwo />}
    </>
  );
}
