import { createProject } from "@/lib/utils/projects.server";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request: NextRequest) {
    const data = await request.json()
    try {
        const newProject = await createProject({
            id: data.id,
            title: data.title,
            description: data.description,
            barriers: data.barriers,
            motivation: data.motivation,
            reward: data.reward,
            projectValue: data.projectValue,
            dueDate: data.dueDate,
            confidence: data.confidence,
        })

        const url = request.nextUrl.clone()
        url.pathname = '/projects'
        return NextResponse.json({ message: "Project created successfully" })

    } catch (error) {
        console.error("Error creating project", error)
        return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
    }
}