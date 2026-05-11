"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, UserPlus, FileText, Eye, Mail } from "lucide-react";
import { curriculoService } from "@/lib/curriculoService";
import { toast } from "sonner";

export default function ListaCurriculos() {
  const [dados, setDados] = useState<any[]>([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        // 3.2 Listagem: Busca os dados diretamente do Firestore
        const curriculosBrutos = await curriculoService.getAll();
        setDados(curriculosBrutos);
      } catch (error) {
        console.error(error);
        toast.error("Erro ao carregar currículos do banco de dados.");
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  // 3.6 Pesquisa: Filtro local baseado em nome ou cargo
  const curriculosFiltrados = dados.filter(curr => {
    const termo = busca.toLowerCase();
    const nomeCompleto = `${curr.nome || ""} ${curr.sobrenome || ""}`.toLowerCase();
    
    // Tenta pegar o cargo do campo direto ou da primeira experiência profissional
    const cargo = (curr.cargoDesejado || curr.cargo || 
      (curr.experiencias && curr.experiencias.length > 0 ? curr.experiencias[0].cargo : "")
    ).toLowerCase();

    return nomeCompleto.includes(termo) || cargo.includes(termo);
  });

  return (
    <div className="p-8 space-y-8">
      {/* Cabeçalho da Página */}
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

      {/* Barra de Busca */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <Input
          placeholder="Buscar por nome ou cargo..."
          className="pl-10"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      {/* Grid de Currículos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {carregando ? (
          // Skeleton Loading enquanto os dados do Firebase não chegam
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
                  {curr.cargoDesejado || curr.cargo || (curr.experiencias && curr.experiencias.length > 0 ? curr.experiencias[0].cargo : "Candidato")}
                </div>
              </CardHeader>
              <CardContent className="space-y-4 flex-1">
                <p className="text-gray-600 text-sm line-clamp-3">
                  {curr.sobreMim || curr.resumo || "Nenhum resumo informado."}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Mail size={14} /> {curr.email}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 mt-auto">
                <Link href={`/curriculos/visualizar/detalhes?id=${curr.id}`}>
                  <Button variant="outline" className="w-full gap-2">
                    <Eye size={16} /> Detalhes
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))
        ) : (
          // Estado Vazio (Nenhum resultado encontrado)
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