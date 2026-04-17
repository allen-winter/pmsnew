// src/app/api/practices/[id]/contracts/[contractId]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

interface RouteParams {
  params: Promise<{ id: string; contractId: string }>;
}

// PUT /api/practices/[id]/contracts/[contractId] - Update a contract
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { contractId } = await params;
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

    const contract = await prisma.practiceContract.update({
      where: { id: contractId },
      data: {
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

    return NextResponse.json({ success: true, data: contract });
  } catch (error) {
    console.error("Error updating contract:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to update contract" },
      { status: 500 }
    );
  }
}

// DELETE /api/practices/[id]/contracts/[contractId] - Delete a contract
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { contractId } = await params;

    await prisma.practiceContract.delete({
      where: { id: contractId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting contract:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete contract" },
      { status: 500 }
    );
  }
}