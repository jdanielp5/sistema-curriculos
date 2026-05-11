// app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BriefcaseBusiness, Heart, Sparkles, ShieldCheck, ArrowRight, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-full">
      <section className="flex-1 flex flex-col justify-center items-center text-center px-4 py-20 bg-gradient-to-b from-blue-50/80 to-transparent">
        <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-semibold text-blue-700 bg-blue-100/60 border-blue-200">
          <Sparkles size={14} className="mr-2 inline" /> 
          Impulsione Talentos
        </Badge>
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 max-w-3xl mb-6">
          Gestão de talentos feita de forma simples, <br className="hidden md:block" />
          <span className="text-blue-600">inteligente e humana.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed font-medium">
          O ProFile é uma plataforma inteligente desenhada para simplificar o recrutamento e a gestão de profissionais. 
          Organize experiências, valide informações com precisão e encontre o perfil ideal para o momento certo, tudo em um só lugar.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/curriculos/cadastrar">
            <Button size="lg" className="w-full sm:w-auto gap-2 h-12 px-8 text-base bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200">
              Cadastrar Talento <ArrowRight size={18} />
            </Button>
          </Link>
          <Link href="/curriculos/visualizar">
            <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 h-12 px-8 text-base border-blue-200 text-blue-700 hover:bg-blue-50">
              <Users size={18} /> Ver Banco de Currículos
            </Button>
          </Link>
        </div>
      </section>

      <section className="px-4 py-16 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Por que escolher o nosso sistema?</h2>
          <p className="text-slate-500 font-medium">Desenvolvido com foco no crescimento contínuo e na segurança dos dados.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-slate-100 shadow-sm bg-white hover:border-blue-200 hover:shadow-md transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 text-blue-600 shadow-sm">
                <Heart size={24} />
              </div>
              <CardTitle className="text-xl font-bold text-slate-800">Experiência Intuitiva</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 leading-relaxed">
                Uma interface limpa e focada no que importa. Navegar, cadastrar e analisar currículos é uma tarefa rápida, direta e sem distrações.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-100 shadow-sm bg-white hover:border-blue-200 hover:shadow-md transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 text-blue-600 shadow-sm">
                <BriefcaseBusiness size={24} />
              </div>
              <CardTitle className="text-xl font-bold text-slate-800">Organização Inteligente</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 leading-relaxed">
                Gerencie perfis, atualize o histórico dos candidatos e filtre habilidades em tempo real com um sistema preparado para organizar grandes volumes de dados.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-100 shadow-sm bg-white hover:border-blue-200 hover:shadow-md transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 text-blue-600 shadow-sm">
                <ShieldCheck size={24} />
              </div>
              <CardTitle className="text-xl font-bold text-slate-800">Confiabilidade e Precisão</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 leading-relaxed">
                Estrutura robusta para validação e armazenamento. Tenha a tranquilidade de tomar decisões baseadas em um banco de talentos sempre íntegro e protegido.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}