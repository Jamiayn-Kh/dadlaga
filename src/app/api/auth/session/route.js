import { NextResponse } from "next/server";

export async function GET() {
  // Return empty session for now
  return NextResponse.json({
    user: null,
    expires: null
  });
}
