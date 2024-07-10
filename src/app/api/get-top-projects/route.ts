import { prisma } from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      where: {
        isStarred: true,
      }
    });

    return NextResponse.json({ message: 'Top projects fetched successfully', success: true, data: projects });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}