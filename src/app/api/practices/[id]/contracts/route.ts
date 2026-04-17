// src/app/api/practices/[id]/contracts/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/practices/[id]/contracts - Get all contracts for a practice
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const contracts = await prisma.practiceContract.findMany({
      where: { practiceId: id },
      orderBy: { startDate: "desc" },
    });

    return NextResponse.json({ success: true, data: contracts });
  } catch (error) {
    console.error("Error fetching contracts:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch contracts" },
      { status: 500 }
    );
  }
}

// POST /api/practices/[id]/contracts - Add a new contract
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    const {
      contractType,
      isOther,
      otherText,
      schemeAdmin,
      scheme,
      plan,
      category,
      level,
      rateType,
      amount,
      startDate,
      endDate,
    } = body;

    if (!contractType || !scheme || !rateType || amount === undefined || amount === null) {
      return NextResponse.json(
        { success: false, error: "Missing required contract fields" },
        { status: 400 }
      );
    }

    const contract = await prisma.practiceContract.create({
      data: {
        practiceId: id,
        contractType,
        isOther: isOther || false,
        otherText: otherText || null,
        schemeAdmin: schemeAdmin || null,
        scheme,
        plan: plan || null,
        category: category || null,
        level: level || null,
        rateType,
        amount: typeof amount === 'string' ? parseFloat(amount) : Number(amount), // ← FIXED: Convert to number
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
      },
    });

    return NextResponse.json({ success: true, data: contract }, { status: 201 });
  } catch (error) {
    console.error("Error creating contract:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to create contract" },
      { status: 500 }
    );
  }
}