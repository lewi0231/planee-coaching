import { ProjectModel } from "@/lib/types/models";
import { ProjectIntent } from "@/lib/types/validation-schemas";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useState } from "react";
import CustomDialog from "./custom-dialog";

type Props = {
  selectedProject: ProjectModel;
  fieldName: Pick<ProjectModel, "milestones">;
  intent: keyof Pick<ProjectIntent, "editMilestones">;
  className?: string;
  label: string;
  handleOptimisticUpdate: (
    projectData: Partial<Omit<ProjectModel, "id">> &
      Pick<ProjectModel, "id"> & { intent: keyof ProjectIntent }
  ) => void;
  fieldDescription: string;
  Icon?: LucideIcon;
};

const MilestoneInputModal = ({
  selectedProject,
  fieldName,
  fieldDescription,
  intent,
  className,
  label,
  handleOptimisticUpdate,
  Icon,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

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
      hello
    </CustomDialog>
  );
};

export default MilestoneInputModal;
