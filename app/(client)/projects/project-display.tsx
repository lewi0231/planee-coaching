import { deleteProjectAction } from "@/actions/project-actions";
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
import { ProjectDeep } from "@/lib/types/models";
import { ClockIcon, DotsVerticalIcon, TrashIcon } from "@radix-ui/react-icons";
import { addDays, addHours, format, nextSaturday } from "date-fns";

type Props = {
  selectedProject: ProjectDeep | undefined;
  handleOptimisticUpdate: (projectData: Partial<ProjectDeep>) => void;
  handleOptimisticDelete: (projectId: string) => void;
};

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
                  {/* <DynamicIcon
										name={selectedProject.appearance.icon}
										size={22}
									/> */}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <EditableInputModal
                  key={`${selectedProject.id}-title`}
                  fieldName="title"
                  selectedProject={selectedProject}
                  intent={"editTitle"}
                  className={"font-bold text-xl"}
                  label={"Project Title"}
                  handleOptimisticUpdate={handleOptimisticUpdate}
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
                  />
                </div>
              </div>
            </div>
            <div className="col-span-1">
              {/* <NativeDateTimePicker
								// selectedProject={selectedProject}
								className=" text-xs text-primary/75"
							/> */}
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
                  <PopoverContent className="flex w-[535px] p-0">
                    <div className="flex flex-col gap-2 border-r px-2 py-4">
                      <div className="px-4 text-sm font-medium">
                        New Due Date
                      </div>
                      <div className="grid min-w-[250px] gap-1">
                        <Button
                          variant="ghost"
                          className="justify-start font-normal"
                        >
                          Later today{" "}
                          <span className="ml-auto text-muted-foreground">
                            {format(addHours(today, 4), "E, h:m b")}
                          </span>
                        </Button>
                        <Button
                          variant="ghost"
                          className="justify-start font-normal"
                        >
                          Tomorrow
                          <span className="ml-auto text-muted-foreground">
                            {format(addDays(today, 1), "E, h:m b")}
                          </span>
                        </Button>
                        <Button
                          variant="ghost"
                          className="justify-start font-normal"
                        >
                          This weekend
                          <span className="ml-auto text-muted-foreground">
                            {format(nextSaturday(today), "E, h:m b")}
                          </span>
                        </Button>
                        <Button
                          variant="ghost"
                          className="justify-start font-normal"
                        >
                          Next week
                          <span className="ml-auto text-muted-foreground">
                            {format(addDays(today, 7), "E, h:m b")}
                          </span>
                        </Button>
                      </div>
                    </div>
                    <div className="p-2">{/* <Calendar /> */}</div>
                  </PopoverContent>
                </Popover>
                {/* TODO - this is yet to be implemented - Promodoro timer */}
                <TooltipContent>Start timer</TooltipContent>
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

          <div className=" grid h-screen w-full grid-cols-2 gap-1 overflow-auto">
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
