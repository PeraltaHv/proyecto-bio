"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Intentamos iniciar sesión
    const result = await signIn("credentials", {
      username,
      password,
      redirect: false, // Controlamos la redirección manualmente
    });

    if (result?.error) {
      setError("Credenciales incorrectas de Administrador");
    } else {
      // Si es correcto, te manda directo a tu panel principal (landing de administración)
      router.push("/landing");
      router.refresh();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-200 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2rem] border-2 border-slate-400 shadow-2xl w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">ADMIN LOGIN</h1>
          <p className="text-xs text-slate-500 font-bold uppercase mt-1">Acceso exclusivo de plataforma</p>
        </div>

        {error && (
          <div className="bg-red-100 border-2 border-red-400 text-red-700 p-3 rounded-xl text-xs font-bold uppercase text-center">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-[11px] font-black text-slate-700 uppercase mb-1 ml-1">Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-50 p-3 rounded-xl border-2 border-slate-200 outline-none focus:border-blue-600 font-bold"
              placeholder="Tu usuario"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-black text-slate-700 uppercase mb-1 ml-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 p-3 rounded-xl border-2 border-slate-200 outline-none focus:border-blue-600 font-bold"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <button type="submit" className="w-full bg-blue-700 text-white py-3.5 rounded-xl font-black text-sm shadow-xl hover:bg-blue-800 transition-all uppercase tracking-wider">
          INGRESAR AL PANEL
        </button>
      </form>
    </div>
  );
}