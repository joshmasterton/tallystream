import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/clients - list all clients
export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, clients });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}

// POST /api/clients - create a new client
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, company, contactName, email, phone, address, currency } = body;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "userId is required" },
        { status: 400 }
      );
    }

    const client = await prisma.client.create({
      data: {
        userId,
        company,
        contactName,
        email,
        phone,
        address,
        currency: currency || "USD",
      },
    });

    return NextResponse.json({ success: true, client }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}