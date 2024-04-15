import React, { useEffect } from "react";

import { Slider } from "@/components/ui/slider";
import { type FormSliderField } from "@/lib/types/form-fields";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Controller } from "react-hook-form";

const FormSliderField: React.FC<FormSliderField> = ({
  name,
  register,
  error,
  defaultValue = 4,
  getValues,
  control,
}) => {
  useEffect(() => {
    console.log(getValues(name));
  });

  return (
    <div className="w-full">
      <div className="flex justify-between w-full text-sm mb-4 font-semibold">
        <h4 className="block">Low</h4>
        <h4 className="block">High</h4>
      </div>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Slider
            className="w-5/6 m-auto"
            {...field}
            onValueChange={(value) => field.onChange(value[0])}
            value={[field.value]}
            min={1}
            max={7}
            step={1}
          />
        )}
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

export default FormSliderField;
