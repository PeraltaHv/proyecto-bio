"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Plus, ExternalLink, Settings, Trash2 } from 'lucide-react';

export default function AdminDashboard() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 1. Cargar clientes al entrar
  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => {
        setClientes(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  // 2. Función para crear cliente nuevo
  const crearCliente = async () => {
    const nombre = prompt("Nombre del nuevo emprendimiento:");
    if (!nombre) return;

    const res = await fetch('/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ businessName: nombre }),
    });

    if (res.ok) {
      const nuevo = await res.json();
      router.push(`/admin/editar/${nuevo.id}`);
    }
  };

  if (loading) return <div className="p-10 text-center font-bold">Cargando Clientes Miling...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black italic text-blue-600 italic">Miling.</h1>
          <p className="text-slate-400 text-sm font-medium">Panel de Gestión de Clientes</p>
        </div>
        <button 
          onClick={crearCliente}
          className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2"
        >
          <Plus size={20} /> NUEVO CLIENTE
        </button>
      </div>

      {/* GRILLA DE CLIENTES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clientes.map((cliente) => (
          <div key={cliente.id} className="bg-white p-6 rounded-[2.5rem] border shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                {cliente.businessName.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{cliente.businessName}</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">slug: /{cliente.slug}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => router.push(`/admin/editar/${cliente.id}`)}
                className="flex items-center justify-center gap-2 bg-slate-50 py-3 rounded-xl text-xs font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <Settings size={14} /> EDITAR
              </button>
              
              <a 
                href={`/${cliente.slug}`} 
                target="miling_preview" 
                className="flex items-center justify-center gap-2 bg-slate-50 py-3 rounded-xl text-xs font-bold text-slate-600 hover:bg-green-50 hover:text-green-600 transition-colors"
              >
                <ExternalLink size={14} /> VER BIO
              </a>
            </div>
          </div>
        ))}

        {clientes.length === 0 && (
          <div className="col-span-full py-20 text-center border-2 border-dashed rounded-[3rem] text-slate-400">
            No hay clientes creados todavía. <br />
            Hacé clic en <b>+ Nuevo Cliente</b> para empezar.
          </div>
        )}
      </div>
    </div>
  );
}