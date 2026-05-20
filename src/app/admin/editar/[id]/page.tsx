"use client";

import { useState, useEffect, use } from "react";
import {
  Save,
  ArrowLeft,
  Trash2,
  Plus,
  ExternalLink,
  Image as ImageIcon,
  Camera,
  Globe,
  Palette,
  Link as LinkIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function EditorAdmin({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // --- ESTADOS DE INFORMACIÓN BÁSICA ---
  const [businessName, setBusinessName] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [slug, setSlug] = useState("");
  const [links, setLinks] = useState<any[]>([]);

  // --- ESTADOS DE APARIENCIA (PALETA DE COLORES) ---
  const [bgColor, setBgColor] = useState("#f8fafc");
  const [btnColor, setBtnColor] = useState("#2563eb");
  const [btnTextColor, setBtnTextColor] = useState("#ffffff");
  const [btnStyle, setBtnStyle] = useState("rounded-xl");
  const [nameColor, setNameColor] = useState("#ffffff");
  const [bioColor, setBioColor] = useState("#ffffff");
  const [bgImage, setBgImage] = useState("");

  const [titleFont, setTitleFont] = useState("Inter");
  const [bioFont, setBioFont] = useState("Inter");

  const [titleSize, setTitleSize] = useState("text-[30px]");
  const [bioSize, setBioSize] = useState("text-base");

  useEffect(() => {
    if (!id) return;

    const cargarDatos = async () => {
      try {
        const res = await fetch(`/api/user/${id}`);
        if (!res.ok) throw new Error("Error API");

        const data = await res.json();

        setBusinessName(data.businessName || "");
        setBio(data.bio || "");
        setImage(data.image || "");
        setSlug(data.slug || "");
        setLinks(data.links || []);

        setBgColor(data.bgColor || "#f8fafc");
        setBtnColor(data.buttonColor || data.btnColor || "#2563eb");
        setBtnTextColor(data.textColor || data.btnTextColor || "#ffffff");
        setBgImage(data.bgImage || "");

        setNameColor(data.nameColor || "#ffffff");
        setBioColor(data.bioColor || "#ffffff");

        setTitleFont(data.titleFont || "Inter");
        setBioFont(data.bioFont || "Inter");

        setTitleSize(data.titleSize || "text-[30px]");
        setBioSize(data.bioSize || "text-base");

        if (data.btnStyle) {
          setBtnStyle(data.btnStyle);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, [id]);

  const agregarLink = () => {
    setLinks([
      { id: `new-${Date.now()}`, label: "Nuevo Botón", url: "", icon: "" },
      ...links,
    ]);
  };

  const eliminarLink = (linkId: string | number) => {
    if (window.confirm("¿Eliminar este botón?")) {
      setLinks((prevLinks) =>
        prevLinks.filter((l) => String(l.id) !== String(linkId))
      );
    }
  };

  const subirImagen = async (file: File, folder: string): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.url;
  };

  const guardarTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/user/update-design", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        businessName,
        bio,
        image,
        appearance: {
          bgColor,
          btnColor,
          btnTextColor,
          bgImage,
          nameColor,
          bioColor,
          btnStyle,
          titleFont,
          bioFont,
          titleSize,
          bioSize,
        },
        links: links.map((l) => ({
          id: String(l.id).includes("new") ? undefined : l.id,
          label: l.label || "",
          url: l.url || "",
          icon: l.icon || "",
        })),
      }),
    });
    if (res.ok) alert("✅ Cambios publicados con éxito");
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-200">
        <div className="text-center font-black text-2xl animate-pulse text-blue-800 tracking-tighter">
          CARGANDO EDITOR...
        </div>
      </div>
    );

  return (
    <form
      onSubmit={guardarTodo}
      className="max-w-xl mx-auto p-4 md:p-6 space-y-6 pb-24 bg-slate-200 min-h-screen"
    >
      {/* HEADER FIJO */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-xl border-2 border-slate-400 sticky top-2 z-50">
        <button
          type="button"
          onClick={() => router.back()}
          className="p-2 hover:bg-slate-200 rounded-xl text-slate-900 border border-slate-300"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center gap-4">
          <a
            href={`/${slug}`}
            target="_blank"
            className="flex items-center gap-1 text-[14px] font-black uppercase text-slate-800 hover:text-blue-700 underline decoration-2"
          >
            PREVISUALIZAR <ExternalLink size={14} />
          </a>
          <button
            type="submit"
            className="bg-blue-700 text-white px-8 py-2.5 rounded-xl font-black text-sm shadow-xl hover:bg-blue-800 transition-all"
          >
            GUARDAR
          </button>
        </div>
      </div>

      {/* SECCIÓN 1: PERFIL Y BIO */}
      <div className="bg-white p-6 rounded-[2.5rem] border-2 border-slate-400 shadow-md space-y-4">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-24 h-24 bg-slate-100 rounded-3xl overflow-hidden border-2 border-slate-400 shadow-inner flex items-center justify-center">
              {image ? (
                <img
                  src={image}
                  className="w-full h-full object-cover"
                  alt="Perfil"
                />
              ) : (
                <Camera size={32} className="text-slate-400" />
              )}
            </div>

            <label className="absolute -bottom-1 -right-1 bg-slate-900 text-white p-2 rounded-xl border-2 border-white shadow-lg cursor-pointer hover:bg-slate-700 transition-all">
              <Camera size={14} />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  try {
                    setUploading(true);
                    const url = await subirImagen(file, "biolinks");
                    setImage(url);
                  } catch (error) {
                    console.error(error);
                    alert("Error al subir imagen");
                  } finally {
                    setUploading(false);
                  }
                }}
              />
            </label>
          </div>

          <div className="flex-1 space-y-3">
            <input
              value={businessName || ""}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Nombre del Negocio"
              className="w-full bg-slate-50 p-2 rounded-lg font-black text-2xl outline-none text-slate-900 border-b-4 border-slate-200 focus:border-blue-600 placeholder:text-slate-300"
            />

            <input
              value={image || ""}
              onChange={(e) => setImage(e.target.value)}
              placeholder="URL de la foto de perfil..."
              className="w-full text-[13px] text-blue-800 font-bold italic outline-none bg-slate-50 p-2 rounded-lg border border-slate-300 focus:border-blue-600"
            />
          </div>
        </div>

        {uploading && (
          <div className="text-sm font-black text-blue-700 animate-pulse">
            Subiendo archivo...
          </div>
        )}

        <textarea
          value={bio || ""}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Escribí una descripción corta para la Bio..."
          className="w-full p-4 bg-slate-50 rounded-2xl outline-none text-base font-bold h-24 resize-none border-2 border-slate-200 focus:border-blue-600 text-slate-900 placeholder:text-slate-400"
        />
      </div>

      {/* FUENTE DEL TITULO */}
      <div className="group">
        <label className="block text-[13px] font-black text-slate-800 uppercase mb-2 ml-1">
          Fuente del Título
        </label>
        <select
          value={titleFont || "Inter"}
          onChange={(e) => setTitleFont(e.target.value)}
          className="w-full bg-slate-100 p-4 rounded-2xl border-2 border-slate-300 font-black text-lg text-slate-900 outline-none"
        >
          <option value="Inter">Inter</option>
          <option value="Montserrat">Montserrat</option>
          <option value="Playfair">Playfair</option>
          <option value="Poppins">Poppins</option>
          <option value="Bebas">Bebas</option>
        </select>
      </div>

      {/* FUENTE DE LA DESCRIPCION */}
      <div className="group">
        <label className="block text-[13px] font-black text-slate-800 uppercase mb-2 ml-1">
          Fuente de la Descripción
        </label>
        <select
          value={bioFont || "Inter"}
          onChange={(e) => setBioFont(e.target.value)}
          className="w-full bg-slate-100 p-4 rounded-2xl border-2 border-slate-300 font-black text-lg text-slate-900 outline-none"
        >
          <option value="Inter">Inter</option>
          <option value="Montserrat">Montserrat</option>
          <option value="Playfair">Playfair</option>
          <option value="Poppins">Poppins</option>
          <option value="Bebas">Bebas</option>
        </select>
      </div>

      {/* TAMAÑO TITULO */}
      <div className="group">
        <label className="block text-[13px] font-black text-slate-800 uppercase mb-2 ml-1">
          Tamaño del Título
        </label>
        <select
          value={titleSize || "text-[30px]"}
          onChange={(e) => setTitleSize(e.target.value)}
          className="w-full bg-slate-100 p-4 rounded-2xl border-2 border-slate-300 font-black text-lg text-slate-900 outline-none"
        >
          <option value="text-2xl">Pequeño</option>
          <option value="text-3xl">Mediano</option>
          <option value="text-4xl">Grande</option>
          <option value="text-5xl">Gigante</option>
        </select>
      </div>

      {/* TAMAÑO DESCRIPCION */}
      <div className="group">
        <label className="block text-[13px] font-black text-slate-800 uppercase mb-2 ml-1">
          Tamaño de la Descripción
        </label>
        <select
          value={bioSize || "text-base"}
          onChange={(e) => setBioSize(e.target.value)}
          className="w-full bg-slate-100 p-4 rounded-2xl border-2 border-slate-300 font-black text-lg text-slate-900 outline-none"
        >
          <option value="text-sm">Pequeña</option>
          <option value="text-base">Normal</option>
          <option value="text-lg">Grande</option>
          <option value="text-xl">Gigante</option>
        </select>
      </div>

      {/* SECCIÓN 2: PALETA DE COLORES */}
      <div className="bg-white p-6 rounded-[2.5rem] border-2 border-slate-400 shadow-md space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-100 pb-3">
          <Palette size={20} className="text-slate-900" />
          <h2 className="text-[14px] font-black text-slate-900 uppercase tracking-widest">
            Colores y Aspecto
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="group">
            <label className="block text-[13px] font-black text-slate-800 uppercase mb-2 ml-1">
              Fondo de la página
            </label>
            <div className="flex items-center gap-4 bg-slate-100 p-4 rounded-2xl border-2 border-slate-300 shadow-inner">
              <div
                className="relative w-14 h-14 shrink-0 overflow-hidden rounded-xl border-2 border-white shadow-md"
                style={{ backgroundColor: bgColor }}
              >
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="absolute inset-0 w-full h-full cursor-pointer opacity-0 scale-150"
                />
              </div>
              <input
                type="text"
                value={bgColor || ""}
                onChange={(e) => setBgColor(e.target.value)}
                className="flex-1 bg-transparent font-black text-xl text-slate-900 outline-none uppercase tracking-tighter"
              />
            </div>
          </div>

          <div className="group">
            <label className="block text-[13px] font-black text-slate-800 uppercase mb-2 ml-1">
              Color de los Botones
            </label>
            <div className="flex items-center gap-4 bg-slate-100 p-4 rounded-2xl border-2 border-slate-300 shadow-inner">
              <div
                className="relative w-14 h-14 shrink-0 overflow-hidden rounded-xl border-2 border-white shadow-md"
                style={{ backgroundColor: btnColor }}
              >
                <input
                  type="color"
                  value={btnColor}
                  onChange={(e) => setBtnColor(e.target.value)}
                  className="absolute inset-0 w-full h-full cursor-pointer opacity-0 scale-150"
                />
              </div>
              <input
                type="text"
                value={btnColor || ""}
                onChange={(e) => setBtnColor(e.target.value)}
                className="flex-1 bg-transparent font-black text-xl text-slate-900 outline-none uppercase tracking-tighter"
              />
            </div>
          </div>

          <div className="group">
            <label className="block text-[13px] font-black text-slate-800 uppercase mb-2 ml-1">
              Color de las Letras del Botón
            </label>
            <div className="flex items-center gap-4 bg-slate-100 p-4 rounded-2xl border-2 border-slate-300 shadow-inner">
              <div
                className="relative w-14 h-14 shrink-0 overflow-hidden rounded-xl border-2 border-white shadow-md"
                style={{ backgroundColor: btnTextColor }}
              >
                <input
                  type="color"
                  value={btnTextColor}
                  onChange={(e) => setBtnTextColor(e.target.value)}
                  className="absolute inset-0 w-full h-full cursor-pointer opacity-0 scale-150"
                />
              </div>
              <input
                type="text"
                value={btnTextColor || ""}
                onChange={(e) => setBtnTextColor(e.target.value)}
                className="flex-1 bg-transparent font-black text-xl text-slate-900 outline-none uppercase tracking-tighter"
              />
            </div>
          </div>

          <div className="group">
            <label className="block text-[13px] font-black text-slate-800 uppercase mb-2 ml-1">
              Forma de Bordes
            </label>
            <select
              value={btnStyle || "rounded-xl"}
              onChange={(e) => setBtnStyle(e.target.value)}
              className="w-full h-[88px] bg-slate-100 p-4 rounded-2xl border-2 border-slate-300 font-black text-lg text-slate-900 outline-none focus:border-blue-600 cursor-pointer appearance-none"
            >
              <option value="rounded-none">RECTO / CUADRADO</option>
              <option value="rounded-2xl">BORDES SUAVES</option>
              <option value="rounded-full">OVALADO / CÁPSULA</option>
            </select>
          </div>

          <div className="group">
            <label className="block text-[13px] font-black text-slate-800 uppercase mb-2 ml-1">
              Color del Título
            </label>
            <div className="flex items-center gap-4 bg-slate-100 p-4 rounded-2xl border-2 border-slate-300 shadow-inner">
              <div
                className="relative w-14 h-14 shrink-0 overflow-hidden rounded-xl border-2 border-white shadow-md"
                style={{ backgroundColor: nameColor }}
              >
                <input
                  type="color"
                  value={nameColor}
                  onChange={(e) => setNameColor(e.target.value)}
                  className="absolute inset-0 w-full h-full cursor-pointer opacity-0 scale-150"
                />
              </div>
              <input
                type="text"
                value={nameColor || ""}
                onChange={(e) => setNameColor(e.target.value)}
                className="flex-1 bg-transparent font-black text-xl text-slate-900 outline-none uppercase tracking-tighter"
              />
            </div>
          </div>

          <div className="group">
            <label className="block text-[13px] font-black text-slate-800 uppercase mb-2 ml-1">
              Color de la Descripción
            </label>
            <div className="flex items-center gap-4 bg-slate-100 p-4 rounded-2xl border-2 border-slate-300 shadow-inner">
              <div
                className="relative w-14 h-14 shrink-0 overflow-hidden rounded-xl border-2 border-white shadow-md"
                style={{ backgroundColor: bioColor }}
              >
                <input
                  type="color"
                  value={bioColor}
                  onChange={(e) => setBioColor(e.target.value)}
                  className="absolute inset-0 w-full h-full cursor-pointer opacity-0 scale-150"
                />
              </div>
              <input
                type="text"
                value={bioColor || ""}
                onChange={(e) => setBioColor(e.target.value)}
                className="flex-1 bg-transparent font-black text-xl text-slate-900 outline-none uppercase tracking-tighter"
              />
            </div>
          </div>

          {/* IMAGEN DE FONDO */}
          <div className="group md:col-span-2 space-y-2">
            <label className="block text-[13px] font-black text-slate-800 uppercase mb-2 ml-1">
              Imagen de Fondo
            </label>
            <div className="flex items-center gap-3 bg-slate-100 p-4 rounded-2xl border-2 border-slate-300 shadow-inner">
              <div className="w-14 h-14 shrink-0 bg-slate-200 rounded-xl flex items-center justify-center border border-slate-300 overflow-hidden">
                {bgImage ? (
                  <img src={bgImage} className="w-full h-full object-cover" alt="Background" />
                ) : (
                  <ImageIcon size={22} className="text-slate-400" />
                )}
              </div>
              <input
                type="text"
                value={bgImage || ""}
                onChange={(e) => setBgImage(e.target.value)}
                placeholder="URL de fondo..."
                className="flex-1 bg-transparent font-bold text-sm outline-none text-blue-700 italic"
              />
              <label className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-black cursor-pointer hover:bg-slate-700 transition-all">
                SUBIR
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    try {
                      setUploading(true);
                      const url = await subirImagen(file, "biolinks/fondos");
                      setBgImage(url);
                    } catch (error) {
                      console.error(error);
                      alert("Error al subir fondo");
                    } finally {
                      setUploading(false);
                    }
                  }}
                />
              </label>
            </div>
            <p className="text-[10px] text-slate-500 font-bold ml-2 italic uppercase">
              * La imagen tapa el color de fondo si está presente.
            </p>
          </div>
        </div>
      </div>

      {/* SECCIÓN 3: GESTIÓN DE ENLACES */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-4">
          <h2 className="text-[14px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2 italic">
            <Plus size={16} /> Mis Enlaces
          </h2>
          <button
            type="button"
            onClick={agregarLink}
            className="bg-slate-900 text-white px-5 py-2.5 rounded-full font-black text-[12px] shadow-lg hover:bg-slate-800 transition-all flex items-center gap-2"
          >
            + AGREGAR BOTÓN
          </button>
        </div>

        <div className="space-y-5">
          {links.map((link, index) => (
            <div
              key={link.id}
              className="bg-white p-6 rounded-[2.5rem] border-2 border-slate-400 shadow-lg relative group"
            >
              <button
                type="button"
                onClick={() => eliminarLink(link.id)}
                className="absolute -top-3 -right-3 bg-red-600 text-white p-3 rounded-full border-4 border-white shadow-xl hover:bg-red-700 transition-all z-10"
              >
                <Trash2 size={20} />
              </button>

              <div className="flex gap-5">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center border-2 border-slate-300 shadow-inner overflow-hidden shrink-0">
                  {link.icon ? (
                    <img
                      src={link.icon}
                      className="w-full h-full object-contain p-2"
                      alt="Icono"
                    />
                  ) : (
                    <ImageIcon size={24} className="text-slate-400" />
                  )}
                </div>

                <div className="flex-1 space-y-3">
                  <input
                    value={link.label || ""}
                    onChange={(e) => {
                      const newLinks = [...links];
                      newLinks[index].label = e.target.value;
                      setLinks(newLinks);
                    }}
                    placeholder="TITULO DEL BOTÓN"
                    className="w-full font-black text-lg outline-none text-slate-900 bg-slate-50 p-2 rounded-lg border-b-4 border-slate-200 focus:border-blue-600 uppercase"
                  />

                  {/* INPUT URL DESTINO */}
                  <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-xl border-2 border-slate-200 focus-within:border-blue-600 shadow-inner">
                    <Globe size={14} className="text-slate-700" />
                    <input
                      value={link.url || ""}
                      onChange={(e) => {
                        const newLinks = [...links];
                        newLinks[index].url = e.target.value;
                        setLinks(newLinks);
                      }}
                      placeholder="URL de destino (https://...)"
                      className="w-full bg-transparent text-[13px] font-bold text-slate-800 outline-none"
                    />
                  </div>

                  {/* ICONO */}
                  <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-xl border-2 border-slate-200 focus-within:border-blue-600 shadow-inner">
                    <ImageIcon size={14} className="text-slate-700" />
                    <input
                      value={link.icon || ""}
                      onChange={(e) => {
                        const newLinks = [...links];
                        newLinks[index].icon = e.target.value;
                        setLinks(newLinks);
                      }}
                      placeholder="URL del icono"
                      className="w-full bg-transparent text-[13px] font-bold text-blue-700 italic outline-none"
                    />
                    <label className="bg-slate-900 text-white px-3 py-1 rounded-lg text-[11px] font-black cursor-pointer hover:bg-slate-700 transition-all">
                      SUBIR
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;

                          try {
                            setUploading(true);
                            const url = await subirImagen(file, "biolinks/iconos");
                            const newLinks = [...links];
                            newLinks[index].icon = url;
                            setLinks(newLinks);
                          } catch (error) {
                            console.error(error);
                            alert("Error al subir icono");
                          } finally {
                            setUploading(false);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}