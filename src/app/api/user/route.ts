import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Método para listar todos
export async function GET() {
  try {
    const usuarios = await prisma.user.findMany({
      include: { links: true },
      orderBy: { businessName: 'asc' }
    });
    return NextResponse.json(usuarios);
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener clientes" }, { status: 500 });
  }
}

// Método para crear uno nuevo (POST)
export async function POST(req: Request) {
  try {
    const { businessName } = await req.json();
    const slug = businessName.toLowerCase().trim().replace(/\s+/g, '-');

    const nuevo = await prisma.user.create({
      data: {
        businessName,
        slug,
        bio: "Descripción del negocio",
        bgColor: "#f8fafc",
        buttonColor: "#ffffff",
        textColor: "#000000"
      }
    });
    return NextResponse.json(nuevo);
  } catch (error) {
    return NextResponse.json({ error: "Error al crear" }, { status: 500 });
  }
}