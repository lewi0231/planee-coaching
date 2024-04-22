import prisma from "@/prisma/db";
import { z } from "zod";
import { CreateProjectSchema } from "../types/validation-schemas";

// action helper function
export async function createNewProjectInDatabase({
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
  appearance,
}: z.output<typeof CreateProjectSchema>) {
  try {
    const existingAppearance = await prisma.appearance.findUnique({
      where: {
        foreground_background_icon: {
          foreground: appearance.foreground,
          background: appearance.background,
          icon: appearance.icon,
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
                foreground: appearance.foreground,
                background: appearance.background,
                icon: appearance.icon,
              },
            },
      },
    });
  } catch (error) {
    throw new Error(`Database Error: ${error}`);
  }
}
