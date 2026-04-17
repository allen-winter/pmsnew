// src/app/api/practices/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/practices/[id] - Get single practice
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const practice = await prisma.practice.findUnique({
      where: { id },
      include: {
        disciplines: true,
        specializations: true,
        locations: true,
        contracts: true,
        bankDetails: true,
        documents: true,
        doctorPractices: {
          include: {
            doctor: true,
          },
        },
      },
    });

    if (!practice) {
      return NextResponse.json(
        { success: false, error: "Practice not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: practice });
  } catch (error) {
    console.error("Error fetching practice:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch practice" },
      { status: 500 }
    );
  }
}

// PUT /api/practices/[id] - Update practice
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
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
      isActive,
      disciplines,
      specializations,
      locations,
      contracts,
      bankDetails,
    } = body;

    // Update main practice
    const practice = await prisma.practice.update({
      where: { id },
      data: {
        practiceName,
        bhfNumber,
        practiceType,
        email: email || null,
        phone: phone || null,
        vatNumber: vatNumber || null,
        cipcNumber: cipcNumber || null,
        billingPolicy: billingPolicy || null,
        roomsDefaultRate: roomsDefaultRate ? parseFloat(String(roomsDefaultRate)) : null,
        inHospitalDefaultRate: inHospitalDefaultRate ? parseFloat(String(inHospitalDefaultRate)) : null,
        additionalNotes: additionalNotes || null,
        isActive: isActive !== undefined ? isActive : true,
      },
    });

    // Delete and recreate related records
    await prisma.$transaction([
      prisma.practiceDiscipline.deleteMany({ where: { practiceId: id } }),
      prisma.practiceSpecialization.deleteMany({ where: { practiceId: id } }),
      prisma.practiceLocation.deleteMany({ where: { practiceId: id } }),
      prisma.practiceContract.deleteMany({ where: { practiceId: id } }),
      prisma.bankDetail.deleteMany({ where: { practiceId: id } }),
    ]);

    // Recreate disciplines
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

    // Recreate specializations
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

    // Recreate locations
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

    // Recreate contracts - FIXED: parseFloat for amount
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

    // Recreate bank details
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

    // Fetch updated practice
    const updatedPractice = await prisma.practice.findUnique({
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

    return NextResponse.json({ success: true, data: updatedPractice });
  } catch (error) {
    console.error("Error updating practice:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to update practice" },
      { status: 500 }
    );
  }
}

// DELETE /api/practices/[id] - Delete a practice
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    await prisma.$transaction([
      prisma.practiceDiscipline.deleteMany({ where: { practiceId: id } }),
      prisma.practiceSpecialization.deleteMany({ where: { practiceId: id } }),
      prisma.practiceLocation.deleteMany({ where: { practiceId: id } }),
      prisma.practiceContract.deleteMany({ where: { practiceId: id } }),
      prisma.bankDetail.deleteMany({ where: { practiceId: id } }),
      prisma.practiceDocument.deleteMany({ where: { practiceId: id } }),
      prisma.doctorPractice.deleteMany({ where: { practiceId: id } }),
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