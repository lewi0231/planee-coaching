import { isValid, parseISO } from "date-fns";
import { z } from "zod";

const projectValidationObject = {
  id: z.string().min(1, "This is too short for an id."),
  intent: z.literal("createProject"),
  title: z.string().min(1, "You need to enter at least one character."),
  description: z.string().min(1, "You need to enter at least one character."),
  motivation: z.string().min(1, "This one is a little short."),
  barriers: z.string().min(1, "You need to enter at least one character."),
  confidence: z.number().min(1).max(7),
  projectValue: z.string(),
  reward: z.string().min(1, "You need to enter at least one character."),
  dueDate: z.string().refine((val) => isValid(parseISO(val))),
};

export const CreateProjectSchema = z.object({
  id: projectValidationObject.id,
  intent: z.literal("createProject"),
  title: projectValidationObject.title,
  description: projectValidationObject.description,
  motivation: projectValidationObject.motivation,
  barriers: projectValidationObject.barriers,
  confidence: projectValidationObject.confidence,
  projectValue: projectValidationObject.projectValue,
  reward: projectValidationObject.reward,
  dueDate: projectValidationObject.dueDate,
  background: z.string(),
  foreground: z.string(),
  icon: z.string(),
});

export const ProjectIntents = {
  editTitle: z.literal("editTitle"),
  editDescription: z.literal("editDescription"),
  editDueDate: z.literal("editDueDate"),
  editMotivation: z.literal("editMotivation"),
  editBarriers: z.literal("editBarriers"),
};

export const EditProjectSchema = z.discriminatedUnion("intent", [
  z.object({
    intent: ProjectIntents.editTitle,
    title: projectValidationObject.title,
    id: projectValidationObject.id,
  }),
  z.object({
    intent: ProjectIntents.editDescription,
    description: projectValidationObject.description,
    id: projectValidationObject.id,
  }),
  z.object({
    intent: ProjectIntents.editDueDate,
    dueDate: projectValidationObject.dueDate,
    id: projectValidationObject.id,
  }),
  z.object({
    intent: ProjectIntents.editMotivation,
    motivation: projectValidationObject.motivation,
    id: projectValidationObject.id,
  }),
  z.object({
    intent: ProjectIntents.editBarriers,
    barriers: projectValidationObject.barriers,
    id: projectValidationObject.id,
  }),
]);

export const DeleteProjectSchema = z.object({
  id: z.string().min(1),
});

// export const validation_object_intents = {
//   createProject: z.object({
//     id: VALIDATION_OBJECT.id,
//     intent: z.literal("createProject"),
//     description: VALIDATION_OBJECT.description,
//     motivation: VALIDATION_OBJECT.motivation,
//     title: VALIDATION_OBJECT.title,
//     barriers: VALIDATION_OBJECT.barriers,
//     confidence: VALIDATION_OBJECT.confidence,
//     dueDate: VALIDATION_OBJECT.dueDate,
//     budget: VALIDATION_OBJECT.budget,
//     background: z.string(),
//     foreground: z.string(),
//     icon: z.string(),
//   }),
//   updateProjectMilestones: z.object({
//     intent: z.literal("updateProjectMilestones"),
//     id: z.string(),
//     milestones: VALIDATION_OBJECT.milestones,
//   }),
//   updateProjectMotivation: z.object({
//     intent: z.literal("updateProjectMotivation"),
//     id: z.string(),
//     motivation: VALIDATION_OBJECT.motivation,
//   }),
//   updateProjectBudget: z.object({
//     intent: z.literal("updateProjectBudget"),
//     id: z.string(),
//     budget: VALIDATION_OBJECT.budget,
//   }),
//   updateProjectDueDate: z.object({
//     intent: z.literal("updateProjectDueDate"),
//     id: z.string(),
//     dueDate: VALIDATION_OBJECT.dueDate,
//   }),
//   updateProjectDescription: z.object({
//     intent: z.literal("updateProjectDescription"),
//     id: z.string(),
//     description: VALIDATION_OBJECT.description,
//   }),
//   updateProjectTitle: z.object({
//     intent: z.literal("updateProjectTitle"),
//     id: z.string(),
//     title: VALIDATION_OBJECT.title,
//   }),
//   updateProjectBarriers: z.object({
//     intent: z.literal("updateProjectBarriers"),
//     id: z.string(),
//     barriers: VALIDATION_OBJECT.barriers,
//   }),
//   deleteProject: z.object({
//     intent: z.literal("deleteProject"),
//     id: z.string(),
//   }),
//   createDiaryNote: z.object({
//     intent: z.literal("createDiaryNote"),
//     diaryNote: z.string(),
//     noteId: z.string(),
//     id: z.string(),
//   }),
// };
