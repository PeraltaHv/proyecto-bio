"use client";

import { Check, Globe, BarChart3, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#263059] text-white">
      {/* NAVBAR */}
      <header className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-center">
          <h1 className="text-4xl font-black bg-gradient-to-r from-orange-400 to-pink-400 text-transparent bg-clip-text">
            Mis Bio Links
          </h1>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-10 items-center">
        {/* LEFT */}
        <div>
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 px-4 py-2 rounded-full text-sm text-orange-300 mb-4">
            <Sparkles size={16} />
            Diseños personalizados
          </div>

          <h2 className="text-4xl md:text-5xl font-black leading-[0.88] mb-0">
            Tu bio link
            <br />
            <span className="bg-gradient-to-r from-orange-400 to-pink-400 text-transparent bg-clip-text">
              profesional
            </span>
            <br />
            lista en 24 hs
          </h2>

          <p className="text-white/65 text-lg mt-1 leading-relaxed max-w-2xl">
            Diseñamos tu página de links totalmente personalizada para que
            puedas compartir todos tus contactos, redes sociales, productos o
            servicios desde un solo lugar.
            <br />
            <br />
            Vos no tenés que configurar nada ni registrarte en plataformas
            complicadas. Solo nos contactás, coordinamos el diseño, nos pasás la
            información y te entregamos tu bio link listo para usar en
            Instagram, TikTok, WhatsApp o donde quieras compartirlo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <a
              href="https://wa.me/543513035775"
              target="_blank"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:hover:to-emerald-700 transition-all duration-300 px-8 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg"
            >
              <img
                src="https://res.cloudinary.com/dx8fseipi/image/upload/v1779508955/image1_fenqqi.png"
                alt="WhatsApp"
                className="w-6 h-6 object-contain"
              />
              Contáctanos
            </a>
          </div>

          <div className="flex flex-wrap gap-6 mt-10 text-white/60">
            <div className="flex items-center gap-2">
              <Check className="text-green-400" size={18} />
              Atención personalizada
            </div>

            <div className="flex items-center gap-2">
              <Check className="text-green-400" size={18} />
              Entrega rápida
            </div>

            <div className="flex items-center gap-2">
              <Check className="text-green-400" size={18} />
              Diseño profesional
            </div>
          </div>
        </div>

        {/* MOCKUP */}
        <div className="flex justify-center">
          <div className="w-[320px] h-[650px] rounded-[45px] shadow-2xl overflow-hidden relative">
            <img
              src="https://res.cloudinary.com/dx8fseipi/image/upload/v1779508905/mockup-celular_3_ftvmrs.png"
              alt="Vista previa del Bio Link"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6">
              <Sparkles className="text-orange-400" size={30} />
            </div>

            <h3 className="text-3xl font-bold mb-4">Personalizable</h3>

            <p className="text-white/60 text-lg">
              Colores y diseño adaptado a tu marca.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6">
              <BarChart3 className="text-orange-400" size={30} />
            </div>

            <h3 className="text-3xl font-bold mb-4">Más Profesional</h3>

            <p className="text-white/60 text-lg">
              Destaca frente a otras marcas.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6">
              <Globe className="text-orange-400" size={30} />
            </div>

            <h3 className="text-3xl font-bold mb-4">Listo para compartir</h3>

            <p className="text-white/60 text-lg">
              Tu página optimizada para Instagram, TikTok y WhatsApp.
            </p>
          </div>
        </div>
      </section>

      {/* PLANES */}
      <section className="max-w-7xl mx-auto px-6 pb-28">
        <div className="text-center mb-14">
          <h2 className="text-5xl font-black mb-4">Planes</h2>

          <p className="text-white/60 text-xl">
            Elegí el plan ideal para mostrar tu marca de manera profesional.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* PLAN BASICO */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-10">
            <div className="mb-6">
              <h3 className="text-4xl font-black mb-2">Básico</h3>

              <p className="text-white/60">Ideal para comenzar.</p>
            </div>

            <div className="mb-8">
              <span className="text-6xl font-black">$9.000</span>

              <p className="text-green-400 mt-2 font-semibold">Pago único</p>
            </div>

            <div className="space-y-4 text-white/75">
              <div className="flex items-center gap-3">
                <Check className="text-green-400" />
                Hasta 5 links personalizados
              </div>

              <div className="flex items-center gap-3">
                <Check className="text-green-400" />
                Diseño moderno
              </div>

              <div className="flex items-center gap-3">
                <Check className="text-green-400" />
                Optimizado para celulares
              </div>
              <div className="flex items-center gap-3">
                <Check className="text-green-400" />
                Entrega rápida
              </div>
            </div>
          </div>

          {/* PLAN PREMIUM */}
          <div className="bg-gradient-to-b from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-3xl p-10 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-green-500 text-black px-4 py-1 rounded-full text-sm font-bold">
              MÁS ELEGIDO
            </div>

            <div className="mb-6">
              <h3 className="text-4xl font-black mb-2">Premium</h3>

              <p className="text-white/60">
                Para marcas y negocios que quieren destacar.
              </p>
            </div>

            <div className="mb-8">
              <span className="text-6xl font-black">$15.000</span>

              <p className="text-green-400 mt-2 font-semibold">Pago único</p>
            </div>

            <div className="space-y-4 text-white/75">
              <div className="flex items-center gap-3">
                <Check className="text-green-400" />
                Links ilimitados
              </div>

              <div className="flex items-center gap-3">
                <Check className="text-green-400" />
                Diseño totalmente personalizado
              </div>

              <div className="flex items-center gap-3">
                <Check className="text-green-400" />
                Colores y estilo de tu marca
              </div>

              <div className="flex items-center gap-3">
                <Check className="text-green-400" />
                Imagen profesional para tu marca
              </div>

              <div className="flex items-center gap-3">
                <Check className="text-green-400" />
                Atención prioritaria
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTON FLOTANTE */}
      <a
        href="https://wa.me/543513035775"
        target="_blank"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl z-50"
      >
        <img
          src="/images/whatsapp-logo.png"
          alt="WhatsApp"
          className="w-8 h-8 object-contain"
        />
      </a>
    </main>
  );
}
