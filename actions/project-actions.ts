"use server";

import { addDiaryNoteToProject } from "@/lib/db/diary-note";
import { createNewProjectInDatabase } from "@/lib/db/project";
import {
  CreateProjectSchema,
  EditProjectSchema,
} from "@/lib/types/validation-schemas";

import prisma from "@/prisma/db";

export type FormState = {
  status: "success" | "error";
  message: string;
};

export async function getProjectData() {
  const projects = await prisma.project.findMany({
    include: {
      appearance: true,
      notifications: true,
      diaryNotes: true,
      milestones: true,
    },
    orderBy: {
      dueDate: "asc",
    },
  });

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

  console.log(formData);
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
    case "editDueDate": {
      updateObject = { dueDate: parsed.data.dueDate };
      break;
    }
    case "editBarriers": {
      updateObject = { barriers: parsed.data.barriers };
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

export async function onSubmitAddDiaryNoteAction(
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = EditProjectSchema.safeParse(formData);

  console.log("Diary note form data", formData);
  if (!parsed.success) {
    console.error("Server Action: formData Error:", parsed);
    return {
      status: "error",
      message: "Invalid form data",
    };
  }

  if (parsed.data.intent !== "addDiaryNote") {
    return {
      status: "error",
      message: "Incorrent intent",
    };
  }

  const result = await addDiaryNoteToProject(parsed.data.id, {
    id: parsed.data.noteId,
    note: parsed.data.diaryNote,
    createdAt: new Date(),
  });

  if (!result) {
    return {
      status: "error",
      message: "There was a problem retrieving existing diary notes",
    };
  }

  return {
    status: "success",
    message: "Project Diary Note Added",
  };
}

async function getProjectDiaryNotes(id: string) {
  try {
    return await prisma.diaryNote.findMany({
      where: {
        projectId: id,
      },
    });
  } catch (error) {
    console.error("DB Error: unable to retrieve diary notes for projectId", id);
    return;
  }
}

export async function onSubmitCreateProjectAction(
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  console.log("Testing what formData looks like: ", formData);

  const parsed = CreateProjectSchema.safeParse({
    ...formData,
    confidence: parseInt(formData.confidence as string),
    appearance: JSON.parse(formData.appearance as string),
  });

  if (!parsed.success) {
    console.error("Server Action: formData Error:", parsed);
    return {
      status: "error",
      message: "Invalid form data",
    };
  }

  await createNewProjectInDatabase(parsed.data);

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
