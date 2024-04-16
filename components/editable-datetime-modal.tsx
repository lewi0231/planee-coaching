import { onSubmitProjectEditAction } from "@/actions/project-actions";
import { ProjectDeep } from "@/lib/types/models";
import { EditProjectSchema } from "@/lib/types/validation-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomDialog from "./custom-dialog";
import DateTimeField from "./datetime-field";
import { Button } from "./ui/button";
import { Form } from "./ui/form";

type Props = {
  project: ProjectDeep;
  handleOptimisticUpdate: (projectData: Partial<ProjectDeep>) => void;
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
        <div>
          <span className="text-xs">Due: </span>
          <span className="underline text-sm">
            {formatDistanceToNow(project.dueDate)}
          </span>
        </div>
      }
      modalLabel="Due Date"
      triggerStyle="ghost"
      className="text-xs text-opacity-75"
    >
      <Form {...form}>
        <form className="" onSubmit={form.handleSubmit(onSubmit)}>
          <DateTimeField
            name={"dueDate"}
            description="Click save when you're happy with your new project end date!"
          />
          <Button type="submit" size="lg">
            Save
          </Button>
        </form>
      </Form>
    </CustomDialog>
  );
};

export default EditableDateTimeModal;
