"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, UserPlus, FileText, Eye, Mail } from "lucide-react";
import { CURRICULOS_INICIAIS } from "@/lib/data";

export default function ListaCurriculos() {
  const [dados, setDados] = useState<any[]>([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarDados = () => {
      const itensSalvos = localStorage.getItem("@CresceCV:curriculos");
      const locais = itensSalvos ? JSON.parse(itensSalvos) : [];
      setDados([...CURRICULOS_INICIAIS, ...locais]);
      setCarregando(false);
    };

    const timer = setTimeout(carregarDados, 1200);
    return () => clearTimeout(timer);
  }, []);

  const curriculosFiltrados = dados.filter(curr => {
    const termo = busca.toLowerCase();
    const nomeCompleto = `${curr.nome} ${curr.sobrenome || ""}`.toLowerCase();
    const cargo = curr.cargo
      ? curr.cargo.toLowerCase()
      : (curr.experiencias && curr.experiencias.length > 0 ? curr.experiencias[0].cargo.toLowerCase() : "");

    return nomeCompleto.includes(termo) || cargo.includes(termo);
  });

  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Banco de Currículos</h1>
          <p className="text-gray-500">Gerencie e visualize os talentos cadastrados no sistema.</p>
        </div>
        <Link href="/curriculos/cadastrar">
          <Button className="gap-2">
            <UserPlus size={18} /> Novo Currículo
          </Button>
        </Link>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <Input
          placeholder="Buscar por nome ou cargo..."
          className="pl-10"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {carregando ? (
          Array(3).fill(0).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="p-6 space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            </Card>
          ))
        ) : curriculosFiltrados.length > 0 ? (
          curriculosFiltrados.map((curr) => (
            <Card key={curr.id} className="hover:shadow-lg transition-all border-l-4 border-l-blue-500 flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl">{curr.nome} {curr.sobrenome}</CardTitle>
                <div className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                  {curr.cargo || (curr.experiencias && curr.experiencias.length > 0 ? curr.experiencias[0].cargo : "Candidato")}
                </div>
              </CardHeader>
              <CardContent className="space-y-4 flex-1">
                <p className="text-gray-600 text-sm line-clamp-3">
                  {curr.resumo || curr.sobreMim || "Nenhum resumo informado."}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Mail size={14} /> {curr.email}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 mt-auto">
                <Link href={`/curriculos/visualizar/${curr.id}`} className="w-full">
                  <Button variant="outline" className="w-full gap-2">
                    <Eye size={16} /> Detalhes
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center bg-white rounded-xl border-2 border-dashed border-gray-200">
            <div className="bg-gray-100 p-4 rounded-full mb-4">
              <FileText size={40} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Nenhum currículo encontrado</h3>
            <p className="text-gray-500 max-w-xs mx-auto mt-2">
              Não encontramos resultados para "{busca}". Tente outro termo ou cadastre um novo.
            </p>
            <Button
              variant="link"
              className="mt-4 text-blue-600"
              onClick={() => setBusca("")}
            >
              Limpar busca
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}