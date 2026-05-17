"use client";

import { useState } from "react";
import { ArrowLeft, AlertCircle, CheckCircle2, Clock, X, MapPin, FileText, User } from "lucide-react";
import Link from "next/link";

export default function ZeladoriaPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Novo estado para controlar a janela de detalhes
  const [selectedChamado, setSelectedChamado] = useState<any>(null);

  const chamados = [
    { id: "O.S. #1024", tipo: "Buraco na via", local: "Rua 15 de Novembro, Centro", status: "Pendente", data: "17/05/2026", descricao: "Buraco fundo na faixa da direita, logo após o semáforo. Risco de danos aos veículos.", solicitante: "João da Silva", telefone: "(14) 99999-1111" },
    { id: "O.S. #1023", tipo: "Lâmpada Queimada", local: "Praça da Matriz", status: "Em Andamento", data: "16/05/2026", descricao: "Poste central da praça está com a lâmpada piscando e apagando totalmente à noite.", solicitante: "Maria Oliveira", telefone: "(14) 98888-2222" },
    { id: "O.S. #1022", tipo: "Limpeza de Terreno", local: "Bairro Nova Pirajuí", status: "Concluído", data: "15/05/2026", descricao: "Mato muito alto e acúmulo de entulho no terreno da esquina.", solicitante: "Carlos Souza", telefone: "(14) 97777-3333" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pendente": return <span className="flex items-center gap-1 bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium w-max"><AlertCircle size={14}/> Pendente</span>;
      case "Em Andamento": return <span className="flex items-center gap-1 bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs font-medium w-max"><Clock size={14}/> Em Andamento</span>;
      case "Concluído": return <span className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium w-max"><CheckCircle2 size={14}/> Concluído</span>;
      default: return <span>{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Alô Pirajuí - Zeladoria</h1>
            <p className="text-sm text-gray-500">Gestão de chamados urbanos</p>
          </div>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors">
          + Nova Ordem de Serviço
        </button>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Protocolo</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Problema</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Localização</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ação</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {chamados.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.tipo}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.local}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.data}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(item.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {/* Aqui está o pulo do gato: ao clicar, guardamos o item clicado */}
                      <button onClick={() => setSelectedChamado(item)} className="text-blue-600 hover:text-blue-900">
                        Ver detalhes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      {/* MODAL DE NOVA ORDEM DE SERVIÇO */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Abrir Nova O.S.</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors p-1"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Problema</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white">
                  <option>Buraco na via</option>
                  <option>Lâmpada Queimada</option>
                  <option>Limpeza de Terreno</option>
                  <option>Poda de Árvore</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Localização (Endereço)</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white placeholder-gray-400" placeholder="Ex: Rua São João, 123 - Centro" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição Detalhada</label>
                <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none h-24 text-gray-900 bg-white placeholder-gray-400" placeholder="Descreva o problema encontrado..."></textarea>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition-colors">Cancelar</button>
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-orange-500 text-white font-medium hover:bg-orange-600 rounded-lg transition-colors shadow-sm">Salvar Ordem</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE VER DETALHES */}
      {selectedChamado && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-slate-50">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Detalhes da O.S.</h2>
                <span className="text-sm font-mono text-gray-500">{selectedChamado.id}</span>
              </div>
              <button onClick={() => setSelectedChamado(null)} className="text-gray-400 hover:text-red-500 transition-colors p-1"><X size={20} /></button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedChamado.tipo}</h3>
                  <div className="flex items-center gap-2 text-gray-600 mt-1">
                    <MapPin size={16} className="text-gray-400"/>
                    <span className="text-sm">{selectedChamado.local}</span>
                  </div>
                </div>
                {getStatusBadge(selectedChamado.status)}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-3">
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1"><FileText size={14}/> Descrição</h4>
                  <p className="text-sm text-gray-800">{selectedChamado.descricao}</p>
                </div>
              </div>

              <div className="flex items-center gap-8 border-t border-gray-100 pt-4">
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1"><User size={14}/> Solicitante</h4>
                  <p className="text-sm font-medium text-gray-900">{selectedChamado.solicitante}</p>
                  <p className="text-xs text-gray-500">{selectedChamado.telefone}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1"><Clock size={14}/> Data do Registro</h4>
                  <p className="text-sm font-medium text-gray-900">{selectedChamado.data}</p>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setSelectedChamado(null)} className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition-colors">
                Fechar
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 rounded-lg transition-colors shadow-sm">
                Atualizar Status
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}