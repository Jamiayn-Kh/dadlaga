// src/app/api/watch/add/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(req) {
  try {
    const { movieId, documentId, userEmail } = await req.json();
    console.log("watch/add API called:", { movieId, documentId, userEmail });
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

    if (!movieId && !documentId) {
      return NextResponse.json({ error: 'movieId or documentId is required' }, { status: 400 });
    }

    if (movieId) {
      const existingMovie = await prisma.watchHistory.findUnique({
        where: {
          user_id_movie_id: {
            user_id: user.id,
            movie_id: Number(movieId),
          },
        },
      });
      if (!existingMovie) {
        await prisma.watchHistory.create({
          data: {
            user_id: user.id,
            movie_id: Number(movieId),
          },
        });
      }
    } else if (documentId) {
      const existingDoc = await prisma.watchHistory.findUnique({
        where: {
          user_id_document_id: {
            user_id: user.id,
            document_id: Number(documentId),
          },
        },
      });
      if (!existingDoc) {
        await prisma.watchHistory.create({
          data: {
            user_id: user.id,
            document_id: Number(documentId),
          },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Watch history error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
