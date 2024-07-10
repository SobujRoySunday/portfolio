import { prisma } from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const reqBody = await request.json();
    const { name, email, message } = reqBody;
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        message,
      },
    });
    return NextResponse.json({ message: 'Contact created successfully', success: true, data: contact });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}