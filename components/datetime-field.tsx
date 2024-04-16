import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { useFormContext } from "react-hook-form";

type DateTimeFieldProps = {
  name: string;
  label?: string;
  description?: string;
  minDate?: Date;
  className?: string;
};

const DateTimeField = ({
  name,
  label,
  description,
  minDate = new Date(),
  className,
}: DateTimeFieldProps) => {
  const {
    control,
    formState: { errors },
    trigger,
  } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, value, ...rest } }) => (
        <FormItem className={`space-y-4 w-1/2 ${className}`}>
          {label && (
            <label className="block text-lg font-medium">{label}</label>
          )}
          <FormControl className="w-fit">
            <Input
              {...rest}
              type="datetime-local"
              onChange={(e) => {
                const selectedDate = new Date(e.target.value);
                const formattedDate = format(
                  selectedDate,
                  "yyyy-MM-dd'T'HH:mm"
                );
                onChange(formattedDate);
                trigger(name);
              }}
              value={value}
              className="cursor-pointer rounded border py-1 "
              min={format(minDate, "yyyy-MM-dd'T'HH:mm")}
            />
          </FormControl>

          {description && (
            <FormDescription className="">{description}</FormDescription>
          )}
          <FormMessage>{errors[name]?.message as string}</FormMessage>
        </FormItem>
      )}
    />
  );
};

export default DateTimeField;
