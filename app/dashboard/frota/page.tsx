"use client";

import { useState } from "react";
import { ArrowLeft, Car, Wrench, Fuel, MapPin, X, Calendar, Activity } from "lucide-react";
import Link from "next/link";

export default function FrotaPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Novo estado para controlar a janela de histórico do veículo
  const [selectedVeiculo, setSelectedVeiculo] = useState<any>(null);

  const veiculos = [
    { id: "V-001", modelo: "Fiat Ducato (Ambulância)", placa: "PIR-1A23", status: "Em Rota", combustivel: "75%", motorista: "Carlos Silva", km: "145.230 km", revisao: "Em 2.000 km" },
    { id: "V-002", modelo: "VW Gol", placa: "ABC-4D56", status: "Disponível", combustivel: "100%", motorista: "-", km: "45.100 km", revisao: "Em 5.000 km" },
    { id: "V-003", modelo: "Retroescavadeira CAT", placa: "XYZ-9W87", status: "Em Manutenção", combustivel: "20%", motorista: "Mecânica Municipal", km: "3.200 horas", revisao: "Vencida" },
    { id: "V-004", modelo: "Ônibus Escolar VW", placa: "ESCO-123", status: "Disponível", combustivel: "50%", motorista: "João Souza", km: "210.500 km", revisao: "Em 1.500 km" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Em Rota": return "bg-blue-50 border-blue-200 text-blue-700";
      case "Disponível": return "bg-green-50 border-green-200 text-green-700";
      case "Em Manutenção": return "bg-red-50 border-red-200 text-red-700";
      default: return "bg-gray-50 border-gray-200 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Em Rota": return <MapPin size={18} className="text-blue-600" />;
      case "Disponível": return <Car size={18} className="text-green-600" />;
      case "Em Manutenção": return <Wrench size={18} className="text-red-600" />;
      default: return <Car size={18} />;
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
            <h1 className="text-2xl font-bold text-gray-900">Controle de Frota</h1>
            <p className="text-sm text-gray-500">Gestão de veículos, manutenção e rotas</p>
          </div>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors">
          + Cadastrar Veículo
        </button>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {veiculos.map((veiculo) => (
            <div key={veiculo.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
              <div className={`px-4 py-3 border-b flex items-center justify-between ${getStatusColor(veiculo.status)}`}>
                <span className="font-semibold text-sm flex items-center gap-2">
                  {getStatusIcon(veiculo.status)}
                  {veiculo.status}
                </span>
                <span className="text-xs font-bold uppercase opacity-70">{veiculo.id}</span>
              </div>
              
              <div className="p-4 flex-1">
                <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1">{veiculo.modelo}</h3>
                <div className="inline-block bg-gray-100 border border-gray-300 rounded px-2 py-1 text-sm font-mono font-bold text-gray-700 mb-4">
                  {veiculo.placa}
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1"><Fuel size={16}/> Combustível</span>
                    <span className="font-medium text-gray-900">{veiculo.combustivel}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: veiculo.combustivel }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="text-gray-500">Motorista</span>
                    <span className="font-medium text-gray-900">{veiculo.motorista}</span>
                  </div>
                </div>
              </div>
              
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 mt-auto">
                <button 
                  onClick={() => setSelectedVeiculo(veiculo)}
                  className="w-full text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Ver Histórico completo
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      {/* MODAL DE CADASTRO DE VEÍCULO */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Cadastrar Novo Veículo</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors p-1"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Modelo do Veículo</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white placeholder-gray-400" placeholder="Ex: Fiat Uno Way 1.0" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Placa</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white placeholder-gray-400 uppercase" placeholder="ABC-1234" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status Atual</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white">
                    <option>Disponível</option>
                    <option>Em Rota</option>
                    <option>Em Manutenção</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Motorista Responsável (Opcional)</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white placeholder-gray-400" placeholder="Nome do servidor" />
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition-colors">Cancelar</button>
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 rounded-lg transition-colors shadow-sm">Salvar Veículo</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE HISTÓRICO DO VEÍCULO */}
      {selectedVeiculo && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-slate-50">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Ficha do Veículo</h2>
                <span className="text-sm font-mono text-gray-500">{selectedVeiculo.id}</span>
              </div>
              <button onClick={() => setSelectedVeiculo(null)} className="text-gray-400 hover:text-red-500 transition-colors p-1"><X size={20} /></button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedVeiculo.modelo}</h3>
                  <div className="inline-block bg-gray-100 border border-gray-300 rounded px-2 py-0.5 text-sm font-mono font-bold text-gray-700 mt-1">
                    {selectedVeiculo.placa}
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(selectedVeiculo.status)}`}>
                  {selectedVeiculo.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1"><Activity size={14}/> Odômetro</h4>
                  <p className="text-sm font-medium text-gray-900">{selectedVeiculo.km}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1"><Wrench size={14}/> Próx. Revisão</h4>
                  <p className="text-sm font-medium text-gray-900">{selectedVeiculo.revisao}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-gray-800 mb-3 border-b border-gray-100 pb-2 flex items-center gap-2"><Calendar size={16}/> Últimos Registros</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-100 p-1.5 rounded-full mt-0.5"><MapPin size={14} className="text-blue-600"/></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Viagem agendada para Bauru - SP</p>
                      <p className="text-xs text-gray-500">Hoje, 07:00 - Motorista: {selectedVeiculo.motorista}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-green-100 p-1.5 rounded-full mt-0.5"><Fuel size={14} className="text-green-600"/></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Abastecimento (Etanol)</p>
                      <p className="text-xs text-gray-500">Ontem, 16:30 - Posto Central</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setSelectedVeiculo(null)} className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition-colors">Fechar</button>
             <button onClick={() => { alert('Atividade registrada com sucesso!'); setSelectedVeiculo(null); }} className="px-4 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 rounded-lg transition-colors shadow-sm">Registrar Atividade</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}