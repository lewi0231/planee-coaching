import React from "react";

import { CreateProjectType } from "@/lib/types/form-fields";
import { UseFormRegister } from "react-hook-form";

const FormHiddenInputField: React.FC<{
  register: UseFormRegister<CreateProjectType>;
  type: string;
  name: keyof CreateProjectType;
}> = ({ name, register, type }) => {
  return <input type={type} hidden {...register(name)} />;
};

export default FormHiddenInputField;
