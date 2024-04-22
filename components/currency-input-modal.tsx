import { onSubmitProjectEditAction } from "@/actions/project-actions";
import { ProjectModel } from "@/lib/types/models";
import {
  EditProjectSchema,
  ProjectIntent,
} from "@/lib/types/validation-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import CurrencyInputFormField from "./currency-input-form-field";
import { Button } from "./ui/button";
import { Form } from "./ui/form";

// Dynamically rendering on the client due to shadcn SSR issues.
const CustomDialog = dynamic(() => import("./custom-dialog"), { ssr: false });

type Props = {
  selectedProject: ProjectModel;
  fieldName: keyof Pick<ProjectModel, "projectValue">;
  intent: keyof Pick<ProjectIntent, "editProjectValue">;
  className?: string;
  label: string;
  handleOptimisticUpdate: (
    projectData: Partial<Omit<ProjectModel, "id">> &
      Pick<ProjectModel, "id"> & { intent: keyof ProjectIntent }
  ) => void;
  fieldDescription: string;
  Icon?: LucideIcon;
};

export default function CurrencyInputModal({
  selectedProject,
  fieldName,
  intent,
  className,
  label,
  handleOptimisticUpdate,
  fieldDescription,
  Icon,
}: Props) {
  // TODO - not currently working with useFormState - experimental (see Jack Herrington video)
  // const [state, formAction] = useFormState(onSubmitProjectEditAction, {
  //   message: "",
  // });
  const form = useForm<z.output<typeof EditProjectSchema>>({
    resolver: zodResolver(EditProjectSchema),
    defaultValues: {
      intent,
      [fieldName]: selectedProject[fieldName],
      id: selectedProject.id,
    },
  });
  const [isOpen, setIsOpen] = useState(false);

  // const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(data: z.output<typeof EditProjectSchema>) {
    const formData = new FormData();
    formData.append("id", data.id);
    formData.append("intent", data.intent);

    switch (data.intent) {
      case "editTitle": {
        formData.append("title", data.title);
        break;
      }
      case "editDescription": {
        formData.append("description", data.description);
        break;
      }
    }

    const response = await onSubmitProjectEditAction(formData);
    // TODO - may want to include server error feedback in form.
    if (response.status === "error") return;

    handleOptimisticUpdate(data);
    setIsOpen(false);
  }

  return (
    <CustomDialog
      className={cn(className, "justify-end")}
      triggerContent={
        Icon ? (
          <Icon className="w-4 h-4" strokeWidth={1} />
        ) : (
          selectedProject[fieldName]
        )
      }
      triggerStyle="ghost"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      backgroundContentColor={selectedProject.appearance?.background}
    >
      <Form {...form}>
        <form
          // ref={formRef}
          className=" space-y-5 w-1/2 m-auto"
          // action={formAction}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <CurrencyInputFormField
            name={fieldName}
            label={label}
            description={fieldDescription}
            className="bg-white"
          />
          <div className="w-1/2">
            <Button className="" size="lg" type="submit">
              Save {label}
            </Button>
          </div>
        </form>
      </Form>
    </CustomDialog>
  );
}
