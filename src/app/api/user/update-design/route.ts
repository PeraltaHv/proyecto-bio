import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const { id, businessName, bio, image, appearance, links } = body;

    if (!id) {
      return NextResponse.json({ error: "ID requerido" }, { status: 400 });
    }

    // 🔹 1. Actualizar datos del usuario
    await prisma.user.update({
      where: { id },
      data: {
        businessName,
        bio,
        image,
        bgColor: appearance?.bgColor,
        buttonColor: appearance?.btnColor,
        textColor: appearance?.btnTextColor,
       bioColor: appearance?.bioColor,
        bgImage: appearance?.bgImage,
        nameColor: appearance?.nameColor,
       titleFont :appearance?.titleFont,
       bioFont : appearance?. bioFont,
       titleSize:appearance?.titleSize,  
       bioSize : appearance?.bioSize
      },
    });

    // 🔥 2. SINCRONIZAR LINKS
    if (links && Array.isArray(links)) {

      // 🚨 BORRAMOS TODOS LOS LINKS EXISTENTES DEL USUARIO
      await prisma.link.deleteMany({
        where: { userId: id },
      });

      // 🚀 CREAMOS LOS NUEVOS
      if (links.length > 0) {
        await prisma.link.createMany({
          data: links.map((link: any, index: number) => ({
            label: link.label,
            url: link.url,
            icon: link.icon || null,
            order: index,
            userId: id,
          })),
        });
      }
    }

    return NextResponse.json({ message: "Guardado correctamente" });

  } catch (error) {
    console.error("ERROR UPDATE DESIGN:", error);

    return NextResponse.json(
      { error: "Error al actualizar" },
      { status: 500 }
    );
  }
}