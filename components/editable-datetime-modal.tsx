import { onSubmitProjectEditAction } from "@/actions/project-actions";
import { ProjectModel } from "@/lib/types/models";
import {
  EditProjectSchema,
  ProjectIntent,
} from "@/lib/types/validation-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, getDate } from "date-fns";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DateTimeField from "./datetime-field";
import { Button } from "./ui/button";
import { Form } from "./ui/form";

// Dynamically rendering on the client due to shadcn SSR issues.
const CustomDialog = dynamic(() => import("./custom-dialog"), { ssr: false });

type Props = {
  project: ProjectModel;
  handleOptimisticUpdate: (
    projectData: Partial<Omit<ProjectModel, "id">> &
      Pick<ProjectModel, "id"> & { intent: keyof ProjectIntent }
  ) => void;
};

const EditableDateTimeModal = ({ project, handleOptimisticUpdate }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.output<typeof EditProjectSchema>>({
    resolver: zodResolver(EditProjectSchema),
    reValidateMode: "onChange",
    defaultValues: {
      dueDate: project.dueDate,
      intent: "editDueDate",
      id: project.id,
    },
  });

  async function onSubmit(data: z.output<typeof EditProjectSchema>) {
    if (data.intent === "editDueDate") {
      const formData = new FormData();
      formData.append("id", data.id);
      formData.append("dueDate", data.dueDate);
      formData.append("intent", data.intent);

      handleOptimisticUpdate(data);

      const response = await onSubmitProjectEditAction(formData);

      setIsOpen(false);
      console.debug(response);
    }
  }

  return (
    <CustomDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      triggerContent={
        <div className="flex flex-col justify-center items-center tracking-tighter">
          <span className="text-2xl">
            {getDate(project.dueDate) < 10
              ? `0${getDate(project.dueDate)}`
              : getDate(project.dueDate)}
          </span>
          <span className="text-sm -mt-1 uppercase tracking-normal font-medium">
            {format(project.dueDate, "MMM")}
          </span>
        </div>
      }
      modalLabel="Due Date"
      triggerStyle="ghost"
      className="text-xs text-opacity-75 justify-end w-fit px-4"
      backgroundContentColor={project.appearance?.background}
    >
      <Form {...form}>
        <form className=" space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <DateTimeField
            name={"dueDate"}
            description="Click save when you're happy with your new project end date!"
          />
          <div className="w-1/2 ">
            <Button type="submit" size="lg">
              Save
            </Button>
          </div>
        </form>
      </Form>
    </CustomDialog>
  );
};

export default EditableDateTimeModal;
