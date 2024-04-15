import { setSelectedProject } from "@/actions/project-actions";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProjectDeep } from "@/lib/types/models";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { ComponentProps } from "react";

type Props = {
  project: ProjectDeep;
  handleOptimisticSelect: ({
    projectId,
    reset,
  }: {
    projectId?: string;
    reset?: boolean;
  }) => void;
  isSelected: boolean;
  className: string;
};

const ProjectListCard = ({
  project,
  handleOptimisticSelect,
  className,
  isSelected,
}: Props) => {
  return (
    <form
      className={cn(
        " rounded-lg border p-3 text-left text-sm shadow-sm shadow-primary/30 transition-all hover:bg-accent ",
        isSelected ? `bg-opacity-25` : "",
        className
      )}
      action={async () => {
        handleOptimisticSelect({ projectId: project.id });

        await setSelectedProject(project.id);
      }}
    >
      <button
        type="submit"
        className="flex cursor-pointer flex-col items-start justify-between gap-2 w-full h-full"
      >
        <div className="flex w-full flex-col gap-1">
          <div className="flex items-start">
            <div className="flex items-center gap-2">
              <div className=" text-sm font-semibold text-left">
                {project.title}
              </div>
              {project.notifications && !project.notifications?.length && (
                <span className="flex h-2 w-2 rounded-full bg-blue-600" />
              )}
            </div>
            <div
              className={cn(
                "ml-auto text-xs",
                isSelected ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {project?.dueDate
                ? formatDistanceToNow(new Date(project?.dueDate), {
                    addSuffix: true,
                  })
                : ""}
            </div>
          </div>
          <div className="text-xs text-muted-foreground text-left">
            {project.description}
          </div>
        </div>
        {/* {hasIncompleteMilestone(project?.milestones || []) ? (
            <div className="line-clamp-2 text-xs ">
                Next Milestone:{' '}
                <span>{getNextMilestone(project?.milestones || [])}</span>
            </div>
        ) : (
            ''
        )} */}
        <div className="flex items-center gap-2">
          <Badge
            key={project.id}
            variant={getBadgeVariantFromLabel(project.isPrivate)}
          >
            {project.isPrivate ? "private" : "published"}
          </Badge>
          <div>
            <Separator orientation="vertical" />
          </div>
          {/* <div>
                <RenderMilestoneBadges items={project?.milestones || []} />
            </div> */}
        </div>
      </button>
    </form>
  );
};

export default ProjectListCard;

function getBadgeVariantFromLabel(
  label: boolean | string
): ComponentProps<typeof Badge>["variant"] {
  if (typeof label === "boolean") {
    if ([true].includes(label)) {
      return "outline";
    }

    if ([false].includes(label)) {
      return "default";
    }
  } else {
    if (["milestone"].includes(label)) {
      return "default";
    }
  }

  return "secondary";
}
