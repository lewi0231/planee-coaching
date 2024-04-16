import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

type Props = {
  name: string;
  label?: string;
  description?: string;
  className?: string;
};

const InputFormField = ({ name, label, description, className }: Props) => {
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
        <FormItem className="space-y-4 w-1/2">
          {label && (
            <label className="block text-lg font-medium">{label}</label>
          )}
          <FormControl className="w-full">
            <Input
              placeholder="enter"
              value={value}
              onChange={(text) => {
                onChange(text);
                trigger(name);
              }}
              className={className}
              {...rest}
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

export default InputFormField;
