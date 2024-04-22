"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";

import { ProjectModel } from "@/lib/types/models";
import { ProjectIntent } from "@/lib/types/validation-schemas";
import { isBefore } from "date-fns";
import { useEffect, useState } from "react";
import CreateProjectModal from "./create-project-modal";
import ProjectDisplay from "./project-display";
import ProjectsList from "./project-list";

type Props = {
  projects: ProjectModel[];
};

const ProjectPage = ({ projects }: Props) => {
  const [optimisticProjects, setOptimisticProjects] =
    useState<ProjectModel[]>(projects);

  const handleOptimisticSelect = ({
    projectId,
    reset = false,
  }: {
    projectId?: string;
    reset?: boolean;
  }) => {
    let updatedProjects;
    if (reset) {
      updatedProjects = optimisticProjects.map((project) => {
        return { ...project, isSelected: false };
      });
    } else {
      updatedProjects = optimisticProjects.map((project) => {
        if (project.id === projectId) return { ...project, isSelected: true };
        return { ...project, isSelected: false };
      });
    }
    console.log("Optimistic select updated", projectId);
    setOptimisticProjects(updatedProjects);
  };

  useEffect(() => {
    console.log("UPDATED", optimisticProjects);
  }, [optimisticProjects]);

  const handleOptimisticUpdate = (
    projectData: Partial<Omit<ProjectModel, "id">> &
      Pick<ProjectModel, "id"> & { intent: keyof ProjectIntent }
  ) => {
    let updatedProjects;

    if (projectData.intent === "addDiaryNote") {
      updatedProjects = optimisticProjects.map((project) => {
        if (project.id === projectData.id) {
          // Is only ever a single note.
          const newNotes = projectData.diaryNotes ? projectData.diaryNotes : [];
          const oldNotes = project.diaryNotes ? project.diaryNotes : [];
          return { ...project, diaryNotes: [...oldNotes, ...newNotes] };
        }
        return project;
      });
    } else {
      updatedProjects = optimisticProjects.map((project) => {
        if (project.id === projectData.id)
          return { ...project, ...projectData };
        return project;
      });
    }

    setOptimisticProjects(updatedProjects);
  };

  const handleOptimisticDelete = (projectId: string) => {
    const updatedProjects = optimisticProjects.filter(
      (project) => project.id !== projectId
    );

    setOptimisticProjects(updatedProjects);
  };

  const handleOptimisticCreate = (newProject: ProjectModel) => {
    const newProjectEdited = {
      ...newProject,
      notifications: [],
      isPrivate: true,
      isSelected: true,
    };

    const temporaryProjects = optimisticProjects.map((project) => ({
      ...project,
      isSelected: false,
    }));
    temporaryProjects.push(newProjectEdited);

    setOptimisticProjects(temporaryProjects);
  };

  useEffect(() => {
    console.log(optimisticProjects);
  }, [optimisticProjects]);

  return (
    <div className="mt-10">
      <TooltipProvider delayDuration={0}>
        <div className="sticky top-0 m-auto mx-8 flex justify-center">
          <ResizablePanelGroup
            direction="horizontal"
            onLayout={(sizes: number[]) => {
              document.cookie = `react-resizable-panels:layout=${JSON.stringify(
                sizes
              )}`;
            }}
          >
            <ResizablePanel defaultSize={50} minSize={30}>
              <Tabs defaultValue="active">
                <div className="flex items-center px-4 py-2">
                  <div className="flex justify-end bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <CreateProjectModal
                      handleOptimisticCreate={handleOptimisticCreate}
                    />
                  </div>
                  <TabsList className="ml-auto">
                    <TabsTrigger
                      value="active"
                      className="text-zinc-600 dark:text-zinc-200"
                      onClick={() => {
                        const today = new Date();
                        const active = optimisticProjects
                          .filter((project) => isBefore(today, project.dueDate))
                          .some((project) => project.isSelected);
                        !active
                          ? handleOptimisticSelect({ reset: true })
                          : null;
                      }}
                    >
                      Active
                    </TabsTrigger>
                    <TabsTrigger
                      value="all"
                      className="text-zinc-600 dark:text-zinc-200"
                    >
                      All Projects
                    </TabsTrigger>
                  </TabsList>
                </div>
                <Separator />

                <TabsContent value="all" className="m-0">
                  <div className="flex flex-col gap-2 overflow-auto p-4 pt-2">
                    <ProjectsList
                      // key={`${
                      //   optimisticProjects.find((project) => project.isSelected)
                      //     ?.id
                      // }-all`}
                      projects={optimisticProjects}
                      handleOptimisticSelect={handleOptimisticSelect}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="active" className="m-0">
                  <div className="flex flex-col gap-2 overflow-auto p-4 pt-2">
                    <ProjectsList
                      // key={`${
                      //   optimisticProjects.find((project) => project.isSelected)
                      //     ?.id
                      // }-active`}
                      projects={optimisticProjects}
                      handleOptimisticSelect={handleOptimisticSelect}
                      filterActiveOnly={true}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50}>
              <ProjectDisplay
                selectedProject={optimisticProjects.find(
                  (project) => project.isSelected
                )}
                handleOptimisticUpdate={handleOptimisticUpdate}
                handleOptimisticDelete={handleOptimisticDelete}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default ProjectPage;
