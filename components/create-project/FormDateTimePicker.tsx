import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { type FormDateTimePicker } from "@/lib/types/form-fields";
import { cn } from "@/lib/utils";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useState } from "react";
import { Controller } from "react-hook-form";

const FormDateTimePicker = ({
  control,
  error,
  name,
  trigger,
  getValues,
}: FormDateTimePicker) => {
  const [value, setValue] = useState<string | undefined>(
    format(new Date(), "yyyy-MM-dd'T'HH:mm")
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="text-xs text-primary/75">
          {value}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("hover:cursor-pointer")}>
        <Controller
          name={name}
          control={control}
          defaultValue={value}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              type="datetime-local"
              onChange={(e) => {
                const selectedDate = new Date(e.target.value);
                const formattedDate = format(
                  selectedDate,
                  "yyyy-MM-dd'T'HH:mm"
                );
                setValue(formattedDate);
                onChange(formattedDate);
                if (error) trigger(name);
              }}
              value={value}
              className="w-fit cursor-pointer rounded border px-2 py-1"
              min={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
              onBlur={onBlur}
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
      </PopoverContent>
    </Popover>
  );
};

export default FormDateTimePicker;
