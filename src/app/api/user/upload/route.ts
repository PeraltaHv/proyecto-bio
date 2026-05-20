import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configuración del SDK con tus variables del .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No se encontró ningún archivo" },
        { status: 400 }
      );
    }

    // Convertimos el archivo a un Buffer para que Cloudinary lo pueda procesar
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Transformamos el buffer a base64 para enviarlo de forma segura
    const fileBase64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    // Subida a Cloudinary apuntando a tu nueva carpeta dedicada
    const uploadResponse = await cloudinary.uploader.upload(fileBase64, {
      folder: "bio-links", // <-- La carpeta ordenada que creamos para este proyecto
      resource_type: "auto", // Detecta automáticamente si es png, jpg, jpeg, etc.
    });

    // Retornamos la URL segura que nos da Cloudinary
    return NextResponse.json({
      success: true,
      url: uploadResponse.secure_url, // Esta es la URL que después vas a guardar en Prisma
    });

  } catch (error: any) {
    console.error("Error en Cloudinary Upload:", error);
    return NextResponse.json(
      { error: "Error interno al subir la imagen" },
      { status: 500 }
    );
  }
}