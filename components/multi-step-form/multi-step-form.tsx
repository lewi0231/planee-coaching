"use client";

import { onSubmitCreateProjectAction } from "@/actions/project-actions";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useProgress } from "@/lib/hooks/useProgress";
import { CreateProjectType } from "@/lib/types/form-fields";
import { CreateProjectSchema } from "@/lib/types/validation-schemas";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";
import { Textarea } from "../ui/textarea";

type Props = {
  handleCloseModal: () => void;
  updateProgressBar: (step: number) => void;
  handleOptimisticCreate: (project: CreateProjectType) => void;
};

const MultiStepForm = ({
  handleCloseModal,
  updateProgressBar,
  handleOptimisticCreate,
}: Props) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const form = useForm<z.output<typeof CreateProjectSchema>>({
    resolver: zodResolver(CreateProjectSchema),
    reValidateMode: "onChange",
    defaultValues: {
      intent: "createProject",
      id: crypto.randomUUID(),
      title: "",
      description: "",
      motivation: "",
      barriers: "",
      reward: "",
      projectValue: "1000.00",
      dueDate: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      confidence: 4,
    },
  });

  const formInputSequence = [
    <FormField
      key="title"
      control={form.control}
      name="title"
      render={({
        field: { onChange, value, ...rest },
        fieldState: { error },
      }) => (
        <FormItem className="space-y-4">
          <FormControl>
            <Input
              placeholder="enter"
              value={value}
              onChange={(text) => {
                onChange(text);
                form.trigger("title");
              }}
              {...rest}
            />
          </FormControl>
          <FormDescription className="pl-3">
            Click <em>Save Me</em> when you have finished editing!
          </FormDescription>
          <FormMessage>{error?.message ? error.message : ""}</FormMessage>
        </FormItem>
      )}
    />,
    <FormField
      key="description"
      control={form.control}
      name="description"
      render={({
        field: { onChange, value, ...rest },
        fieldState: { error },
      }) => (
        <FormItem className="space-y-4">
          <FormControl>
            <Textarea
              placeholder="enter"
              onChange={(text) => {
                onChange(text);
                form.trigger("description");
              }}
              {...rest}
            />
          </FormControl>
          <FormDescription className="pl-3">
            Click <em>Save Me</em> when you have finished editing!
          </FormDescription>
          <FormMessage>{error?.message ? error.message : ""}</FormMessage>
        </FormItem>
      )}
    />,
    <FormField
      key={"motivation"}
      control={form.control}
      name="motivation"
      render={({
        field: { onChange, value, ...rest },
        fieldState: { error },
      }) => (
        <FormItem className="space-y-4">
          <FormControl>
            <Textarea
              placeholder="enter"
              onChange={(text) => {
                onChange(text);
                form.trigger("motivation");
              }}
              {...rest}
            />
          </FormControl>
          <FormDescription className="pl-3">
            Click <em>Save Me</em> when you have finished editing!
          </FormDescription>
          <FormMessage>{error?.message ? error.message : ""}</FormMessage>
        </FormItem>
      )}
    />,
    <FormField
      key={"barriers"}
      control={form.control}
      name="barriers"
      render={({
        field: { onChange, value, ...rest },
        fieldState: { error },
      }) => (
        <FormItem className="space-y-4">
          <FormControl>
            <Textarea
              placeholder="enter"
              onChange={(text) => {
                onChange(text);
                form.trigger("barriers");
              }}
              {...rest}
            />
          </FormControl>
          <FormDescription className="pl-3">
            Click <em>Save Me</em> when you have finished editing!
          </FormDescription>
          <FormMessage>{error?.message ? error.message : ""}</FormMessage>
        </FormItem>
      )}
    />,
    <FormField
      key={"projectValue"}
      control={form.control}
      name="projectValue"
      render={({
        field: { onChange, name, value, ...rest },
        fieldState: { error },
      }) => (
        <FormItem className="space-y-4">
          <FormControl className="w-fit m-auto">
            <CurrencyInput
              {...rest}
              allowNegativeValue={false}
              decimalsLimit={2}
              placeholder="1000.10"
              className="flex h-9 w-1/2 rounded-md border border-input bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1  focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-right text-sm"
              onValueChange={(text) => {
                onChange(text);
                form.trigger("projectValue");
              }}
              value={value}
              name={name}
            />
          </FormControl>
          <FormDescription className="pl-3">
            Click <em>Save Me</em> when you have finished editing!
          </FormDescription>
          <FormMessage>{error?.message ? error.message : ""}</FormMessage>
        </FormItem>
      )}
    />,
    <FormField
      key="reward"
      control={form.control}
      name="reward"
      render={({
        field: { onChange, value, ...rest },
        fieldState: { error },
      }) => (
        <FormItem className="space-y-4">
          <FormControl>
            <Input
              placeholder="enter"
              onChange={(text) => {
                onChange(text);
                form.trigger("reward");
              }}
              {...rest}
            />
          </FormControl>
          <FormDescription className="pl-3">
            Click <em>Save Me</em> when you have finished editing!
          </FormDescription>
          <FormMessage>{error?.message ? error.message : ""}</FormMessage>
        </FormItem>
      )}
    />,
    <FormField
      key="dueDate"
      control={form.control}
      name="dueDate"
      render={({
        field: { onChange, value, ...rest },
        fieldState: { error },
      }) => (
        <FormItem className="space-y-4">
          <FormControl className="w-fit m-auto">
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
                form.trigger("dueDate");
              }}
              value={value}
              className="cursor-pointer rounded border px-2 py-1"
              min={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
            />
          </FormControl>
          <FormDescription className="pl-3">
            If you had to pay someone to do this for you, how much would you
            pay?!
          </FormDescription>
          <FormMessage>{error?.message ? error.message : ""}</FormMessage>
        </FormItem>
      )}
    />,
    <FormField
      key="confidence"
      control={form.control}
      name="confidence"
      render={({
        field: { onChange, value, ...rest },
        fieldState: { error },
      }) => (
        <FormItem className="space-y-4">
          <FormControl>
            <Slider
              className="w-5/6 m-auto cursor-pointer"
              {...rest}
              onValueChange={(obj) => {
                onChange(obj[0]);
                form.trigger("confidence");
              }}
              value={[value]}
              min={1}
              max={7}
              step={1}
            />
          </FormControl>
          <FormDescription className="pl-3">
            Enter confidence level for completing your project.
          </FormDescription>
          <FormMessage>{error?.message ? error.message : ""}</FormMessage>
        </FormItem>
      )}
    />,
    <Button key="submit" type="submit">
      Save Project
    </Button>,
  ];

  async function onSubmit(data: z.output<typeof CreateProjectSchema>) {
    const formData = new FormData();
    formData.append("id", data.id);
    formData.append("intent", data.intent);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("motivation", data.motivation);
    formData.append("barriers", data.motivation);
    formData.append("confidence", String(data.confidence));
    formData.append("dueDate", data.dueDate);
    formData.append("reward", data.reward);
    formData.append("projectValue", data.projectValue);

    const response = await onSubmitCreateProjectAction(formData);

    // TODO - may want to include server error feedback in form.
    if (response.status === "error") return;
    handleOptimisticCreate(data);

    handleCloseModal();
  }

  useProgress(
    () => updateProgressBar((currentQuestion / 7) * 100),
    currentQuestion
  );

  return (
    <Form {...form}>
      <form
        className=" flex flex-col items-center text-lg h-full gap-10 w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {formInputSequence[currentQuestion]}
        <div className="flex flex-col items-center justify-center w-full h-full transition-all duration-1000">
          <div className=" flex gap-10 w-full justify-center">
            {currentQuestion > 0 &&
              currentQuestion < formInputSequence.length - 1 && (
                <FormButton
                  buttonLabel="Previous"
                  onClick={() =>
                    currentQuestion > 0 &&
                    setCurrentQuestion((prev) => {
                      return prev - 1;
                    })
                  }
                  className="w-1/3"
                />
              )}
            {currentQuestion < formInputSequence.length - 1 && (
              <FormButton
                buttonLabel="Next"
                onClick={() =>
                  setCurrentQuestion((prev) => {
                    return prev + 1;
                  })
                }
                className="w-1/3"
              />
            )}
          </div>
        </div>
      </form>
    </Form>
  );
};

export default MultiStepForm;

// TODO - work out why this isn't working - probably not re-rendering (might not be worth it)
type FormButtonProps = {
  isSubmit?: boolean;
  disabled?: boolean;
  className?: string;
  buttonLabel: string;
  onClick?: () => void;
};

function FormButton({
  disabled = false,
  buttonLabel,
  className,
  onClick,
}: FormButtonProps) {
  return (
    <Button
      className={cn("w-1/4", className)}
      type="button"
      disabled={disabled}
      onClick={onClick}
      size="lg"
    >
      {buttonLabel}
    </Button>
  );
}
