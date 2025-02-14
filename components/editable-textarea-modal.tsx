import { onSubmitProjectEditAction } from "@/actions/project-actions";
import { ProjectModel } from "@/lib/types/models";
import {
  EditProjectSchema,
  ProjectIntent,
  ProjectIntents,
} from "@/lib/types/validation-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TextAreaFormField from "./textarea-form-field";
import { Button } from "./ui/button";
import { Form } from "./ui/form";

const CustomDialog = dynamic(() => import("./custom-dialog"), { ssr: false });

type Props = {
  selectedProject: ProjectModel;
  fieldName: keyof Pick<
    ProjectModel,
    "title" | "description" | "motivation" | "barriers"
  >;
  intent: keyof Omit<typeof ProjectIntents, "addDiaryNote">;
  className: string;
  label: string;
  handleOptimisticUpdate: (
    projectData: Partial<Omit<ProjectModel, "id">> &
      Pick<ProjectModel, "id"> & { intent: keyof ProjectIntent }
  ) => void;
  fieldDescription: string;
};

export default function EditableTextareaModal({
  selectedProject,
  fieldName,
  intent,
  className,
  label,
  fieldDescription,
  handleOptimisticUpdate,
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
      case "editDescription": {
        formData.append("description", data.description);
        break;
      }
      case "editBarriers": {
        formData.append("barriers", data.barriers);
        break;
      }
      case "editMotivation": {
        formData.append("motivation", data.motivation);
        break;
      }
    }

    handleOptimisticUpdate(data);

    const response = await onSubmitProjectEditAction(formData);

    if (response.status === "error") {
      // TODO - need to provide user feedback if there was a problem.
      console.debug("Problem with form submission");
    } else {
      setIsOpen(false);
    }
  }

  return (
    <CustomDialog
      className={className}
      triggerContent={selectedProject[fieldName]}
      triggerStyle="ghost"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      backgroundContentColor={selectedProject.appearance?.background}
    >
      <Form {...form}>
        <form
          // ref={formRef}
          className=" space-y-5 w-full m-auto"
          // action={formAction}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <TextAreaFormField
            name={fieldName}
            label={label}
            description={fieldDescription}
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
