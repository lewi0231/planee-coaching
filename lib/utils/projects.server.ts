import prisma from "@/prisma/db"
import { Project } from "@prisma/client"
import { getRandomColorCombination } from "../utils"
import { DEFAULT_NOTIFICATION_MESSAGE } from "./constants"

export async function createProject({
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
}: Pick<Project, 'barriers' | "confidence" | "description" | "dueDate" | "title" | "reward" | "id" | "motivation" | "projectValue">) {
    try {
        // const icon = selectRandomIcon()
        const { foreground, background } = getRandomColorCombination()
        const existingAppearance = await prisma.appearance.findUnique({
            where: {
                foreground_background: {
                    foreground,
                    background
                }
            }
        })

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
                        message: DEFAULT_NOTIFICATION_MESSAGE,
                    },
                },
                appearance: existingAppearance
                    ? {
                        connect: {
                            id: existingAppearance.id
                        },
                    }
                    : {
                        create: {
                            foreground,
                            background
                        }
                    }

            },
        })
    } catch (error) {
        throw new Response(`Unable to create project: ${error}`, { status: 500 })
    }
}

export async function getProject({ projectId }: { projectId: string }) {
    try {
        return await prisma.project.findFirst({
            where: {
                id: projectId,
            },
            include: {
                notifications: true,
                // milestones: true,
                // diaryNotes: true,
                appearance: true,
            },
        })
    } catch (error) {
        console.debug('There was a problem getting project', projectId)
        throw new Response('Unable to fetch project', { status: 500 })
    }
}

export async function getProjects() {
    try {
        return await prisma.project.findMany({
            // where: {
            // 	userId: userId,
            // },
            include: {
                // diaryNotes: true,
                // milestones: true,
                notifications: true,
                appearance: true,
            },
        })
    } catch (error) {
        throw new Response('There was a problem fetching Projects', { status: 500 })
    }
}

export async function deleteProject({
    projectId,
}: {
    projectId: Project['id']
}) {
    try {
        return prisma.project.delete({
            where: {
                id: projectId,
            },
        })
    } catch (error) {
        throw new Response(`Unable to delete project, id = ${projectId}`, {
            status: 500,
        })
    }
}

export async function updateProject({
    id,
    title,
    description,
    motivation,
    barriers,
    projectValue,
    reward,
    dueDate,
}: Partial<Omit<Project, 'id'>> & Pick<Project, 'id'>) {
    console.debug('updating project database...')

    try {
        return prisma.project.update({
            where: {
                id,
            },
            data: {
                title,
                description,
                motivation,
                reward,
                projectValue,
                dueDate,
                barriers,
            },
        })
    } catch (error) {
        throw new Response(`Unable to update project: ${id}`, { status: 500 })
    }
}

export async function getSelectedProject(){
    try {
        return await prisma.project.findFirst({
            where: {
                isSelected: true
            }
        })
    } catch (error) {
        throw new Response(`Unable to retrieve selected project`, { status: 500 })
    }
} 

export async function updatedSelectedProject(projectId: string){
    try {
        await prisma.project.updateMany({
            where: {
                id: {
                    not: projectId
                }
            },
            data: {
                isSelected: false
            }
        })

        const selectedProject = await prisma.project.update({
            where: {
                id: projectId
            },
            data: {
                isSelected: true
            }
        })

        return {...selectedProject}
    } catch (error) {
        throw new Response(`Unable to update selected project, ${projectId}`, { status: 500 })
    }
}
