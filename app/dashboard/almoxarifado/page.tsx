"use client";

import { useState } from "react";
import { ArrowLeft, PackageSearch, PackagePlus, AlertTriangle, CheckCircle2, X, Edit, Box, Truck, Calendar as CalendarIcon } from "lucide-react";
import Link from "next/link";

export default function AlmoxarifadoPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  // Novo estado para a janela de Nova Requisição
  const [isRequisicaoModalOpen, setIsRequisicaoModalOpen] = useState(false);

  const itensEstoque = [
    { id: "MAT-001", nome: "Papel Sulfite A4 (Caixa)", categoria: "Escritório", quantidade: 150, min: 50, status: "Normal", local: "Corredor A, Prat. 2", fornecedor: "Kalunga S.A.", ultimaEntrada: "10/05/2026" },
    { id: "MAT-002", nome: "Caneta Esferográfica Azul", categoria: "Escritório", quantidade: 45, min: 100, status: "Baixo", local: "Corredor A, Prat. 3", fornecedor: "Papelaria Central", ultimaEntrada: "15/04/2026" },
    { id: "MAT-003", nome: "Desinfetante 5L", categoria: "Limpeza", quantidade: 12, min: 20, status: "Baixo", local: "Corredor C, Prat. 1", fornecedor: "LimpBem Distribuidora", ultimaEntrada: "20/04/2026" },
    { id: "MAT-004", nome: "Saco de Lixo 100L", categoria: "Limpeza", quantidade: 300, min: 100, status: "Normal", local: "Corredor C, Prat. 2", fornecedor: "LimpBem Distribuidora", ultimaEntrada: "05/05/2026" },
    { id: "MAT-005", nome: "Cartucho de Tinta Preto", categoria: "Informática", quantidade: 5, min: 5, status: "Crítico", local: "Armário Restrito", fornecedor: "Tech Info", ultimaEntrada: "10/01/2026" },
  ];

  const renderStatus = (status: string) => {
    switch (status) {
      case "Normal": return <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-md text-xs font-medium w-max"><CheckCircle2 size={14}/> {status}</span>;
      case "Baixo": return <span className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-1 rounded-md text-xs font-medium w-max"><AlertTriangle size={14}/> {status}</span>;
      case "Crítico": return <span className="flex items-center gap-1 text-red-600 bg-red-50 px-2 py-1 rounded-md text-xs font-medium w-max"><AlertTriangle size={14}/> {status}</span>;
      default: return <span>{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-2 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Almoxarifado</h1>
            <p className="text-sm text-gray-500">Controle de estoque e requisições</p>
          </div>
        </div>
        <div className="flex gap-2">
          {/* BOTÃO CORRIGIDO AQUI */}
          <button onClick={() => setIsRequisicaoModalOpen(true)} className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium shadow-sm transition-colors hidden sm:block">
            Nova Requisição
          </button>
          <button onClick={() => setIsModalOpen(true)} className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors flex items-center gap-2">
            <PackagePlus size={20} />
            <span className="hidden sm:inline">Entrada de Material</span>
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg text-blue-600"><PackageSearch size={24} /></div>
            <div><p className="text-sm text-gray-500 font-medium">Total de Itens</p><p className="text-2xl font-bold text-gray-900">1.248</p></div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="bg-amber-100 p-3 rounded-lg text-amber-600"><AlertTriangle size={24} /></div>
            <div><p className="text-sm text-gray-500 font-medium">Estoque Baixo</p><p className="text-2xl font-bold text-gray-900">18</p></div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg text-green-600"><CheckCircle2 size={24} /></div>
            <div><p className="text-sm text-gray-500 font-medium">Requisições Atendidas</p><p className="text-2xl font-bold text-gray-900">45</p></div>
          </div>
        </div>

        <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800">Itens em Estoque</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código / Item</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Localização</th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Qtd. Atual</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {itensEstoque.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">{item.nome}</div>
                      <div className="text-xs text-gray-500">{item.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.categoria}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.local}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`text-sm font-bold ${item.quantidade <= item.min ? 'text-red-600' : 'text-gray-900'}`}>{item.quantidade}</span>
                      <span className="text-xs text-gray-400 ml-1">/ {item.min} min</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{renderStatus(item.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => setSelectedItem(item)} className="text-amber-600 hover:text-amber-900 flex items-center justify-end gap-1 w-full">
                        <Edit size={16} /> Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      {/* 1. MODAL DE NOVA REQUISIÇÃO (O QUE FALTAVA) */}
      {isRequisicaoModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Solicitar Material</h2>
              <button onClick={() => setIsRequisicaoModalOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors p-1"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Secretaria/Setor Solicitante</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900 bg-white">
                  <option>Secretaria de Saúde</option>
                  <option>Secretaria de Educação</option>
                  <option>Obras e Infraestrutura</option>
                  <option>Gabinete do Prefeito</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Item Desejado</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900 bg-white">
                    <option>Papel Sulfite A4</option>
                    <option>Caneta Azul</option>
                    <option>Desinfetante</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade</label>
                  <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900 bg-white" placeholder="Ex: 5" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Justificativa / Observação</label>
                <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 resize-none h-20 text-gray-900 bg-white placeholder-gray-400" placeholder="Motivo da solicitação..."></textarea>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setIsRequisicaoModalOpen(false)} className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition-colors">Cancelar</button>
              <button onClick={() => { alert('Requisição enviada para aprovação do Almoxarifado!'); setIsRequisicaoModalOpen(false); }} className="px-4 py-2 bg-gray-800 text-white font-medium hover:bg-gray-900 rounded-lg transition-colors shadow-sm">Enviar Pedido</button>
            </div>
          </div>
        </div>
      )}

      {/* 2. MODAL DE ENTRADA DE MATERIAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Registrar Entrada de Material</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors p-1"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Item</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900 bg-white placeholder-gray-400" placeholder="Ex: Caderno Universitário 100 fls" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900 bg-white">
                    <option>Escritório</option>
                    <option>Limpeza</option>
                    <option>Informática</option>
                    <option>Manutenção</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Localização</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900 bg-white placeholder-gray-400" placeholder="Ex: Corredor B" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade Recebida</label>
                  <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900 bg-white" placeholder="0" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estoque Mínimo</label>
                  <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900 bg-white" placeholder="0" />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition-colors">Cancelar</button>
              <button onClick={() => { alert('Material adicionado ao estoque!'); setIsModalOpen(false); }} className="px-4 py-2 bg-amber-500 text-white font-medium hover:bg-amber-600 rounded-lg transition-colors shadow-sm">Salvar Estoque</button>
            </div>
          </div>
        </div>
      )}

      {/* 3. MODAL DE EDITAR ITEM (DETALHES) */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-slate-50">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Ficha do Material</h2>
                <span className="text-sm font-mono text-gray-500">{selectedItem.id}</span>
              </div>
              <button onClick={() => setSelectedItem(null)} className="text-gray-400 hover:text-red-500 transition-colors p-1"><X size={20} /></button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedItem.nome}</h3>
                  <div className="flex items-center gap-2 text-gray-600 mt-1">
                    <Box size={16} className="text-gray-400"/>
                    <span className="text-sm">{selectedItem.categoria} • {selectedItem.local}</span>
                  </div>
                </div>
                {renderStatus(selectedItem.status)}
              </div>

              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Qtd. Atual</label>
                  <input type="number" defaultValue={selectedItem.quantidade} className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-gray-900 font-bold outline-none focus:ring-1 focus:ring-amber-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Qtd. Mínima (Alerta)</label>
                  <input type="number" defaultValue={selectedItem.min} className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-gray-900 font-bold outline-none focus:ring-1 focus:ring-amber-500" />
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">Dados de Aquisição</h4>
                <div className="space-y-3">
                  <p className="text-sm flex items-center justify-between">
                    <span className="text-gray-500 flex items-center gap-2"><Truck size={16}/> Fornecedor Principal:</span> 
                    <span className="font-medium text-gray-900">{selectedItem.fornecedor}</span>
                  </p>
                  <p className="text-sm flex items-center justify-between">
                    <span className="text-gray-500 flex items-center gap-2"><CalendarIcon size={16}/> Última Entrada:</span> 
                    <span className="font-medium text-gray-900">{selectedItem.ultimaEntrada}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setSelectedItem(null)} className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition-colors">Cancelar</button>
              <button onClick={() => { alert('Estoque atualizado com sucesso!'); setSelectedItem(null); }} className="px-4 py-2 bg-amber-500 text-white font-medium hover:bg-amber-600 rounded-lg transition-colors shadow-sm">Salvar Alterações</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}