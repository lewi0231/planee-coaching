import React, { useEffect } from "react";

import { Input } from "@/components/ui/input";
import { type FormInputField } from "@/lib/types/form-fields";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const FormInputField: React.FC<FormInputField> = ({
  type,
  name,
  placeholder,
  register,
  valueAsNumber,
  error,
  setValue,
  trigger,
  getValues,
}) => {
  useEffect(() => {
    const initializeField = () => {
      setValue(name, getValues(name) ?? "");
    };
    initializeField();
  }, [name, setValue, getValues]);

  return (
    <div className="h-full w-full flex flex-col justify-center items-center m-2">
      <Input
        type={type}
        placeholder={placeholder}
        className=" w-5/6 text-lg"
        {...register(name, {
          valueAsNumber,
          onChange: () => {
            if (error) trigger(name);
          },
          onBlur: () => trigger(name),
        })}
      />
      {error && (
        <div className=" text-destructive text-sm mt-4 flex gap-2 items-center">
          {error?.message} <ExclamationTriangleIcon width={18} height={18} />
        </div>
      )}
    </div>
  );
};

export default FormInputField;
