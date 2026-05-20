"use client";
import { signOut } from "next-auth/react";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  Settings, 
  ExternalLink, 
  Trash2, 
  User as UserIcon, 
  Search,
  RefreshCw
} from 'lucide-react';

export default function AdminDashboard() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const router = useRouter();

  // CARGA DE CLIENTES DESDE LA API
  const cargarClientes = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/user');
      const data = await res.json();
      setClientes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al sincronizar:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  // CREAR NUEVO CLIENTE
  const crearCliente = async () => {
    const nombre = prompt("Nombre del nuevo emprendimiento:");
    if (!nombre) return;

    try {
      const res = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessName: nombre }),
      });
      
      if (res.ok) {
        cargarClientes(); // Recargamos la lista para ver el nuevo ID
      } else {
        alert("Error al crear el cliente");
      }
    } catch (error) {
      alert("Error de conexión");
    }
  };

  // ELIMINAR CLIENTE (CON PERSISTENCIA Y SEGURIDAD)
  const eliminarCliente = async (id: string, nombreReal: string) => {
    const confirmacion = prompt(`SEGURIDAD: Escribí exactamente "${nombreReal}" para confirmar la eliminación definitiva:`);

    if (confirmacion === nombreReal) {
      try {
        const res = await fetch(`/api/user/${id}`, { method: 'DELETE' });

        if (res.ok) {
          // Filtramos el estado local para que desaparezca al instante
          setClientes(prev => prev.filter(c => c.id !== id));
          alert("✅ Cliente eliminado de la base de datos.");
        } else {
          alert("❌ El servidor no pudo procesar la eliminación.");
        }
      } catch (error) {
        alert("❌ Error de comunicación con la API.");
      }
    } else if (confirmacion !== null) {
      alert("⚠️ El nombre no coincide. Operación cancelada.");
    }
  };

  // Lógica de filtrado para la búsqueda
  const clientesFiltrados = clientes.filter(c => 
    c.businessName?.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (loading && clientes.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="animate-spin text-blue-600" size={40} />
          <p className="font-bold text-slate-500 tracking-tighter">Sincronizando Miling...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10 pb-20">
      <div className="max-w-6xl mx-auto">
        <button
  onClick={() => signOut({ callbackUrl: "/" })}
  className="bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase px-4 py-2.5 rounded-xl shadow-md transition-all tracking-wider"
>
  Cerrar Sesión
</button>
        {/* ENCABEZADO */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black italic text-blue-600 tracking-tighter">Miling.</h1>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Panel de Control General</p>
          </div>
          
          <button 
            onClick={crearCliente}
            className="bg-blue-600 text-white px-8 py-4 rounded-[1.5rem] font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center gap-2"
          >
            <Plus size={20} /> NUEVO CLIENTE
          </button>
        </div>

        {/* BUSCADOR */}
        <div className="bg-white p-5 rounded-[2rem] border shadow-sm mb-8 flex items-center gap-4">
          <div className="bg-slate-50 p-3 rounded-2xl text-slate-400">
            <Search size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Buscar emprendimiento por nombre..." 
            className="flex-1 outline-none text-base font-semibold text-slate-700 placeholder:text-slate-300"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <div className="hidden sm:block text-[10px] font-black text-slate-400 bg-slate-100 px-4 py-2 rounded-full uppercase">
            {clientesFiltrados.length} Total
          </div>
        </div>

        {/* TABLA DE GESTIÓN */}
        <div className="bg-white rounded-[2.5rem] border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/50 border-b">
                <tr>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Emprendimiento</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hidden md:table-cell">Slug</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hidden md:table-cell text-center">Estado</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {clientesFiltrados.map((cliente) => (
                  <tr key={cliente.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 border border-blue-100 shadow-sm">
                          {cliente.image ? (
                            <img src={cliente.image} className="w-full h-full object-cover rounded-2xl" alt="" />
                          ) : (
                            <UserIcon size={20} />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-black text-slate-700 text-lg tracking-tight">{cliente.businessName}</span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase">{cliente.id.substring(0,8)}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 hidden md:table-cell">
                      <span className="text-xs font-mono text-blue-500 bg-blue-50/50 px-3 py-1.5 rounded-xl border border-blue-100">
                        /{cliente.slug}
                      </span>
                    </td>
                    <td className="px-8 py-6 hidden md:table-cell text-center">
                      <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${cliente.links?.length > 0 ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                        {cliente.links?.length || 0} Enlaces
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-end items-center gap-3">
                        <a 
                          href={`/${cliente.slug}`} 
                          target="_blank"
                          className="p-3 text-slate-400 hover:text-blue-600 hover:bg-white rounded-2xl transition-all shadow-none hover:shadow-sm border border-transparent hover:border-slate-100"
                        >
                          <ExternalLink size={18} />
                        </a>
                        <button 
                          onClick={() => router.push(`/admin/editar/${cliente.id}`)}
                          className="p-3 text-slate-400 hover:text-blue-600 hover:bg-white rounded-2xl transition-all shadow-none hover:shadow-sm border border-transparent hover:border-slate-100"
                        >
                          <Settings size={18} />
                        </button>
                        <button 
                          onClick={() => eliminarCliente(cliente.id, cliente.businessName)}
                          className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {clientesFiltrados.length === 0 && !loading && (
            <div className="p-20 text-center">
              <p className="text-slate-400 font-bold italic tracking-tighter">No se encontraron clientes activos.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}