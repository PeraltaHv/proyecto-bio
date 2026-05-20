import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { 
  Inter, 
  Montserrat, 
  Playfair_Display, 
  Poppins, 
  Bebas_Neue 
} from 'next/font/google';

// Configuramos cada fuente
const inter = Inter({ subsets: ['latin'] });
const montserrat = Montserrat({ subsets: ['latin'] });
const playfair = Playfair_Display({ subsets: ['latin'] });
const poppins = Poppins({ weight: ['400', '700'], subsets: ['latin'] });
const bebas = Bebas_Neue({ weight: ['400'], subsets: ['latin'] });

// Creamos un objeto para mapear el nombre que guardás en la DB con la clase de CSS
const fontMap = {
  'Inter': inter.className,
  'Montserrat': montserrat.className,
  'Playfair': playfair.className,
  'Poppins': poppins.className,
  'Bebas': bebas.className,
};

export default async function BioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const user = await prisma.user.findUnique({
    where: { slug },
    include: { links: true },
  });

  if (!user) notFound();

  return (
    <main 
      className="relative min-h-screen p-6 flex justify-center items-start pt-12 overflow-x-hidden"
      style={{
        backgroundColor: user.bgColor || "#000000",
        backgroundImage: user.bgImage ? `url(${user.bgImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* CAPA DE TRANSPARENCIA: Solo se renderiza si hay imagen de fondo */}
      {user.bgImage && (
        <div 
          className="absolute inset-0 z-0 bg-white/20 backdrop-blur-[2px]" 
          aria-hidden="true"
        />
      )}

      {/* CONTENIDO: Con z-10 para estar por encima de la transparencia */}
      <div className="relative z-10 w-full max-w-[420px] flex flex-col items-center">
        
        {/* Foto de Perfil */}
        <div className="w-24 h-24 rounded-full border-2 border-white/20 overflow-hidden mb-4 shadow-2xl">
          <img 
            src={user.image || '/default.png'} 
            className="w-full h-full object-cover" 
            alt={user.businessName}
          />
        </div>

        {/* Nombre */}
        <h1 
           className={`
    ${fontMap[user.titleFont as keyof typeof fontMap] || inter.className}
    ${user.titleSize || 'text-[30px]'}
    font-bold
    mb-10
    text-center
  `}
          style={{ color: user.nameColor || "#ffffff" }}
        >
          {user.businessName}
        </h1>

        {/* Bio */}
        {user.bio && (
          <p 
          
  className={`
    ${fontMap[user.bioFont as keyof typeof fontMap] || inter.className}
    ${user.bioSize || 'text-base'}
    text-center
    font-medium
    mb-8
    max-w-[90%]
    leading-relaxed
  `}
            style={{ color: user.bioColor || "#ffffff" }}
          >
            {user.bio}
          </p>
        )}

        {/* Links */}
        <div className="w-full flex flex-col gap-4">
         {user.links.map((link: { id: string; icon: string | null; label: string; url: string; order: number; userId: string; }) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center w-full px-4 py-3.5 rounded-2xl shadow-lg font-bold transition-transform active:scale-95 hover:scale-[1.01]"
              style={{ 
                backgroundColor: user.buttonColor || "#ffffff", 
                color: user.textColor || "#000000" 
              }}
            >
              {link.icon && (
                <div className="w-10 h-10 flex items-center justify-center mr-3 bg-white/10 rounded-lg p-1">
                  <img src={link.icon} className="max-w-full max-h-full object-contain" alt="" />
                </div>
              )}
              <span className="flex-1 text-left">{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}