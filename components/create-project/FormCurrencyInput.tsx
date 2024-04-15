import { type FormCurrencyInput } from "@/lib/types/form-fields";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { Controller } from "react-hook-form";

const FormCurrencyInput = ({
  defaultValue,
  control,
  error,
  name,
  placeholder,
}: FormCurrencyInput) => {
  const [value, setValue] = useState<string | undefined>(defaultValue);

  return (
    <div className="flex flex-col items-start gap-4">
      <Controller
        name={name}
        defaultValue={defaultValue}
        control={control}
        render={({ field }) => (
          <CurrencyInput
            {...field}
            onValueChange={(value) => setValue(value)}
            value={value}
            allowNegativeValue={false}
            decimalsLimit={2}
            placeholder={placeholder}
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

export default FormCurrencyInput;
