import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { Textarea } from "./ui/textarea";

type Props = {
  name: string;
  label?: string;
  description?: string;
  className?: string;
};

const TextAreaFormField = ({ name, label, description, className }: Props) => {
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
        <FormItem className="space-y-4 w-1/2 m-auto">
          {label && (
            <label className="block font-medium text-lg">{label}</label>
          )}
          <FormControl>
            <Textarea
              placeholder="enter"
              value={value}
              onChange={(text) => {
                onChange(text);
                trigger(name);
              }}
              className={cn("whitespace-normal", className)}
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

export default TextAreaFormField;
