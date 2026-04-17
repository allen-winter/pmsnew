// src/app/api/practices/[id]/documents/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/practices/[id]/documents - Get all documents for a practice
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const documents = await prisma.practiceDocument.findMany({
      where: { practiceId: id },
      orderBy: { uploadedAt: "desc" },
    });

    return NextResponse.json({ success: true, data: documents });
  } catch (error) {
    console.error("Error fetching documents:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch documents" },
      { status: 500 }
    );
  }
}

// POST /api/practices/[id]/documents - Upload a document
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { documentName, fileUrl, fileType, fileSize } = body;

    if (!documentName || !fileUrl) {
      return NextResponse.json(
        { success: false, error: "Document name and file URL are required" },
        { status: 400 }
      );
    }

    const document = await prisma.practiceDocument.create({
      data: {
        practiceId: id,
        documentName,
        fileUrl,
        fileType: fileType || null,
        fileSize: fileSize || null,
        uploadedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, data: document }, { status: 201 });
  } catch (error) {
    console.error("Error uploading document:", error);
    return NextResponse.json(
      { success: false, error: "Failed to upload document" },
      { status: 500 }
    );
  }
}

// DELETE /api/practices/[id]/documents - Delete a document
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const documentId = searchParams.get("documentId");

    if (!documentId) {
      return NextResponse.json(
        { success: false, error: "Document ID is required" },
        { status: 400 }
      );
    }

    await prisma.practiceDocument.delete({
      where: { id: documentId, practiceId: id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting document:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete document" },
      { status: 500 }
    );
  }
}