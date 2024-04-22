import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { Textarea } from "./ui/textarea";

type Props = {
  name: string;
  label?: string;
  description?: string;
  className?: string;
  placeholder?: string;
};

const TextAreaFormField = ({
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
    watch,
  } = useFormContext();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const textareaValue = watch(name);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [textareaValue]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, value, ref, ...rest } }) => (
        <FormItem className="space-y-4 m-auto">
          {label && (
            <label className="block font-semibold text-xl pb-2">{label}</label>
          )}
          <FormControl className="w-full">
            <Textarea
              placeholder={placeholder}
              value={value}
              onChange={(text) => {
                onChange(text);
                trigger(name);
              }}
              ref={(el) => {
                ref(el);
                if (textareaRef.current) {
                  textareaRef.current = el;
                }
              }}
              className={cn("whitespace-normal bg-white h-auto", className)}
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
