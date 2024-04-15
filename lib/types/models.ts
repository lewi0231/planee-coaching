import { type Appearance, type Notification } from "@prisma/client";

export type ProjectDeep = {
  id: string;
  title: string;
  description: string;
  motivation: string;
  barriers: string;
  confidence: number;
  reward: string;
  projectValue: string;
  dueDate: string;
  isSelected: boolean;
  notifications?: Notification[];
  appearance?: Appearance;
  appearanceId?: string;
  isPrivate: boolean;
};
