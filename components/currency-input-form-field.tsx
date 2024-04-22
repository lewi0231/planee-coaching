import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import CurrencyInput from "react-currency-input-field";
import { useFormContext } from "react-hook-form";

type Props = {
  name: string;
  label?: string;
  description?: string;
  className?: string;
  placeholder?: string;
};

const CurrencyInputFormField = ({
  name,
  label,
  description,
  className,
  placeholder,
}: Props) => {
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
        <FormItem className="space-y-4 w-full">
          {label && (
            <label className="block text-sm font-medium ">{label}</label>
          )}
          <FormControl className="w-full">
            <CurrencyInput
              {...rest}
              allowNegativeValue={false}
              decimalsLimit={2}
              placeholder={placeholder}
              className={cn(
                "flex h-9 rounded-md border border-input bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1  focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-right text-sm",
                className
              )}
              onValueChange={(text) => {
                onChange(text);
                trigger(name);
              }}
              value={value}
              name={name}
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

export default CurrencyInputFormField;
