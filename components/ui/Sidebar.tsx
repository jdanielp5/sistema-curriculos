// components/Sidebar.tsx
"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, UserPlus, BriefcaseBusiness } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  // Função para mudar a cor do botão dependendo da página que o usuário está
  const linkAtivo = (caminho: string) => {
    return pathname === caminho
      ? "flex items-center gap-3 rounded-lg bg-blue-100 px-3 py-2 text-blue-900 font-medium transition-all"
      : "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 font-medium transition-all hover:text-gray-900 hover:bg-gray-100";
  };

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-white min-h-screen px-4 py-6 shadow-sm">
      {/* Logo / Identificação do Sistema */}
      <div className="flex items-center gap-2 mb-10 px-2">
        <BriefcaseBusiness className="text-blue-600" size={28} />
        <span className="text-2xl font-bold tracking-tight text-gray-900">Recrutamento</span>
      </div>

      {/* Navegação principal */}
      <nav className="flex flex-col gap-2">
        <Link href="/" className={linkAtivo("/")}>
          <Home size={20} />
          <span>Home</span>
        </Link>
        
        <Link href="/curriculos/visualizar" className={linkAtivo("/curriculos/visualizar")}>
          <FileText size={20} />
          <span>Currículos</span>
        </Link>
        
        <Link href="/curriculos/cadastrar" className={linkAtivo("/curriculos/cadastrar")}>
          <UserPlus size={20} />
          <span>Cadastrar</span>
        </Link>
      </nav>
    </aside>
  );
}