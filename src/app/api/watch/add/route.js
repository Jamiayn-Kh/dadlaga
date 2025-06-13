// src/app/api/watch/add/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(req) {
  try {
    const { movieId, userEmail } = await req.json();

    if (!userEmail) {
      return NextResponse.json({ error: 'User email is required' }, { status: 400 });
    }

    // Get user from email
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check for existing entry
    const existing = await prisma.watchHistory.findUnique({
      where: {
        user_id_movie_id: {
          user_id: user.id,
          movie_id: movieId,
        },
      },
    });

    if (!existing) {
      await prisma.watchHistory.create({
        data: {
          user_id: user.id,
          movie_id: movieId,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Watch history error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
