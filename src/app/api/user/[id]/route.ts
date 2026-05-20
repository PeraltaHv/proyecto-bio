import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// MÉTODO PARA TRAER LOS DATOS (EL QUE ME PASASTE)
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; 

    if (!id) {
      return NextResponse.json({ error: "ID no proporcionado" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: id },
      include: { 
        links: {
          orderBy: { id: 'asc' } // Mantiene el orden de los botones
        } 
      }
    });

    if (!user) {
      return NextResponse.json({ error: "Cliente no encontrado" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("ERROR EN GET:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

// MÉTODO PARA ELIMINAR (EL QUE TE FALTA PARA EL DASHBOARD)
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // 1. Borramos los links primero por integridad referencial
    await prisma.link.deleteMany({
      where: { userId: id }
    });

    // 2. Borramos al usuario
    await prisma.user.delete({
      where: { id: id }
    });

    return NextResponse.json({ message: "Cliente eliminado correctamente" });
  } catch (error) {
    console.error("ERROR EN DELETE:", error);
    return NextResponse.json({ error: "No se pudo eliminar el cliente" }, { status: 500 });
  }
}