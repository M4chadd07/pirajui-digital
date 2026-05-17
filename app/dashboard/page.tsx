"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
  const router = useRouter();
  const [cargo, setCargo] = useState<string | null>(null);

  useEffect(() => {
    const cargoSalvo = localStorage.getItem("usuarioCargo");
    if (!cargoSalvo) {
      router.push("/login"); 
    } else {
      setCargo(cargoSalvo);
    }
  }, [router]);

  const fazerLogout = () => {
    localStorage.removeItem("usuarioCargo");
    router.push("/login");
  };

  if (!cargo) return null;

  let etiquetaCargo = "Servidor";
  if (cargo === "prefeito") etiquetaCargo = "Prefeito(a)";
  else if (cargo === "secretario_obras" || cargo === "secretario") etiquetaCargo = "Sec. de Obras";
  else if (cargo === "secretario_saude") etiquetaCargo = "Sec. de Saúde";

  const verObras = cargo === "prefeito" || cargo === "secretario_obras" || cargo === "secretario";
  const verSaude = cargo === "prefeito" || cargo === "secretario_saude";
  const verTudo = cargo === "prefeito";

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-blue-950">Pirajuí Digital</h1>
          <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
            {etiquetaCargo}
          </span>
        </div>
        <button onClick={fazerLogout} className="text-slate-500 hover:text-red-600 transition flex items-center gap-2 text-sm font-bold">
          Sair do Sistema <span className="text-lg">🚪</span>
        </button>
      </header>

      <main className="max-w-6xl mx-auto p-6 md:p-10">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Visão Geral</h2>
          <p className="text-slate-500 text-lg">Selecione o módulo que deseja acessar hoje.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {verObras && (
            <>
              <Link href="/dashboard/zeladoria" className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition group">
                 <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:bg-orange-100 group-hover:scale-105 transition">🚧</div>
                 <h3 className="text-xl font-bold text-slate-800 mb-1">Alô Pirajuí (Zeladoria)</h3>
                 <p className="text-sm text-slate-500">Gestão de buracos, iluminação e limpeza.</p>
              </Link>

              <Link href="/dashboard/frota" className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition group">
                 <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:bg-blue-100 group-hover:scale-105 transition">🚐</div>
                 <h3 className="text-xl font-bold text-slate-800 mb-1">Controle de Frota</h3>
                 <p className="text-sm text-slate-500">Combustível, manutenção e rotas.</p>
              </Link>
            </>
          )}

          {verSaude && (
            <>
              <Link href="/dashboard/agendamentos" className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition group">
                 <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:bg-emerald-100 group-hover:scale-105 transition">🩺</div>
                 <h3 className="text-xl font-bold text-slate-800 mb-1">Agendamentos</h3>
                 <p className="text-sm text-slate-500">Postos de saúde e atendimentos.</p>
              </Link>

              <Link href="/dashboard/almoxarifado" className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition group">
                 <div className="w-14 h-14 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:bg-yellow-100 group-hover:scale-105 transition">📦</div>
                 <h3 className="text-xl font-bold text-slate-800 mb-1">Almoxarifado Saúde</h3>
                 <p className="text-sm text-slate-500">Controle de estoque de medicamentos.</p>
              </Link>
            </>
          )}

          {verTudo && (
            <>
              <Link href="/dashboard/empregos" className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition group">
                 <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:bg-purple-100 group-hover:scale-105 transition">💼</div>
                 <h3 className="text-xl font-bold text-slate-800 mb-1">Balcão de Empregos</h3>
                 <p className="text-sm text-slate-500">Conexão entre empresas e cidadãos.</p>
              </Link>

              <Link href="/dashboard/protocolos" className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition group">
                 <div className="w-14 h-14 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:bg-slate-200 group-hover:scale-105 transition">📄</div>
                 <h3 className="text-xl font-bold text-slate-800 mb-1">Protocolos Internos</h3>
                 <p className="text-sm text-slate-500">Ofícios e comunicação sem papel.</p>
              </Link>
            </>
          )}

        </div>
      </main>
    </div>
  );
}