import { Textarea } from "@/components/ui/textarea";
import React, { useEffect } from "react";

import { type FormInputField } from "@/lib/types/form-fields";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const FormTextAreaField: React.FC<FormInputField> = ({
  name,
  placeholder,
  register,
  valueAsNumber,
  error,
  information,
  rows,
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
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-5/6 mb-10">
        {information?.map((line) => (
          <p className="my-4" key={line}>
            {line}
          </p>
        ))}
      </div>
      <Textarea
        placeholder={placeholder}
        className="text-lg w-5/6 m-2"
        rows={rows}
        {...register(name, {
          valueAsNumber,
          onChange: () => {
            if (error) trigger(name);
          },
          onBlur: () => trigger(name),
        })}
        defaultValue={getValues(name) ?? ""}
      />
      <div className=" text-destructive text-sm mt-4 flex gap-2 items-center">
        {error && (
          <>
            <span>{error?.message}</span>
            <ExclamationTriangleIcon width={18} height={18} />
          </>
        )}
      </div>
    </div>
  );
};

export default FormTextAreaField;
