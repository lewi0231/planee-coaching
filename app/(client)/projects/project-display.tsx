import { deleteProjectAction } from "@/actions/project-actions";
import DisplayCard from "@/components/display-card";
import EditableDateTimeModal from "@/components/editable-datetime-modal";
import EditableInputModal from "@/components/editable-input-modal";
import EditableTextareaModal from "@/components/editable-textarea-modal";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ProjectModel } from "@/lib/types/models";
import {
  DollarSignIcon,
  Gift,
  MilestoneIcon,
  NotebookIcon,
} from "lucide-react";

import CurrencyInputModal from "@/components/currency-input-modal";
import DiaryNotesModal from "@/components/diary-notes-modal";
import { ProjectIntent } from "@/lib/types/validation-schemas";
import {
  CameraIcon,
  ClockIcon,
  DotsVerticalIcon,
  RocketIcon,
  StopIcon,
  TrashIcon,
} from "@radix-ui/react-icons";

type Props = {
  selectedProject: ProjectModel | undefined;
  handleOptimisticUpdate: (
    projectData: Partial<Omit<ProjectModel, "id">> &
      Pick<ProjectModel, "id"> & { intent: keyof ProjectIntent }
  ) => void;
  handleOptimisticDelete: (projectId: string) => void;
};

const testNote =
  "this is a note that I am using for testing the application it is my previous note";

const ProjectDisplay = ({
  selectedProject,
  handleOptimisticUpdate,
  handleOptimisticDelete,
}: Props) => {
  const today = new Date();

  return (
    <div className="flex min-h-[100vh] flex-col">
      {selectedProject ? (
        <div className="flex flex-1 flex-col">
          <div className="grid grid-cols-4 items-start justify-between gap-2 p-2 pt-0">
            <div className=" col-span-3 flex items-center  gap-4 text-sm">
              <Avatar>
                <AvatarFallback
                  className={selectedProject.appearance?.background}
                >
                  <CameraIcon width={20} height={20} />
                  {/* <DynamicIcon
										name={selectedProject.appearance.icon}
										size={22}
									/> */}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-0">
                <EditableInputModal
                  key={`${selectedProject.id}-title`}
                  fieldName="title"
                  selectedProject={selectedProject}
                  intent={"editTitle"}
                  className={"font-bold text-xl"}
                  label={"Project Title"}
                  handleOptimisticUpdate={handleOptimisticUpdate}
                  fieldDescription="Edit your project title and click save."
                />
                <div className="line-clamp-1 text-sm">
                  <EditableTextareaModal
                    key={`${selectedProject.id}-description`}
                    fieldName="description"
                    selectedProject={selectedProject}
                    intent={"editDescription"}
                    className={""}
                    label={"Project Description"}
                    handleOptimisticUpdate={handleOptimisticUpdate}
                    fieldDescription="Change your project description and click save."
                  />
                </div>
              </div>
            </div>
            <div className="col-span-1 flex justify-end items-center h-full">
              <EditableDateTimeModal
                key={`${selectedProject.id}-dueDate`}
                project={selectedProject}
                handleOptimisticUpdate={handleOptimisticUpdate}
              />
            </div>
          </div>
          <div className="flex items-center justify-between p-2 pb-0">
            <div className="flex items-center  gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={!selectedProject}
                    onClick={async () => {
                      const result = await deleteProjectAction(
                        selectedProject.id
                      );
                      if (result.status === "error")
                        console.error(result.message);

                      handleOptimisticDelete(selectedProject.id);
                    }}
                  >
                    <TrashIcon className="h-4 w-4" />
                    <span className="sr-only">Delete Project</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Delete Project</TooltipContent>
              </Tooltip>
              <Separator orientation="vertical" className="mx-1 h-6" />
              <Tooltip>
                <Popover>
                  <PopoverTrigger asChild>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={!selectedProject}
                      >
                        <ClockIcon className="h-4 w-4" />
                        <span className="sr-only">Change Due Date</span>
                      </Button>
                    </TooltipTrigger>
                  </PopoverTrigger>
                  <PopoverContent className="flex w-[535px] p-0"></PopoverContent>
                </Popover>
                {/* TODO - this is yet to be implemented - Promodoro timer */}
                <TooltipContent>Start timer</TooltipContent>
              </Tooltip>
              <Separator orientation="vertical" className="mx-1 h-6" />
              <Tooltip>
                <TooltipTrigger>
                  <EditableInputModal
                    key={`${selectedProject.id}-reward`}
                    fieldName="reward"
                    selectedProject={selectedProject}
                    intent={"editReward"}
                    className={"font-bold text-xl"}
                    label={"Reward"}
                    handleOptimisticUpdate={handleOptimisticUpdate}
                    fieldDescription="Edit and save if you can think of a better reward!  Better ~ Motivation."
                    Icon={Gift}
                  />
                </TooltipTrigger>

                {/* TODO - this is yet to be implemented - Promodoro timer */}
                <TooltipContent>View or Edit Your Reward!</TooltipContent>
              </Tooltip>
            </div>

            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={!selectedProject}
                  >
                    <DotsVerticalIcon className="h-4 w-4" />
                    <span className="sr-only">More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Mark as Complete</DropdownMenuItem>
                  <DropdownMenuItem>Publicize</DropdownMenuItem>
                  <DropdownMenuItem>Add Diary Entry</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <Separator />

          <div className="grid h-auto w-full grid-cols-2 gap-1 overflow-auto">
            <DisplayCard
              selectedProject={selectedProject}
              cardTitle="Barriers"
              Icon={StopIcon}
              className=" bg-white m-auto rounded-md p-0 mb-4 outline-2 outline-offset-2 hover:outline outline-gray-600"
            >
              <EditableTextareaModal
                key={`${selectedProject.id}-barriers`}
                selectedProject={selectedProject}
                label="Barriers"
                fieldName="barriers"
                intent="editBarriers"
                handleOptimisticUpdate={handleOptimisticUpdate}
                className=""
                fieldDescription="Have a think about what stands in your way from achieving this goal."
              />
            </DisplayCard>
            <DisplayCard
              selectedProject={selectedProject}
              cardTitle="Motivation"
              Icon={RocketIcon}
              className=" bg-white m-auto rounded-md p-0 mb-4 outline-2 outline-offset-2 hover:outline outline-gray-600"
            >
              <EditableTextareaModal
                key={`${selectedProject.id}-motivation`}
                selectedProject={selectedProject}
                label="Motivation"
                fieldName="motivation"
                intent="editMotivation"
                handleOptimisticUpdate={handleOptimisticUpdate}
                className=""
                fieldDescription="Why is that you want to achieve this goal?"
              />
            </DisplayCard>
            <DisplayCard
              selectedProject={selectedProject}
              cardTitle="Your Diary"
              Icon={NotebookIcon}
              description="Your last diary entry"
              className="p-0"
            >
              <DiaryNotesModal
                selectedProject={selectedProject}
                handleOptimisticUpdate={handleOptimisticUpdate}
                fieldName="diaryNote"
              />
            </DisplayCard>
            <DisplayCard
              selectedProject={selectedProject}
              cardTitle="Value"
              Icon={DollarSignIcon}
              description="The value you've placed on this project"
              className=" bg-white m-auto rounded-md p-0 mb-4 outline-2 outline-offset-2 hover:outline outline-gray-600 w-1/2"
            >
              <CurrencyInputModal
                handleOptimisticUpdate={handleOptimisticUpdate}
                selectedProject={selectedProject}
                fieldName="projectValue"
                label="Project Value"
                fieldDescription="What value you place on this project"
                intent="editProjectValue"
              />
            </DisplayCard>
            <DisplayCard
              selectedProject={selectedProject}
              cardTitle="Milestones"
              Icon={MilestoneIcon}
              className=" bg-white m-auto rounded-md p-0 mb-4 outline-2 outline-offset-2 hover:outline outline-gray-600"
              description="Your next milestone is..."
            >
              Milestones here
            </DisplayCard>

            {/* <Card
							className={cn(
								'flex flex-col p-2',
								`${selectedProject.appearance.background} hover:${selectedProject.appearance.background}/90`,
							)}
						>
							<CardHeader className="p-2">
								<CardTitle className="flex justify-between">
									<div className="flex items-center gap-4">
										<Gem size={18} />
										Project Worth{' '}
									</div>
									<span>
										<UploadCloud size={16} />
									</span>
								</CardTitle>
								<CardDescription className=" text-xs">
									What the project is worth to you (personally)
								</CardDescription>
							</CardHeader>

							<CardContent className="flex flex-grow items-center justify-center p-0">
								<EditableCurrencyInputForm
									formName={`budget-form-${selectedProject.id}`}
									// selectedProject={selectedProject}
								/>
							</CardContent>
						</Card>
            
						<TaskListCard selectedProject={selectedProject} className="" /> */}
            {/* <EditableRichTextModal
							cardLabel="Motivation"
							cardDescription="What motivates you"
							fieldName="motivation"
							intent="updateProjectMotivation"
							cardClass="bg-secondary/75 hover:bg-secondary/95"
						/> */}
            {/* <EditableMilestonesCard selectedProject={selectedProject} /> */}
            {/* <DiaryNotesCard selectedProject={selectedProject} className="" />
						<EditableRichTextModal
							cardLabel="Your Barriers"
							cardDescription="What stands in your way from achieving this goal"
							fieldName="barriers"
							intent="updateProjectBarriers"
							cardClass=""
						/> */}
          </div>

          <Separator className="mt-auto" />
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          No task selected
        </div>
      )}
    </div>
  );
};

export default ProjectDisplay;
