import { prisma } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { id } = reqBody;
    const project = await prisma.project.findUnique({
      where: {
        id
      }
    });

    const toggleProject = await prisma.project.update({
      where: {
        id
      },
      data: {
        isStarred: !project?.isStarred
      }
    });

    return NextResponse.json({ message: 'Project updated successfully', success: true, data: toggleProject });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}