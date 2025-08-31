import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(req, { params }) {
  try {
    console.log('PDF API called with params:', params);
    const { id } = await params;
    console.log('Document ID:', id);
    
    const doc = await prisma.document.findUnique({ where: { id: Number(id) } });
    console.log('Document found:', doc ? 'Yes' : 'No');
    
    if (!doc) {
      console.log('Document not found for ID:', id);
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    console.log('Fetching PDF from URL:', doc.url);
    // Fetch PDF from S3
    const response = await fetch(doc.url);
    console.log('S3 response status:', response.status);
    
    if (!response.ok) {
      console.log('S3 response not ok:', response.status, response.statusText);
      return NextResponse.json({ error: "Failed to fetch PDF" }, { status: 500 });
    }

    console.log('Converting to array buffer...');
    // Stream PDF directly
    const pdfBuffer = await response.arrayBuffer();
    console.log('PDF buffer size:', pdfBuffer.byteLength);
    
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${doc.title}.pdf"`,
        'Cache-Control': 'public, max-age=3600'
      }
    });
    
  } catch (error) {
    console.error('PDF fetch error:', error);
    console.error('Error stack:', error.stack);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
