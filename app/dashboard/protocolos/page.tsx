"use client";

import { useState } from "react";
import { ArrowLeft, FileText, Inbox, Send, Archive, Clock, Search, FileSignature, X, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function ProtocolosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  
  // NOVOS ESTADOS: Controlam a aba ativa e o texto da busca
  const [activeTab, setActiveTab] = useState("Caixa de Entrada");
  const [searchTerm, setSearchTerm] = useState("");

  // Adicionei a propriedade 'pasta' para sabermos onde cada documento fica
  const documentos = [
    { id: "PROT-2026/0891", pasta: "Caixa de Entrada", assunto: "Solicitação de Reparos - UBS Centro", origem: "Sec. da Saúde", data: "Hoje, 08:30", status: "Aguardando Leitura", urgente: true, conteudo: "Solicito em caráter de urgência o reparo do telhado da recepção da UBS Centro, que apresentou fortes goteiras após as chuvas da última noite." },
    { id: "PROT-2026/0890", pasta: "Caixa de Entrada", assunto: "Aprovação de Ponto Facultativo", origem: "Gabinete do Prefeito", data: "Ontem, 16:45", status: "Em Análise", urgente: false, conteudo: "Encaminho para análise jurídica a minuta do decreto que estabelece ponto facultativo municipal na próxima sexta-feira." },
    { id: "PROT-2026/0895", pasta: "Para Assinar", assunto: "Contrato de Prestação de Serviços - Limpeza", origem: "Licitações", data: "Hoje, 10:15", status: "Aguardando Assinatura", urgente: true, conteudo: "Favor conferir e assinar digitalmente o contrato anexo referente à empresa vencedora do pregão eletrônico 012/2026." },
    { id: "PROT-2026/0882", pasta: "Enviados", assunto: "Pedido de Licença Prêmio - Matr. 1234", origem: "RH", data: "14/05/2026", status: "Despachado", urgente: false, conteudo: "Encaminho pedido oficial de gozo de licença prêmio do servidor João da Silva para conhecimento e deferimento." },
    { id: "PROT-2026/0885", pasta: "Arquivados", assunto: "Relatório Mensal de Frota", origem: "Sec. de Transportes", data: "10/05/2026", status: "Arquivado", urgente: false, conteudo: "Segue detalhamento contendo a quilometragem rodada e despesas totais com combustível de todos os veículos da prefeitura." },
  ];

  // Lógica que filtra os documentos baseados na aba atual E no que foi digitado na busca
  const filteredDocs = documentos.filter(doc => {
    const matchesTab = doc.pasta === activeTab;
    const matchesSearch = 
      doc.assunto.toLowerCase().includes(searchTerm.toLowerCase()) || 
      doc.origem.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Função para mudar a cor do botão da aba selecionada
  const getTabClass = (tabName: string) => {
    return activeTab === tabName 
      ? "flex w-full items-center gap-3 bg-slate-100 text-slate-700 px-3 py-2 rounded-md font-medium text-sm transition-colors"
      : "flex w-full items-center gap-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-md font-medium text-sm transition-colors";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row relative">
      
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 md:min-h-screen flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center gap-3">
          <Link href="/dashboard" className="text-gray-500 hover:text-slate-600 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <span className="font-bold text-gray-800">Protocolos</span>
        </div>
        
        <div className="p-4">
          <button onClick={() => setIsModalOpen(true)} className="w-full bg-slate-700 hover:bg-slate-800 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 mb-6 shadow-sm">
            <FileText size={18} />
            Novo Ofício
          </button>

          <nav className="space-y-1">
            <button onClick={() => setActiveTab("Caixa de Entrada")} className={getTabClass("Caixa de Entrada")}>
              <Inbox size={18} /> Caixa de Entrada
              <span className="ml-auto bg-slate-200 text-slate-800 py-0.5 px-2 rounded-full text-xs">2</span>
            </button>
            <button onClick={() => setActiveTab("Enviados")} className={getTabClass("Enviados")}>
              <Send size={18} /> Enviados
            </button>
            <button onClick={() => setActiveTab("Para Assinar")} className={getTabClass("Para Assinar")}>
              <FileSignature size={18} /> Para Assinar
              <span className="ml-auto bg-red-100 text-red-600 py-0.5 px-2 rounded-full text-xs">1</span>
            </button>
            <button onClick={() => setActiveTab("Arquivados")} className={getTabClass("Arquivados")}>
              <Archive size={18} /> Arquivados
            </button>
          </nav>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
          <h2 className="text-lg font-semibold text-gray-800">{activeTab}</h2>
          <div className="relative w-full max-w-xs hidden sm:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            {/* INPUT DA BUSCA CONECTADO AO ESTADO */}
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-slate-500 text-gray-900" 
              placeholder="Buscar ofício..." 
            />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto bg-white">
          {filteredDocs.length === 0 ? (
            <div className="p-8 text-center text-gray-500">Nenhum documento encontrado nesta pasta.</div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {filteredDocs.map((doc) => (
                <li 
                  key={doc.id} 
                  onClick={() => setSelectedDoc(doc)}
                  className="p-4 hover:bg-slate-50 cursor-pointer transition-colors group flex items-start gap-4"
                >
                  <div className="mt-1">
                    {doc.urgente ? <div className="w-2 h-2 rounded-full bg-red-500"></div> : <div className="w-2 h-2 rounded-full bg-transparent group-hover:bg-slate-300"></div>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-semibold text-gray-900 truncate pr-4">{doc.origem}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-500 whitespace-nowrap"><Clock size={12} />{doc.data}</div>
                    </div>
                    <p className="text-sm text-gray-800 mb-1">{doc.assunto}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{doc.id}</span>
                      <span className="text-xs font-medium text-slate-600">{doc.status}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      {/* MODAL DE NOVO OFÍCIO */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-slate-50">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FileText className="text-slate-600" size={20}/>
                Redigir Novo Ofício
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors p-1"><X size={20} /></button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Setor de Destino</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-gray-900 bg-white">
                    <option>Gabinete do Prefeito</option>
                    <option>Secretaria da Saúde</option>
                    <option>Secretaria da Educação</option>
                    <option>Recursos Humanos (RH)</option>
                    <option>Obras e Planejamento</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nível de Prioridade</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-gray-900 bg-white">
                    <option>Normal</option>
                    <option>Urgente</option>
                    <option>Altíssima Urgência</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assunto do Documento</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-gray-900 bg-white placeholder-gray-400" placeholder="Resumo do que se trata..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Corpo do Texto / Despacho</label>
                <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-gray-900 bg-white placeholder-gray-400 resize-none h-40" placeholder="Escreva aqui o conteúdo do ofício..."></textarea>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition-colors">Salvar Rascunho</button>
              <button onClick={() => { alert('Ofício enviado com sucesso para a secretaria de destino!'); setIsModalOpen(false); }} className="px-4 py-2 bg-slate-700 text-white font-medium hover:bg-slate-800 rounded-lg transition-colors shadow-sm flex items-center gap-2">
                <Send size={16} /> Enviar Documento
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE LEITURA DO OFÍCIO */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold text-gray-900">Leitura de Documento</h2>
                <span className="text-sm font-mono text-gray-500 bg-gray-200 px-2 py-0.5 rounded">{selectedDoc.id}</span>
              </div>
              <button onClick={() => setSelectedDoc(null)} className="text-gray-400 hover:text-red-500 transition-colors p-1"><X size={20} /></button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedDoc.assunto}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="font-medium">De: {selectedDoc.origem}</span>
                  <span className="flex items-center gap-1"><Clock size={14}/> {selectedDoc.data}</span>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm min-h-[200px]">
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {selectedDoc.conteudo}
                </p>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${selectedDoc.status.includes('Assinatura') ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-700'}`}>
                Status: {selectedDoc.status}
              </span>
              <div className="flex gap-3">
                <button onClick={() => setSelectedDoc(null)} className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition-colors">Fechar</button>
                <button onClick={() => { alert('Documento despachado e assinado digitalmente!'); setSelectedDoc(null); }} className="px-4 py-2 bg-green-600 text-white font-medium hover:bg-green-700 rounded-lg transition-colors shadow-sm flex items-center gap-2">
                  <CheckCircle size={16} /> Despachar Ofício
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}