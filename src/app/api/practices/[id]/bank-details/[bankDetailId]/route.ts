// src/app/api/practices/[id]/bank-details/[bankDetailId]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

interface RouteParams {
  params: Promise<{ id: string; bankDetailId: string }>;
}

// PUT /api/practices/[id]/bank-details/[bankDetailId] - Update bank details
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { bankDetailId } = await params;
    const body = await request.json();

    const {
      bankName,
      isBankOther,
      bankOtherText,
      branchName,
      branchCode,
      accountNumber,
      accountType,
      isAccountOther,
      accountOtherText,
      bankAddress,
    } = body;

    const bankDetail = await prisma.bankDetail.update({
      where: { id: bankDetailId },
      data: {
        bankName,
        isBankOther: isBankOther || false,
        bankOtherText: bankOtherText || null,
        branchName: branchName || null,
        branchCode: branchCode || null,
        accountNumber,
        accountType: accountType || null,
        isAccountOther: isAccountOther || false,
        accountOtherText: accountOtherText || null,
        bankAddress: bankAddress || null,
      },
    });

    return NextResponse.json({ success: true, data: bankDetail });
  } catch (error) {
    console.error("Error updating bank detail:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update bank detail" },
      { status: 500 }
    );
  }
}

// DELETE /api/practices/[id]/bank-details/[bankDetailId] - Delete bank details
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { bankDetailId } = await params;

    await prisma.bankDetail.delete({
      where: { id: bankDetailId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting bank detail:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete bank detail" },
      { status: 500 }
    );
  }
}