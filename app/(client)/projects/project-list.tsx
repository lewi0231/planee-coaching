import { ProjectModel } from "@/lib/types/models";
import { isBefore } from "date-fns";
import ProjectListCard from "./project-list-card";

type Props = {
  projects: ProjectModel[];
  handleOptimisticSelect: ({
    projectId,
    reset,
  }: {
    projectId?: string;
    reset?: boolean;
  }) => void;
  filterActiveOnly?: boolean;
};

const ProjectsList = ({
  projects,
  handleOptimisticSelect,
  filterActiveOnly = false,
}: Props) => {
  const today = new Date();

  return (
    <>
      {filterActiveOnly
        ? projects
            .filter((project) => isBefore(today, project.dueDate))
            .map((project) => {
              return (
                <ProjectListCard
                  key={project.id + "-" + project.isSelected}
                  project={project}
                  isSelected={project.isSelected ?? false}
                  handleOptimisticSelect={handleOptimisticSelect}
                  className={`${project.appearance?.background} ${project.appearance?.foreground}`}
                />
              );
            })
        : projects.map((project) => {
            return (
              <ProjectListCard
                key={project.id + "-" + project.isSelected}
                project={project}
                isSelected={project.isSelected ?? false}
                handleOptimisticSelect={handleOptimisticSelect}
                className={`${project.appearance?.background} ${project.appearance?.foreground}`}
              />
            );
          })}
    </>
  );
};

export default ProjectsList;
