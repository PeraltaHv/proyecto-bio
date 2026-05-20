import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { label, url, userId } = await request.json();

    const newLink = await prisma.link.create({
      data: {
        label,
        url,
        userId, // El ID del usuario al que pertenece el link
      },
    });

    return NextResponse.json(newLink);
  } catch (error) {
    return NextResponse.json({ error: "Error al crear link" }, { status: 500 });
  }
}