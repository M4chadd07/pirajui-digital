"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const fazerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulação para testarmos quem é Prefeito e quem é Secretário
    if (email === "prefeito@pirajui.sp.gov.br" && senha === "123") {
      localStorage.setItem("usuarioCargo", "prefeito");
      router.push("/dashboard");
    } 
    else if (email === "obras@pirajui.sp.gov.br" && senha === "123") {
      localStorage.setItem("usuarioCargo", "secretario");
      router.push("/dashboard");
    }
    else {
      setErro("E-mail ou senha incorretos. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 font-sans">
      
      {/* Botão de Voltar para o Site */}
      <div className="absolute top-6 left-6">
        <Link href="/" className="text-blue-900 font-medium hover:underline flex items-center gap-2">
          ← Voltar ao Portal
        </Link>
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-blue-950 p-8 text-center text-white">
          <div className="text-4xl mb-4">🏛️</div>
          <h2 className="text-2xl font-bold">Acesso Restrito</h2>
          <p className="text-blue-200 text-sm mt-2">Painel do Servidor - Pirajuí Digital</p>
        </div>

        <div className="p-8">
          <form onSubmit={fazerLogin} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">E-mail Institucional</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemplo@pirajui.sp.gov.br"
                /* Forçando a letra escura com text-slate-900 */
                className="w-full px-4 py-3 text-slate-900 bg-white rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Senha</label>
              <input 
                type="password" 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                /* Forçando a letra escura com text-slate-900 */
                className="w-full px-4 py-3 text-slate-900 bg-white rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition"
                required
              />
            </div>

            {erro && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center font-medium border border-red-100">
                {erro}
              </div>
            )}

            <button type="submit" className="w-full bg-blue-900 text-white font-bold py-3 rounded-lg hover:bg-blue-950 transition mt-2 shadow-md">
              Entrar no Sistema
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}