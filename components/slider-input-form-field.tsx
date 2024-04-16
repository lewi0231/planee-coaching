import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Slider } from "./ui/slider";

type Props = {
  name: string;
  label?: string;
  description?: string;
  className?: string;
};

const SliderInputFormField = ({
  name,
  label,
  description,
  className,
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
        <FormItem className="space-y-4">
          {label && (
            <label className="block text-sm font-medium">{label}</label>
          )}

          <FormControl>
            <Slider
              className="w-5/6 m-auto cursor-pointer"
              {...rest}
              onValueChange={(obj) => {
                onChange(obj[0]);
                trigger(name);
              }}
              value={[value]}
              min={1}
              max={7}
              step={1}
            />
          </FormControl>

          {description && (
            <FormDescription className="pl-3">{description}</FormDescription>
          )}
          <FormMessage>{errors[name]?.message as string}</FormMessage>
        </FormItem>
      )}
    />
  );
};

export default SliderInputFormField;
