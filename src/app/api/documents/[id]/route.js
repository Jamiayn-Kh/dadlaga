import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(_req, { params }) {
  const { id } = await params;
  const doc = await prisma.document.findUnique({ where: { id: Number(id) } });
  if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(doc);
}

export async function DELETE(req, { params }) {
  const { role } = await req.json().catch(() => ({ role: undefined }));
  if (role !== "ADMIN") {
    return NextResponse.json({ error: "Админ эрх шаардлагатай" }, { status: 403 });
  }
  const { id } = await params;
  const doc = await prisma.document.delete({ where: { id: Number(id) } }).catch(() => null);
  if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}










