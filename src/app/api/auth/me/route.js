import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(req) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    
    try {
      // Token-оос user ID-г авах (base64 decode)
      const decoded = atob(token);
      const [userId] = decoded.split(':');
      
      if (!userId) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      }

      // Database-аас хэрэглэгчийн мэдээллийг авах
      const user = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
          created_at: true
        }
      });

      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      return NextResponse.json(user);
      
    } catch (decodeError) {
      console.error('Token decode error:', decodeError);
      return NextResponse.json({ error: 'Invalid token format' }, { status: 401 });
    }
    
  } catch (error) {
    console.error('Auth me error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}







