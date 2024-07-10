import { prisma } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, description, url, image } = reqBody;
    const project = await prisma.project.create({
      data: {
        name,
        description,
        url,
        image,
      }
    });
    return NextResponse.json({ message: 'Project created successfully', success: true, data: project });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}