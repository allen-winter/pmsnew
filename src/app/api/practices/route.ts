// src/app/api/practices/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { generatePracticeDisplayId } from "@/lib/generators/idGenerator";

// GET /api/practices - List all practices
export async function GET() {
  try {
    const practices = await prisma.practice.findMany({
      include: {
        disciplines: true,
        specializations: true,
        locations: true,
        contracts: true,
        bankDetails: true,
        documents: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: practices });
  } catch (error) {
    console.error("Error fetching practices:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch practices" },
      { status: 500 }
    );
  }
}

// POST /api/practices - Create a new practice
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      practiceName,
      bhfNumber,
      practiceType,
      email,
      phone,
      vatNumber,
      cipcNumber,
      billingPolicy,
      roomsDefaultRate,
      inHospitalDefaultRate,
      additionalNotes,
      disciplines,
      specializations,
      locations,
      contracts,
      bankDetails,
    } = body;

    // Validation
    if (!practiceName || !bhfNumber) {
      return NextResponse.json(
        { success: false, error: "Practice name and BHF number are required" },
        { status: 400 }
      );
    }

    // Check for duplicate BHF number
    const existingPractice = await prisma.practice.findUnique({
      where: { bhfNumber },
    });

    if (existingPractice) {
      return NextResponse.json(
        { success: false, error: "Practice with this BHF number already exists" },
        { status: 409 }
      );
    }

    const practiceDisplayId = await generatePracticeDisplayId();

    // Create main practice
    const practice = await prisma.practice.create({
      data: {
        practiceDisplayId,
        practiceName,
        bhfNumber,
        practiceType: practiceType || "BOTH",
        email: email || null,
        phone: phone || null,
        vatNumber: vatNumber || null,
        cipcNumber: cipcNumber || null,
        billingPolicy: billingPolicy || null,
        roomsDefaultRate: roomsDefaultRate ? parseFloat(String(roomsDefaultRate)) : null,
        inHospitalDefaultRate: inHospitalDefaultRate ? parseFloat(String(inHospitalDefaultRate)) : null,
        additionalNotes: additionalNotes || null,
        isActive: true,
      },
    });

    // Create disciplines
    if (disciplines && Array.isArray(disciplines) && disciplines.length > 0) {
      const validDisciplines = disciplines.filter((d: any) => d.disciplineName);
      if (validDisciplines.length > 0) {
        await prisma.practiceDiscipline.createMany({
          data: validDisciplines.map((d: any) => ({
            practiceId: practice.id,
            disciplineName: d.disciplineName,
            disciplineCode: d.disciplineCode || null,
            isOther: d.disciplineName === "Other",
            otherText: d.otherText || null,
          })),
        });
      }
    }

    // Create specializations
    if (specializations && Array.isArray(specializations) && specializations.length > 0) {
      const validSpecializations = specializations.filter((s: any) => s.specializationName);
      if (validSpecializations.length > 0) {
        await prisma.practiceSpecialization.createMany({
          data: validSpecializations.map((s: any) => ({
            practiceId: practice.id,
            specializationName: s.specializationName,
            isOther: s.specializationName === "Other",
            otherText: s.otherText || null,
            subSpecialization: s.subSpecialization || null,
            isSubOther: s.subSpecialization === "Other",
            subOtherText: s.subOtherText || null,
          })),
        });
      }
    }

    // Create locations
    if (locations && Array.isArray(locations) && locations.length > 0) {
      const validLocations = locations.filter((l: any) => l.addressLine1);
      if (validLocations.length > 0) {
        await prisma.practiceLocation.createMany({
          data: validLocations.map((l: any, index: number) => ({
            practiceId: practice.id,
            isMain: l.isMain || index === 0,
            locationNumber: index + 1,
            addressLine1: l.addressLine1,
            addressLine2: l.addressLine2 || null,
            suburb: l.suburb,
            city: l.city,
            province: l.province,
            postalCode: l.postalCode,
          })),
        });
      }
    }

    // Create contracts - FIXED: parseFloat for amount
    if (contracts && Array.isArray(contracts) && contracts.length > 0) {
      const validContracts = contracts.filter((c: any) => c.contractType && c.scheme);
      if (validContracts.length > 0) {
        await prisma.practiceContract.createMany({
          data: validContracts.map((c: any) => ({
            practiceId: practice.id,
            contractType: c.contractType,
            isOther: c.isOther === true,
            otherText: c.otherText || null,
            schemeAdmin: c.schemeAdmin || null,
            scheme: c.scheme,
            plan: c.plan || null,
            category: c.category || null,
            level: c.level || null,
            rateType: c.rateType || "Fixed Amount",
            amount: typeof c.amount === 'string' ? parseFloat(c.amount) : Number(c.amount),
            startDate: c.startDate ? new Date(c.startDate) : null,
            endDate: c.endDate ? new Date(c.endDate) : null,
          })),
        });
      }
    }

    // Create bank details
    if (bankDetails && Array.isArray(bankDetails) && bankDetails.length > 0) {
      const validBankDetails = bankDetails.filter((b: any) => b.bankName && b.accountNumber);
      if (validBankDetails.length > 0) {
        await prisma.bankDetail.createMany({
          data: validBankDetails.map((b: any) => ({
            practiceId: practice.id,
            bankName: b.bankName,
            isBankOther: b.bankName === "Other",
            bankOtherText: b.bankOtherText || null,
            branchName: b.branchName || null,
            branchCode: b.branchCode || null,
            accountNumber: b.accountNumber,
            accountType: b.accountType || null,
            isAccountOther: b.accountType === "Other",
            accountOtherText: b.accountOtherText || null,
            bankAddress: b.bankAddress || null,
          })),
        });
      }
    }

    // Fetch complete practice with all relations
    const completePractice = await prisma.practice.findUnique({
      where: { id: practice.id },
      include: {
        disciplines: true,
        specializations: true,
        locations: true,
        contracts: true,
        bankDetails: true,
        documents: true,
      },
    });

    return NextResponse.json({ success: true, data: completePractice }, { status: 201 });
  } catch (error) {
    console.error("Error creating practice:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to create practice" },
      { status: 500 }
    );
  }
}

// PATCH /api/practices - Update practice status
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, isActive } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Practice ID is required" },
        { status: 400 }
      );
    }

    const practice = await prisma.practice.update({
      where: { id },
      data: { isActive },
    });

    return NextResponse.json({ success: true, data: practice });
  } catch (error) {
    console.error("Error updating practice:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update practice" },
      { status: 500 }
    );
  }
}

// DELETE /api/practices - Delete a practice
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Practice ID is required" },
        { status: 400 }
      );
    }

    // Delete related records first
    await prisma.$transaction([
      prisma.practiceDiscipline.deleteMany({ where: { practiceId: id } }),
      prisma.practiceSpecialization.deleteMany({ where: { practiceId: id } }),
      prisma.practiceLocation.deleteMany({ where: { practiceId: id } }),
      prisma.practiceContract.deleteMany({ where: { practiceId: id } }),
      prisma.bankDetail.deleteMany({ where: { practiceId: id } }),
      prisma.practiceDocument.deleteMany({ where: { practiceId: id } }),
      prisma.practice.delete({ where: { id } }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting practice:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete practice" },
      { status: 500 }
    );
  }
}