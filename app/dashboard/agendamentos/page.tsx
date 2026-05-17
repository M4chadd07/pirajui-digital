"use client";

import { useState } from "react";
import { ArrowLeft, Calendar, Clock, MapPin, User, Plus, X } from "lucide-react";
import Link from "next/link";

export default function AgendamentosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const agendamentos = [
    { id: "AG-101", paciente: "Maria Oliveira", unidade: "UBS Centro", especialidade: "Clínica Geral", data: "17/05/2026", horario: "08:00", status: "Confirmado" },
    { id: "AG-102", paciente: "João Pedro Santos", unidade: "Posto Vila Esperança", especialidade: "Pediatria", data: "17/05/2026", horario: "09:30", status: "Aguardando" },
    { id: "AG-103", paciente: "Ana Costa", unidade: "UBS Centro", especialidade: "Odontologia", data: "18/05/2026", horario: "14:00", status: "Confirmado" },
    { id: "AG-104", paciente: "Carlos Mendes", unidade: "Posto São João", especialidade: "Cardiologia", data: "18/05/2026", horario: "10:00", status: "Cancelado" },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Confirmado": return "bg-green-100 text-green-700";
      case "Aguardando": return "bg-amber-100 text-amber-700";
      case "Cancelado": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Agendamentos da Saúde</h1>
            <p className="text-sm text-gray-500">Controle de consultas e postos de atendimento</p>
          </div>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors flex items-center gap-2">
          <Plus size={20} />
          <span className="hidden sm:inline">Novo Agendamento</span>
        </button>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Calendar className="text-green-600" size={20} />
              Próximos Atendimentos
            </h2>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <input type="date" className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full sm:w-auto outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 text-gray-900" defaultValue="2026-05-17" />
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full sm:w-auto outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 text-gray-900">
                <option>Todas as Unidades</option>
                <option>UBS Centro</option>
                <option>Posto Vila Esperança</option>
                <option>Posto São João</option>
              </select>
            </div>
          </div>
          
          <ul className="divide-y divide-gray-200">
            {agendamentos.map((item) => (
              <li key={item.id} className="p-4 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full text-green-600 hidden sm:block mt-1">
                    <User size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">{item.paciente}</p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 mt-1">
                      <span className="flex items-center gap-1"><MapPin size={16} className="text-gray-400"/> {item.unidade}</span>
                      <span className="flex items-center gap-1"><Clock size={16} className="text-gray-400"/> {item.data} às {item.horario}</span>
                      <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{item.especialidade}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusStyle(item.status)}`}>{item.status}</span>
                  <button className="text-sm font-medium text-gray-500 hover:text-green-700 transition-colors">Editar / Detalhes</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Agendar Consulta</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors p-1">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Paciente</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white placeholder-gray-400" placeholder="Nome completo" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cartão SUS / CPF</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white placeholder-gray-400" placeholder="000.000.000-00" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unidade de Saúde</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white">
                    <option>UBS Centro</option>
                    <option>Posto Vila Esperança</option>
                    <option>Posto São João</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Especialidade</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white">
                    <option>Clínica Geral</option>
                    <option>Pediatria</option>
                    <option>Odontologia</option>
                    <option>Cardiologia</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                  <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Horário</label>
                  <input type="time" className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white" />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition-colors">Cancelar</button>
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-green-600 text-white font-medium hover:bg-green-700 rounded-lg transition-colors shadow-sm">Confirmar Agendamento</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}