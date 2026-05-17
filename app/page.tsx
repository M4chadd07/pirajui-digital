import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Cabeçalho - Azul Marinho Escuro */}
      <header className="bg-blue-950 text-white p-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏛️</span>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">Pirajuí Digital</h1>
          </div>
          <Link 
            href="/login" 
            className="text-xs md:text-sm bg-blue-900 px-4 py-2 rounded-md hover:bg-blue-800 transition font-medium text-white"
          >
            Acesso Servidor
          </Link>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-grow max-w-6xl mx-auto p-6 w-full mt-8 md:mt-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-blue-950 mb-4 tracking-tight">
            Serviços na palma da sua mão
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Bem-vindo ao Portal do Cidadão de Pirajuí. Selecione abaixo o serviço que você precisa e resolva sem filas.
          </p>
        </div>

        {/* Grade de Serviços - Tema Azul Marinho Unificado */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Saúde */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition flex flex-col items-center text-center group cursor-pointer">
            <div className="h-16 w-16 bg-blue-50 text-blue-900 rounded-full flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition">
              Docs 🩺
            </div>
            <h3 className="text-xl font-bold text-blue-950 mb-2">Agendamento</h3>
            <p className="text-slate-500 mb-6">Marque consultas nos postos de saúde de Pirajuí de forma rápida e sem filas.</p>
            <button className="mt-auto w-full bg-blue-900 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-950 transition shadow-sm">
              Agendar agora
            </button>
          </div>

          {/* Card 2: Zeladoria */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition flex flex-col items-center text-center group cursor-pointer">
            <div className="h-16 w-16 bg-blue-50 text-blue-900 rounded-full flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition">
              🚧
            </div>
            <h3 className="text-xl font-bold text-blue-950 mb-2">Alô Pirajuí</h3>
            <p className="text-slate-500 mb-6">Problemas com buracos ou iluminação? Envie uma foto e abra um chamado na hora.</p>
            <button className="mt-auto w-full bg-blue-900 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-950 transition shadow-sm">
              Abrir chamado
            </button>
          </div>

          {/* Card 3: Empregos */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition flex flex-col items-center text-center group cursor-pointer">
            <div className="h-16 w-16 bg-blue-50 text-blue-900 rounded-full flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition">
              💼
            </div>
            <h3 className="text-xl font-bold text-blue-950 mb-2">Balcão de Empregos</h3>
            <p className="text-slate-500 mb-6">Cadastre seu currículo ou veja as vagas disponíveis no comércio de Pirajuí.</p>
            <button className="mt-auto w-full bg-blue-900 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-950 transition shadow-sm">
              Ver vagas
            </button>
          </div>

        </div>
      </main>

      {/* Rodapé */}
      <footer className="bg-blue-950 text-slate-300 py-6 text-center text-sm mt-auto border-t border-blue-900">
        <p>Prefeitura Municipal de Pirajuí, SP - Portal do Cidadão</p>
      </footer>
    </div>
  );
}