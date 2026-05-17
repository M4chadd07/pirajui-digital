"use client";

import { useState } from "react";
import { ArrowLeft, Briefcase, Building2, MapPin, Search, DollarSign, CheckCircle, X, AlignLeft, GraduationCap } from "lucide-react";
import Link from "next/link";

export default function EmpregosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Novo estado para o modal de detalhes da vaga
  const [selectedVaga, setSelectedVaga] = useState<any>(null);

  const vagas = [
    { id: "VAG-001", titulo: "Auxiliar Administrativo", empresa: "Comércio Local", local: "Centro", salario: "R$ 1.800,00", tipo: "Tempo Integral", status: "Aberta", descricao: "Atendimento ao público, organização de arquivos, preenchimento de planilhas e suporte geral ao escritório.", requisitos: "Ensino médio completo e conhecimento básico em pacote Office (Excel e Word)." },
    { id: "VAG-002", titulo: "Vendedor(a)", empresa: "Loja de Confecções", local: "Centro", salario: "A combinar", tipo: "Tempo Integral", status: "Aberta", descricao: "Atendimento direto ao cliente, organização de vitrines, controle de estoque básico e reposição de peças.", requisitos: "Boa comunicação, proatividade. Experiência prévia com vendas será um diferencial." },
    { id: "VAG-003", titulo: "Pedreiro", empresa: "Construtora Silva", local: "Bairro Nova Pirajuí", salario: "R$ 3.000,00", tipo: "Temporário", status: "Aberta", descricao: "Atuar em obra residencial, realizando serviços de alvenaria, concretagem, reboco e pequenos revestimentos.", requisitos: "Experiência comprovada na função. Necessário levar ferramentas básicas de uso pessoal." },
    { id: "VAG-004", titulo: "Recepcionista", empresa: "Clínica Vida", local: "Vila Esperança", salario: "R$ 1.600,00", tipo: "Meio Período", status: "Em Entrevistas", descricao: "Recepção de pacientes, agendamento de consultas pelo sistema, atendimento telefônico e via WhatsApp.", requisitos: "Ensino médio completo, simpatia, organização e facilidade com computadores." },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aberta": return "bg-green-100 text-green-700";
      case "Em Entrevistas": return "bg-amber-100 text-amber-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Balcão de Empregos</h1>
            <p className="text-sm text-gray-500">Conexão entre empresas e talentos locais</p>
          </div>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors flex items-center gap-2">
          <Briefcase size={20} />
          <span className="hidden sm:inline">Anunciar Vaga</span>
        </button>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 text-gray-900" placeholder="Buscar vagas por cargo ou empresa..." />
          </div>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors border border-gray-300">
            Filtrar
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vagas.map((vaga) => (
            <div key={vaga.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-purple-300 transition-all flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-purple-100 p-3 rounded-lg text-purple-600">
                  <Briefcase size={24} />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(vaga.status)}`}>{vaga.status}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{vaga.titulo}</h3>
              <div className="space-y-2 mb-6 flex-1">
                <div className="flex items-center gap-2 text-gray-600 text-sm"><Building2 size={16} className="text-gray-400" /><span>{vaga.empresa}</span></div>
                <div className="flex items-center gap-2 text-gray-600 text-sm"><MapPin size={16} className="text-gray-400" /><span>{vaga.local}</span></div>
                <div className="flex items-center gap-2 text-gray-600 text-sm"><DollarSign size={16} className="text-gray-400" /><span>{vaga.salario}</span></div>
                <div className="flex items-center gap-2 text-gray-600 text-sm"><CheckCircle size={16} className="text-gray-400" /><span>{vaga.tipo}</span></div>
              </div>
              <div className="pt-4 border-t border-gray-100 flex gap-3">
                <button onClick={() => setSelectedVaga(vaga)} className="flex-1 bg-purple-50 text-purple-700 hover:bg-purple-100 py-2 rounded-lg font-medium transition-colors text-sm">
                  Ver Detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      {/* MODAL DE ANÚNCIO DE VAGA */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Anunciar Nova Vaga</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors p-1"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título da Vaga</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 bg-white placeholder-gray-400" placeholder="Ex: Atendente de Loja" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Empresa</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 bg-white placeholder-gray-400" placeholder="Empresa responsável" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Contrato</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 bg-white">
                    <option>Tempo Integral</option>
                    <option>Meio Período</option>
                    <option>Temporário</option>
                    <option>Estágio</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Salário</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 bg-white placeholder-gray-400" placeholder="R$ ou 'A combinar'" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Requisitos Mínimos</label>
                <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 bg-white placeholder-gray-400 resize-none h-24" placeholder="Descreva as exigências para a vaga..."></textarea>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition-colors">Cancelar</button>
              <button onClick={() => { alert('Vaga publicada no mural com sucesso!'); setIsModalOpen(false); }} className="px-4 py-2 bg-purple-600 text-white font-medium hover:bg-purple-700 rounded-lg transition-colors shadow-sm">Publicar Vaga</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE DETALHES DA VAGA */}
      {selectedVaga && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-slate-50">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Informações da Vaga</h2>
                <span className="text-sm font-mono text-gray-500">{selectedVaga.id}</span>
              </div>
              <button onClick={() => setSelectedVaga(null)} className="text-gray-400 hover:text-red-500 transition-colors p-1"><X size={20} /></button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedVaga.titulo}</h3>
                  <div className="flex items-center gap-2 text-gray-600 mt-1">
                    <Building2 size={16} className="text-gray-400"/>
                    <span className="text-sm font-medium">{selectedVaga.empresa}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(selectedVaga.status)}`}>
                  {selectedVaga.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1"><DollarSign size={14}/> Remuneração</h4>
                  <p className="text-sm font-medium text-gray-900">{selectedVaga.salario}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1"><CheckCircle size={14}/> Contrato</h4>
                  <p className="text-sm font-medium text-gray-900">{selectedVaga.tipo}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-gray-800 mb-1 flex items-center gap-2"><AlignLeft size={16}/> Descrição das Atividades</h4>
                  <p className="text-sm text-gray-700 bg-white p-3 border border-gray-100 rounded-md">{selectedVaga.descricao}</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800 mb-1 flex items-center gap-2"><GraduationCap size={16}/> Requisitos</h4>
                  <p className="text-sm text-gray-700 bg-white p-3 border border-gray-100 rounded-md">{selectedVaga.requisitos}</p>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setSelectedVaga(null)} className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition-colors">Fechar</button>
              <button onClick={() => { alert('Candidato encaminhado para a vaga com sucesso!'); setSelectedVaga(null); }} className="px-4 py-2 bg-purple-600 text-white font-medium hover:bg-purple-700 rounded-lg transition-colors shadow-sm">Encaminhar Candidato</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}