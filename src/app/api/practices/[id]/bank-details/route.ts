// src/app/api/practices/[id]/bank-details/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/practices/[id]/bank-details - Get bank details for a practice
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const bankDetails = await prisma.bankDetail.findMany({
      where: { practiceId: id },
    });

    return NextResponse.json({ success: true, data: bankDetails });
  } catch (error) {
    console.error("Error fetching bank details:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch bank details" },
      { status: 500 }
    );
  }
}

// POST /api/practices/[id]/bank-details - Add bank details
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
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

    if (!bankName || !accountNumber) {
      return NextResponse.json(
        { success: false, error: "Bank name and account number are required" },
        { status: 400 }
      );
    }

    const bankDetail = await prisma.bankDetail.create({
      data: {
        practiceId: id,
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

    return NextResponse.json({ success: true, data: bankDetail }, { status: 201 });
  } catch (error) {
    console.error("Error creating bank detail:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create bank detail" },
      { status: 500 }
    );
  }
}