import prisma from "@/prisma/db";

export async function addDiaryNoteToProject(
  projectId: string,
  { note, id, createdAt }: { note: string; id: string; createdAt: Date }
) {
  try {
    return await prisma.diaryNote.create({
      data: {
        projectId,
        note,
        id,
        createdAt,
      },
    });
  } catch (error) {
    console.error("unable to create note", error);
  }
}
