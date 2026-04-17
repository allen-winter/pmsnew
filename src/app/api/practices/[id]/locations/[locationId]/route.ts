// src/app/api/practices/[id]/locations/[locationId]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

interface RouteParams {
  params: Promise<{ id: string; locationId: string }>;
}

// PUT /api/practices/[id]/locations/[locationId] - Update a location
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id, locationId } = await params;
    const body = await request.json();

    const {
      addressLine1,
      addressLine2,
      suburb,
      city,
      province,
      postalCode,
      isMain,
    } = body;

    // If this is marked as main, remove main flag from other locations
    if (isMain) {
      await prisma.practiceLocation.updateMany({
        where: { practiceId: id, isMain: true, id: { not: locationId } },
        data: { isMain: false },
      });
    }

    const location = await prisma.practiceLocation.update({
      where: { id: locationId },
      data: {
        addressLine1,
        addressLine2: addressLine2 || null,
        suburb,
        city,
        province,
        postalCode,
        isMain: isMain || false,
      },
    });

    return NextResponse.json({ success: true, data: location });
  } catch (error) {
    console.error("Error updating location:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update location" },
      { status: 500 }
    );
  }
}

// DELETE /api/practices/[id]/locations/[locationId] - Delete a location
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { locationId } = await params;

    await prisma.practiceLocation.delete({
      where: { id: locationId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting location:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete location" },
      { status: 500 }
    );
  }
}