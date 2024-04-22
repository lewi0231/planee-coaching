import { onSubmitAddDiaryNoteAction } from "@/actions/project-actions";
import { ProjectModel } from "@/lib/types/models";
import {
  EditProjectSchema,
  ProjectIntent,
} from "@/lib/types/validation-schemas";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { DiaryNote } from "@prisma/client";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import { format, getDate } from "date-fns";
import { PlusIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TextAreaFormField from "./textarea-form-field";
import { Button } from "./ui/button";
import { DialogContent } from "./ui/dialog";
import { Form } from "./ui/form";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
const Dialog = dynamic(
  () => import("@/components/ui/dialog").then((mod) => mod.Dialog),
  {
    ssr: false,
  }
);
const DialogTrigger = dynamic(
  () => import("@/components/ui/dialog").then((mod) => mod.DialogTrigger),
  {
    ssr: false,
  }
);
type Props = {
  selectedProject: ProjectModel;
  fieldName?: "diaryNote";
  handleOptimisticUpdate: (
    projectData: Partial<Omit<ProjectModel, "id">> &
      Pick<ProjectModel, "id"> & { intent: keyof ProjectIntent }
  ) => void;
};

const DiaryNotesModal = ({
  selectedProject,
  fieldName = "diaryNote",
  handleOptimisticUpdate,
}: Props) => {
  const form = useForm<z.output<typeof EditProjectSchema>>({
    resolver: zodResolver(EditProjectSchema),
    defaultValues: {
      intent: "addDiaryNote",
      id: selectedProject.id,
      noteId: "updatedInOnSubmit",
    },
  });
  const [isOpen, setIsOpen] = useState(false);
  const [viewEntries, setViewEntries] = useState(false);

  // const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(data: z.output<typeof EditProjectSchema>) {
    const formData = new FormData();
    formData.append("id", data.id);
    formData.append("intent", data.intent);

    switch (data.intent) {
      case "addDiaryNote": {
        const newNoteId = crypto.randomUUID();
        handleOptimisticUpdate({
          id: data.id,
          intent: data.intent,
          diaryNotes: [
            { note: data.diaryNote, id: newNoteId, createdAt: new Date() },
          ],
        });

        formData.append("noteId", newNoteId);
        formData.append("diaryNote", data.diaryNote);
        break;
      }
    }

    const response = await onSubmitAddDiaryNoteAction(formData);

    if (response.status === "error") {
      // TODO - need to provide user feedback if there was a problem.
      console.debug("Problem with form submission");
    } else {
      setIsOpen(false);
      form.reset();
    }
  }

  return (
    <>
      <div
        className={cn(
          "flex h-full w-full justify-start p-2 text-left leading-tight whitespace-normal text-sm tracking-tight font-medium",
          " bg-gray-200 m-auto rounded-lg mb-4"
        )}
      >
        {selectedProject?.diaryNotes?.sort((a, b) => {
          const aDate = new Date(a.createdAt);
          const bDate = new Date(b.createdAt);
          return aDate < bDate ? 1 : aDate > bDate ? -1 : 0;
        })[0].note ? (
          <CalendarDateFormat
            size="sm"
            diaryNote={selectedProject.diaryNotes[0]}
          />
        ) : (
          "You have no reflections yet."
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div className="flex justify-between w-full gap-8 pb-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  className={cn(
                    "w-full flex gap-2 items-center min-w-[100px]",
                    selectedProject.appearance?.background
                  )}
                  variant="outline"
                  onClick={() => setViewEntries(true)}
                >
                  <EyeOpenIcon width={16} height={16} /> View All
                </Button>
              </TooltipTrigger>
              <TooltipContent>View all diary entries</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  className={cn(
                    "w-full flex gap-2 items-center min-w-[100px]",
                    selectedProject.appearance?.background
                  )}
                  variant="outline"
                  onClick={() => setViewEntries(false)}
                >
                  <PlusIcon width={16} height={16} /> Add
                </Button>
              </TooltipTrigger>
              <TooltipContent>Add a new diary entry</TooltipContent>
            </Tooltip>
          </div>
        </DialogTrigger>
        <DialogContent className={cn(selectedProject.appearance?.background)}>
          {viewEntries && selectedProject.diaryNotes ? (
            <div className="">
              <h2 className="text-2xl font-semibold">Notes</h2>
              <div className="rounded-lg overflow-auto  p-4 flex flex-col gap-4 border-2 border-gray-400 bg-gray-100 text-gray-800 mt-4 h-fit max-h-[300px]">
                {selectedProject.diaryNotes.map((entry) => {
                  return (
                    <CalendarDateFormat key={entry.id} diaryNote={entry} />
                  );
                })}
              </div>
            </div>
          ) : (
            <Form {...form}>
              <form
                // ref={formRef}
                className=" space-y-5 w-full m-auto"
                // action={formAction}
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <TextAreaFormField
                  name={fieldName}
                  label={"Diary note"}
                  description={
                    "Reflect on you progress since your last reflection."
                  }
                  placeholder="Where have you fell short, done well etc."
                />

                <div className="w-1/2">
                  <Button className="" size="lg" type="submit">
                    Save {"Your Reflection"}
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DiaryNotesModal;

const CalendarDateFormat = ({
  diaryNote,
  size = "lg",
  isSingle = true,
}: {
  diaryNote: Pick<DiaryNote, "createdAt" | "note" | "id">;
  size?: "lg" | "sm";
  isSingle?: boolean;
}) => {
  const date = getDate(diaryNote.createdAt);
  const month = format(diaryNote.createdAt, "MMM");

  const dateSize = size === "lg" ? "text-xl" : "text-sm";
  const monthSize = size === "lg" ? "text-xs" : "text-[0.5rem]";

  return (
    <div
      key={diaryNote.id}
      className="flex font-medium items-center gap-4 w-full"
    >
      <div className="flex flex-col justify-center items-center rounded-md px-2 bg-gray-300">
        <span className={cn(dateSize)}>{date < 10 ? `0${date}` : date}</span>
        <span
          className={cn(
            "font-medium tracking-tight uppercase -mt-1.5",
            monthSize
          )}
        >
          {month}
        </span>
      </div>
      <span>{diaryNote.note}</span>
    </div>
  );
};
