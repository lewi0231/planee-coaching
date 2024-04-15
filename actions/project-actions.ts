"use server";

import {
  CreateProjectSchema,
  EditProjectSchema,
} from "@/lib/types/validation-schemas";
import { getRandomColorCombination } from "@/lib/utils";
import { getRandomIconName } from "@/lib/utils/dynamic-icons";
import prisma from "@/prisma/db";
import { z } from "zod";

export type FormState = {
  status: "success" | "error";
  message: string;
};

export async function getProjectData() {
  const projects = await prisma.project.findMany({
    include: {
      appearance: true,
      notifications: true,
    },
    orderBy: {
      dueDate: "asc",
    },
  });
  console.log(projects.map((project) => project.id).join(" "));
  return projects;
}

export async function setSelectedProject(
  projectId: string
): Promise<FormState> {
  await prisma.project.updateMany({
    where: {
      id: {
        not: projectId,
      },
    },
    data: {
      isSelected: false,
    },
  });

  const selectedProject = await prisma.project.update({
    where: {
      id: projectId,
    },
    data: {
      isSelected: true,
    },
  });

  if (!selectedProject)
    return { status: "error", message: "Failed to Update Selected Project" };

  console.debug("Server Action: Updated selected project", projectId);
  return {
    status: "success",
    message: `Successfully Updated Selected Project`,
  };
}

// This actions is solely for project field updates of any type
export async function onSubmitProjectEditAction(
  // prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = EditProjectSchema.safeParse(formData);

  if (!parsed.success) {
    console.error("Server Action: formData Error:", parsed);
    return {
      status: "error",
      message: "Invalid form data",
    };
  }

  let updateObject;
  switch (parsed.data.intent) {
    case "editTitle": {
      updateObject = { title: parsed.data.title };
      break;
    }
    case "editDescription": {
      updateObject = { description: parsed.data.description };
      break;
    }
    default: {
      updateObject = {};
    }
  }

  await prisma.project.update({
    where: {
      id: parsed.data.id,
    },
    data: {
      ...updateObject,
    },
  });

  return {
    status: "success",
    message: "Project edited",
  };
}

// action helper function
async function createProject({
  // userId,
  id,
  title,
  description,
  motivation,
  dueDate,
  projectValue,
  reward,
  confidence,
  barriers,
}: z.output<typeof CreateProjectSchema>) {
  try {
    const icon = getRandomIconName();
    const { foreground, background } = getRandomColorCombination();
    const existingAppearance = await prisma.appearance.findUnique({
      where: {
        foreground_background_icon: {
          foreground,
          background,
          icon,
        },
      },
    });

    return await prisma.project.create({
      data: {
        id,
        title,
        description,
        motivation,
        dueDate,
        projectValue,
        reward,
        confidence,
        barriers,
        notifications: {
          create: {
            message: "Well done!  Good luck!",
          },
        },
        appearance: existingAppearance
          ? {
              connect: {
                id: existingAppearance.id,
              },
            }
          : {
              create: {
                foreground,
                background,
                icon,
              },
            },
      },
    });
  } catch (error) {
    throw new Error(`Database Error: ${error}`);
  }
}

export async function onSubmitCreateProjectAction(
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data);

  const parsed = CreateProjectSchema.safeParse({
    ...formData,
    confidence: parseInt(formData.confidence as string),
  });

  if (!parsed.success) {
    console.error("Server Action: formData Error:", parsed);
    return {
      status: "error",
      message: "Invalid form data",
    };
  }

  await createProject(parsed.data);

  return {
    status: "success",
    message: "Project edited",
  };
}

export async function deleteProjectAction(projectId: string) {
  try {
    const deletedProject = await prisma.project.delete({
      where: {
        id: projectId,
      },
    });
    if (!deletedProject)
      return { status: "error", message: "No project found with that Id" };
    return {
      status: "success",
      message: "Successfully deleted project" + projectId,
    };
  } catch (error) {
    return {
      message: "There was a problem deleting that project",
      status: "error",
    };
  }
}
