"use client"

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  ArrowLeft, Mail, Phone, Calendar, BriefcaseBusiness,
  GraduationCap, User, Trash2, Edit, CreditCard,
} from "lucide-react";
import { CURRICULOS_INICIAIS, MOCK_IDS } from "@/lib/data";

export default function DetalhesCurriculo() {
  const params = useParams();
  const router = useRouter();
  const [candidato, setCandidato] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);

  const idDaUrl = params.id as string;

  useEffect(() => {
    const carregarCandidato = () => {
      const itensSalvos = localStorage.getItem("@CresceCV:curriculos");
      const locais = itensSalvos ? JSON.parse(itensSalvos) : [];
      let encontrado = locais.find((c: any) => c.id === idDaUrl);

      if (!encontrado) {
        encontrado = CURRICULOS_INICIAIS.find((c) => c.id === idDaUrl);
      }

      setCandidato(encontrado);
      setCarregando(false);
    };

    const timer = setTimeout(carregarCandidato, 1000);
    return () => clearTimeout(timer);
  }, [idDaUrl]);

  const excluirCurriculo = () => {
    if (MOCK_IDS.includes(idDaUrl)) {
      toast.error("Acesso Negado", { description: "Currículos de exemplo não podem ser excluídos." });
      return;
    }

    if (window.confirm("Tem certeza que deseja excluir este currículo? Esta ação não pode ser desfeita.")) {
      const itensSalvos = localStorage.getItem("@CresceCV:curriculos");
      const locais = itensSalvos ? JSON.parse(itensSalvos) : [];
      const novaLista = locais.filter((c: any) => c.id !== idDaUrl);
      localStorage.setItem("@CresceCV:curriculos", JSON.stringify(novaLista));
      toast.success("Currículo excluído com sucesso!");
      router.push("/curriculos/visualizar");
    }
  };

  if (!carregando && !candidato) {
    return (
      <div className="p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold">Currículo não encontrado</h2>
        <Button onClick={() => router.back()}>Voltar</Button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <Button variant="ghost" onClick={() => router.push("/curriculos/visualizar")} className="gap-2">
          <ArrowLeft size={18} /> Voltar para a lista
        </Button>

        {!carregando && candidato && (
          <div className="flex gap-2 w-full md:w-auto">
            <Button
              variant="outline"
              className="gap-2 text-blue-600 border-blue-200 hover:bg-blue-50 flex-1 md:flex-none"
              onClick={() => router.push(`/curriculos/editar/${candidato.id}`)}
            >
              <Edit size={16} /> Editar
            </Button>
            <Button
              variant="destructive"
              className="gap-2 flex-1 md:flex-none"
              onClick={excluirCurriculo}
            >
              <Trash2 size={16} /> Excluir
            </Button>
          </div>
        )}
      </div>

      {carregando ? (
        <div className="space-y-6">
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-60 w-full rounded-xl" />
        </div>
      ) : (
        <div className="space-y-6">
          <Card className="border-t-8 border-t-emerald-600 shadow-sm">
            <CardHeader className="flex flex-row items-center gap-6 pb-6">
              <div className="h-24 w-24 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 overflow-hidden flex-shrink-0">
                {candidato.foto ? (
                  <Image
                    src={candidato.foto}
                    alt={`Foto de ${candidato.nome}`}
                    width={96}
                    height={96}
                    className="h-full w-full object-cover"
                    unoptimized={candidato.foto.startsWith("blob:")}
                  />
                ) : (
                  <User size={48} />
                )}
              </div>
              <div className="space-y-1">
                <CardTitle className="text-3xl text-slate-900">{candidato.nome} {candidato.sobrenome}</CardTitle>
                <Badge variant="secondary" className="text-sm px-3 py-1 bg-emerald-50 text-emerald-700">
                  {candidato.cargo || (candidato.experiencias?.length > 0 ? candidato.experiencias[0].cargo : "Candidato")}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 border-t pt-6 bg-slate-50/50">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Mail size={16} className="text-emerald-500" /> {candidato.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Phone size={16} className="text-emerald-500" /> {candidato.telefone}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Calendar size={16} className="text-emerald-500" /> {candidato.dataNascimento}
              </div>
              {candidato.cpf && (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <CreditCard size={16} className="text-emerald-500" /> {candidato.cpf}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2 text-slate-800">
                <User className="text-emerald-600" size={20} /> Sobre mim
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 leading-relaxed">{candidato.sobreMim || "Nenhum resumo informado."}</p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2 text-slate-800">
                  <GraduationCap className="text-emerald-600" size={20} /> Formação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {candidato.formacoes?.map((form: any, index: number) => (
                  <div key={index} className="relative pl-4 border-l-2 border-emerald-200">
                    <p className="font-bold text-slate-800">{form.curso}</p>
                    <p className="text-sm text-slate-500">{form.instituicao}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2 text-slate-800">
                  <BriefcaseBusiness className="text-emerald-600" size={20} /> Experiência
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {candidato.experiencias?.map((exp: any, index: number) => (
                  <div key={index} className="relative pl-4 border-l-2 border-emerald-200">
                    <p className="font-bold text-slate-800 text-lg">{exp.cargo}</p>
                    <p className="font-medium text-slate-700">{exp.empresa}</p>
                    
                    {/* Exibição condicional das datas cadastradas */}
                    {(exp.dataInicio || exp.empregoAtual) && (
                      <p className="text-xs font-semibold text-emerald-600 bg-emerald-50 inline-block px-2 py-1 rounded mt-1">
                        {exp.dataInicio || "Não informada"} — {exp.empregoAtual ? "Atual" : (exp.dataFim || "Não informada")}
                      </p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}