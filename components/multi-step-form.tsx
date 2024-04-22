"use client";

import { onSubmitCreateProjectAction } from "@/actions/project-actions";
import { Form } from "@/components/ui/form";
import { useProgress } from "@/lib/hooks/useProgress";
import { CreateProjectType } from "@/lib/types/form-fields";
import { CreateProjectSchema } from "@/lib/types/validation-schemas";
import { cn, getRandomColorCombination } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AnimatedText from "./animated-text";
import CurrencyInputFormField from "./currency-input-form-field";
import DateTimeField from "./datetime-field";
import InputFormField from "./input-form-field";
import SliderInputFormField from "./slider-input-form-field";
import TextAreaFormField from "./textarea-form-field";
import { Button } from "./ui/button";

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
      appearance: {
        ...getRandomColorCombination(),
        icon: "CameraIcon",
      },
      // TODO - need to implement dynamic icons
    },
  });

  const formInputSequence = [
    <AnimatedText
      key="text-01"
      duration={5}
      delay={0.3}
      text={[
        "Psychological research has consistently shown that individuals who engage in effective goal-setting strategies are more likely to attain their desired outcomes.",
        "That is what we're going to help you with, now!",
        "If you would prefer not to have assistance, click the 'go to form' link",
      ]}
    />,

    <InputFormField
      name="title"
      label="Project Title"
      key="title"
      description="Name your project something memorable!"
    />,

    <TextAreaFormField
      name="description"
      label="Project Description"
      key="description"
      description="Describe your project as best you can, you can edit this later (if you need to)!"
    />,
    <TextAreaFormField
      name="motivation"
      label="Project Motivation"
      key="motivation"
      description="What motivates you to complete this project? Click next!"
    />,
    <TextAreaFormField
      name="barriers"
      label="Project Barriers"
      key="barriers"
      description="What stands in your way from completing this project?"
    />,
    <CurrencyInputFormField
      key="projectValue"
      name="projectValue"
      label="Project Value"
      description="If money was no object, how much would you be willing to pay someone to complete this for you?"
      placeholder="1000.00"
    />,
    <InputFormField
      name="reward"
      label="Project Reward"
      key="reward"
      description="What do you promise to give yourself once you've completed this?"
    />,

    <DateTimeField
      label="Project Deadline"
      key="dueDate"
      name="dueDate"
      description="If you had to pay someone to do this for you, how much would you pay?!"
      className="w-2/3"
    />,
    <SliderInputFormField
      name="confidence"
      label="Project Confidence"
      key="confidence"
      description="How confident are you that you'll be able to complete this without support?"
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
    formData.append("barriers", data.barriers);
    formData.append("confidence", String(data.confidence));
    formData.append("dueDate", data.dueDate);
    formData.append("reward", data.reward);
    formData.append("projectValue", data.projectValue);
    formData.append(
      "appearance",
      JSON.stringify({
        background: data.appearance.background,
        foreground: data.appearance.foreground,
        icon: "CameraIcon",
      })
    );

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
        className=" flex flex-col items-center text-lg h-full gap-10 w-2/3 m-auto"
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
