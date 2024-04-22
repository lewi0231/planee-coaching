import {
  Appearance,
  DiaryNote,
  Project,
  type Notification,
} from "@prisma/client";

export type ProjectModel = (Pick<
  Project,
  | "id"
  | "dueDate"
  | "motivation"
  | "barriers"
  | "description"
  | "title"
  | "reward"
  | "projectValue"
  | "confidence"
> &
  Partial<Project>) & {
  diaryNotes?: (Partial<DiaryNote> &
    Pick<DiaryNote, "createdAt" | "note" | "id">)[];
} & { notifications?: Partial<Notification>[] } & {
  appearance?: Partial<Appearance> | null;
};
