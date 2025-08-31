import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const documents = await prisma.document.findMany({
    orderBy: { created_at: "desc" },
    include: {
      views: true,
    },
  });
  
  // Add view count to each document
  const documentsWithViewCount = documents.map(doc => ({
    ...doc,
    viewCount: doc.views.length,
  }));
  
  return NextResponse.json(documentsWithViewCount);
}

export async function POST(req) {
  const { title, description, url, createdBy, role } = await req.json();

  if (role !== "ADMIN") {
    return NextResponse.json({ error: "Зөвхөн админ нэмэх эрхтэй" }, { status: 403 });
  }
  if (!title || !url || !createdBy) {
    return NextResponse.json({ error: "Шаардлагатай талбарууд дутуу" }, { status: 400 });
  }

  const doc = await prisma.document.create({
    data: {
      title,
      description: description || null,
      url,
      createdBy,
    },
  });
  return NextResponse.json(doc, { status: 201 });
}









