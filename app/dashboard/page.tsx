import { 
  AlertTriangle, 
  Car, 
  CalendarDays, 
  Briefcase, 
  PackageSearch, 
  FileText,
  LogOut,
  User
} from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  // Adicionamos a propriedade 'href' em cada módulo para definir a rota
  const modules = [
    { name: "Alô Pirajuí (Zeladoria)", href: "/dashboard/zeladoria", icon: AlertTriangle, color: "text-orange-500", bg: "bg-orange-50", desc: "Gestão de buracos, iluminação e limpeza." },
    { name: "Controle de Frota", href: "/dashboard/frota", icon: Car, color: "text-blue-500", bg: "bg-blue-50", desc: "Combustível, manutenção e rotas." },
    { name: "Agendamentos", href: "/dashboard/agendamentos", icon: CalendarDays, color: "text-green-500", bg: "bg-green-50", desc: "Postos de saúde e atendimentos." },
    { name: "Balcão de Empregos", href: "/dashboard/empregos", icon: Briefcase, color: "text-purple-500", bg: "bg-purple-50", desc: "Conexão entre empresas e cidadãos." },
    { name: "Almoxarifado", href: "/dashboard/almoxarifado", icon: PackageSearch, color: "text-amber-500", bg: "bg-amber-50", desc: "Controle de estoque e requisições." },
    { name: "Protocolos Internos", href: "/dashboard/protocolos", icon: FileText, color: "text-slate-500", bg: "bg-slate-50", desc: "Ofícios e comunicação sem papel." },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Topbar */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl text-blue-700">Pirajuí Digital</span>
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">Gestor</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User size={16} />
              <span>Jorge Machado</span>
            </div>
            <Link href="/" className="text-gray-400 hover:text-red-500 transition-colors" title="Sair">
              <LogOut size={20} />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Visão Geral</h1>
          <p className="text-gray-600">Selecione o módulo que deseja acessar.</p>
        </div>

        {/* Grid de Módulos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <Link 
                href={mod.href}
                key={mod.name}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all text-left group block"
              >
                <div className={`w-12 h-12 ${mod.bg} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`${mod.color}`} size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{mod.name}</h3>
                <p className="text-sm text-gray-500">{mod.desc}</p>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}