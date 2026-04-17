// src/app/api/practices/[id]/locations/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/practices/[id]/locations - Get all locations for a practice
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const locations = await prisma.practiceLocation.findMany({
      where: { practiceId: id },
      orderBy: { locationNumber: "asc" },
    });

    return NextResponse.json({ success: true, data: locations });
  } catch (error) {
    console.error("Error fetching locations:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch locations" },
      { status: 500 }
    );
  }
}

// POST /api/practices/[id]/locations - Add a new location
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
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

    if (!addressLine1 || !suburb || !city || !province || !postalCode) {
      return NextResponse.json(
        { success: false, error: "Missing required address fields" },
        { status: 400 }
      );
    }

    // Get current max location number
    const locations = await prisma.practiceLocation.findMany({
      where: { practiceId: id },
      orderBy: { locationNumber: "desc" },
      take: 1,
    });

    const nextLocationNumber = locations.length > 0 ? locations[0].locationNumber + 1 : 1;

    // If this is marked as main, remove main flag from other locations
    if (isMain) {
      await prisma.practiceLocation.updateMany({
        where: { practiceId: id, isMain: true },
        data: { isMain: false },
      });
    }

    const location = await prisma.practiceLocation.create({
      data: {
        practiceId: id,
        locationNumber: nextLocationNumber,
        addressLine1,
        addressLine2: addressLine2 || null,
        suburb,
        city,
        province,
        postalCode,
        isMain: isMain || false,
      },
    });

    return NextResponse.json({ success: true, data: location }, { status: 201 });
  } catch (error) {
    console.error("Error creating location:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create location" },
      { status: 500 }
    );
  }
}