import { onSubmitProjectEditAction } from "@/actions/project-actions";
import { CreateProjectType } from "@/lib/types/form-fields";
import { ProjectDeep } from "@/lib/types/models";
import {
  EditProjectSchema,
  ProjectIntents,
} from "@/lib/types/validation-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomDialog from "./custom-dialog";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

export default function EditableInputModal({
  selectedProject,
  fieldName,
  intent,
  className,
  label,
  handleOptimisticUpdate,
}: {
  selectedProject: ProjectDeep;
  fieldName: keyof Pick<CreateProjectType, "title" | "description">;
  intent: keyof typeof ProjectIntents;
  className: string;
  label: string;
  handleOptimisticUpdate: (projectData: Partial<ProjectDeep>) => void;
}) {
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
      className={className}
      triggerContent={selectedProject[fieldName]}
      triggerStyle="ghost"
      modalLabel={label}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <Form {...form}>
        <form
          // ref={formRef}
          className=" space-y-3"
          // action={formAction}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormControl>
                  <Input placeholder="enter" {...field} />
                </FormControl>
                <FormDescription className="pl-3">
                  Click <em>Save Me</em> when you have finished editing!
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="id"
            render={({ field }) => (
              <FormItem>
                <Input {...field} type="hidden" />
              </FormItem>
            )}
          />
          <FormField
            name="intent"
            render={({ field }) => (
              <FormItem>
                <Input {...field} type="hidden" />
              </FormItem>
            )}
          />
          <Button className="w-1/2" size="lg" type="submit">
            Save {label}
          </Button>
        </form>
      </Form>
    </CustomDialog>
  );
}
