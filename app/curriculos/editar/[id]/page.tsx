"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2, PlusCircle, Save, GraduationCap, BriefcaseBusiness, ArrowLeft } from "lucide-react";
import { IMaskInput } from "react-imask";
import { MOCK_IDS } from "@/lib/data";

// Função para validar se MM/AAAA está no futuro ou se o mês é inválido
const validarMesAnoPassado = (value?: string | null) => {
  if (!value || value.length < 7) return true;
  const [mes, ano] = value.split('/');
  const numMes = parseInt(mes, 10);
  const numAno = parseInt(ano, 10);

  if (numMes < 1 || numMes > 12) return false;

  const hoje = new Date();
  const mesAtual = hoje.getMonth() + 1;
  const anoAtual = hoje.getFullYear();

  if (numAno > anoAtual) return false;
  if (numAno === anoAtual && numMes > mesAtual) return false;

  return true;
};

const schema = yup.object({
  nome: yup.string()
    .required("O nome é obrigatório")
    .min(3, "Mínimo de 3 caracteres")
    .matches(/^[A-Za-zÀ-ÿ\s]+$/, "O nome deve conter apenas letras"),
  sobrenome: yup.string().required("O sobrenome é obrigatório"),
  dataNascimento: yup.string()
    .required("Data é obrigatória")
    .min(10, "Data incompleta")
    .test('data-passada', 'A data não pode ser no futuro', (value) => {
      if (!value || value.length < 10) return true;
      const [dia, mes, ano] = value.split('/');
      const dataInserida = new Date(`${ano}-${mes}-${dia}T00:00:00`);
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      return dataInserida <= hoje;
    }),
  cpf: yup.string().required("O CPF é obrigatório").min(14, "CPF incompleto"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  telefone: yup.string().required("Telefone é obrigatório"),
  sobreMim: yup.string().required("Escreva um breve resumo").min(10, "Escreva um pouco mais"),
  experiencias: yup.array().of(
    yup.object({
      empresa: yup.string().required("Obrigatório"),
      cargo: yup.string().required("Obrigatório"),
      dataInicio: yup.string()
        .required("Obrigatório")
        .min(7, "Incompleto")
        .test('data-futura', 'Não pode ser no futuro', validarMesAnoPassado),
      empregoAtual: yup.boolean().default(false),
      dataFim: yup.string().when('empregoAtual', ([empregoAtual], schema) => {
        return empregoAtual 
          ? schema.notRequired() 
          : schema.required("Obrigatório")
                  .min(7, "Incompleto")
                  .test('data-futura', 'Não pode ser no futuro', validarMesAnoPassado);
      })
    })
  ).min(1, "Adicione pelo menos uma experiência"),
  formacoes: yup.array().of(
    yup.object({ instituicao: yup.string().required("Obrigatório"), curso: yup.string().required("Obrigatório") })
  ).min(1, "Adicione pelo menos uma formação"),
}).required();

export default function EditarCurriculo() {
  const params = useParams();
  const router = useRouter();
  const idDaUrl = params.id as string;
  const [carregandoIniciais, setCarregandoIniciais] = useState(true);

  const { register, control, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nome: "", sobrenome: "", dataNascimento: "", cpf: "", email: "", telefone: "", sobreMim: "",
      experiencias: [{ empresa: "", cargo: "", dataInicio: "", dataFim: "", empregoAtual: false }], 
      formacoes: [{ instituicao: "", curso: "" }],
    },
  });

  const { fields: fieldsExp, append: appendExp, remove: removeExp } = useFieldArray({ control, name: "experiencias" });
  const { fields: fieldsForm, append: appendForm, remove: removeForm } = useFieldArray({ control, name: "formacoes" });

  useEffect(() => {
    if (MOCK_IDS.includes(idDaUrl)) {
      toast.error("Currículos de exemplo não podem ser editados.");
      router.push("/curriculos/visualizar");
      return;
    }

    const itensSalvos = localStorage.getItem("@CresceCV:curriculos");
    if (itensSalvos) {
      const curriculosAtuais = JSON.parse(itensSalvos);
      const encontrado = curriculosAtuais.find((c: any) => c.id === idDaUrl);
      if (encontrado) {
        const experienciasMapeadas = encontrado.experiencias?.map((exp: any) => ({
          ...exp,
          dataInicio: exp.dataInicio || "",
          dataFim: exp.dataFim || "",
          empregoAtual: exp.empregoAtual || false
        })) || [{ empresa: "", cargo: "", dataInicio: "", dataFim: "", empregoAtual: false }];
        
        reset({ ...encontrado, experiencias: experienciasMapeadas });
      } else {
        toast.error("Currículo não encontrado.");
        router.push("/curriculos/visualizar");
      }
    }
    setCarregandoIniciais(false);
  }, [idDaUrl, reset, router]);

  const onSubmit = async (data: any) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const itensSalvos = localStorage.getItem("@CresceCV:curriculos");
    const curriculosAtuais = itensSalvos ? JSON.parse(itensSalvos) : [];

    const index = curriculosAtuais.findIndex((c: any) => c.id === idDaUrl);
    if (index !== -1) {
      curriculosAtuais[index] = { ...curriculosAtuais[index], ...data, id: idDaUrl };
      localStorage.setItem("@CresceCV:curriculos", JSON.stringify(curriculosAtuais));
      toast.success("Currículo atualizado com sucesso!");
      router.push(`/curriculos/visualizar/${idDaUrl}`);
    }
  };

  const inputClassName = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  if (carregandoIniciais) {
    return <div className="p-8 max-w-4xl mx-auto"><Skeleton className="h-96 w-full" /></div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={() => router.back()} size="icon">
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-3xl font-bold">Editar Currículo</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Card className="p-6 space-y-6">
          <h2 className="text-xl font-semibold border-b pb-2">Dados Pessoais</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input {...register("nome")} />
              {errors.nome && <span className="text-red-500 text-xs">{errors.nome.message}</span>}
            </div>
            <div className="space-y-2">
              <Label>Sobrenome</Label>
              <Input {...register("sobrenome")} />
              {errors.sobrenome && <span className="text-red-500 text-xs">{errors.sobrenome.message}</span>}
            </div>

            <div className="space-y-2">
              <Label>Data de Nascimento</Label>
              <Controller
                name="dataNascimento"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <IMaskInput
                    mask="00/00/0000"
                    value={value || ""}
                    onAccept={(val) => onChange(val)}
                    className={inputClassName}
                    placeholder="DD/MM/AAAA"
                  />
                )}
              />
              {errors.dataNascimento && <span className="text-red-500 text-xs">{errors.dataNascimento.message}</span>}
            </div>

            <div className="space-y-2">
              <Label>CPF</Label>
              <Controller
                name="cpf"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <IMaskInput
                    mask="000.000.000-00"
                    value={value || ""}
                    onAccept={(val) => onChange(val)}
                    className={inputClassName}
                    placeholder="000.000.000-00"
                  />
                )}
              />
              {errors.cpf && <span className="text-red-500 text-xs">{errors.cpf.message}</span>}
            </div>

            <div className="space-y-2">
              <Label>Telefone</Label>
              <Controller
                name="telefone"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <IMaskInput
                    mask="(00) 00000-0000"
                    value={value || ""}
                    onAccept={(val) => onChange(val)}
                    className={inputClassName}
                    placeholder="(00) 00000-0000"
                  />
                )}
              />
              {errors.telefone && <span className="text-red-500 text-xs">{errors.telefone.message}</span>}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>E-mail</Label>
              <Input type="email" {...register("email")} />
              {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Sobre mim</Label>
              <Textarea {...register("sobreMim")} className="h-24" />
              {errors.sobreMim && <span className="text-red-500 text-xs">{errors.sobreMim.message}</span>}
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <GraduationCap className="text-emerald-600" /> Formação
            </h2>
            <Button type="button" variant="outline" size="sm" className="gap-2" onClick={() => appendForm({ instituicao: "", curso: "" })}>
              <PlusCircle size={16} /> Adicionar
            </Button>
          </div>
          {fieldsForm.map((field, index) => (
            <div key={field.id} className="flex gap-4 items-start bg-slate-50 p-4 rounded-lg relative">
              <div className="flex-1 space-y-2">
                <Label>Instituição</Label>
                <Input {...register(`formacoes.${index}.instituicao`)} />
                {errors.formacoes?.[index]?.instituicao && <span className="text-red-500 text-xs">{errors.formacoes[index]?.instituicao?.message}</span>}
              </div>
              <div className="flex-1 space-y-2">
                <Label>Curso</Label>
                <Input {...register(`formacoes.${index}.curso`)} />
                {errors.formacoes?.[index]?.curso && <span className="text-red-500 text-xs">{errors.formacoes[index]?.curso?.message}</span>}
              </div>
              <Button type="button" variant="ghost" size="icon" className="mt-8 text-red-500" onClick={() => removeForm(index)}>
                <Trash2 size={20} />
              </Button>
            </div>
          ))}
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <BriefcaseBusiness className="text-emerald-600" /> Experiência
            </h2>
            <Button type="button" variant="outline" size="sm" className="gap-2" onClick={() => appendExp({ empresa: "", cargo: "", dataInicio: "", dataFim: "", empregoAtual: false })}>
              <PlusCircle size={16} /> Adicionar
            </Button>
          </div>
          {fieldsExp.map((field, index) => {
            const empregoAtual = watch(`experiencias.${index}.empregoAtual`);

            return (
              <div key={field.id} className="flex flex-col gap-4 bg-slate-50 p-4 rounded-lg relative">
                <div className="flex gap-4 items-start">
                  <div className="flex-1 space-y-2">
                    <Label>Empresa</Label>
                    <Input {...register(`experiencias.${index}.empresa`)} />
                    {errors.experiencias?.[index]?.empresa && <span className="text-red-500 text-xs">{errors.experiencias[index]?.empresa?.message}</span>}
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label>Cargo</Label>
                    <Input {...register(`experiencias.${index}.cargo`)} />
                    {errors.experiencias?.[index]?.cargo && <span className="text-red-500 text-xs">{errors.experiencias[index]?.cargo?.message}</span>}
                  </div>
                  <Button type="button" variant="ghost" size="icon" className="mt-8 text-red-500" onClick={() => removeExp(index)}>
                    <Trash2 size={20} />
                  </Button>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="flex-1 space-y-2">
                    <Label>Data de Início</Label>
                    <Controller
                      name={`experiencias.${index}.dataInicio`}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <IMaskInput
                          mask="00/0000"
                          value={value || ""}
                          onAccept={(val) => onChange(val)}
                          className={inputClassName}
                          placeholder="MM/AAAA"
                        />
                      )}
                    />
                    <div className="h-4">
                      {errors.experiencias?.[index]?.dataInicio && (
                        <span className="text-red-500 text-xs">{errors.experiencias[index]?.dataInicio?.message}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 space-y-2">
                    <Label>Data de Fim</Label>
                    <Controller
                      name={`experiencias.${index}.dataFim`}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <IMaskInput
                          mask="00/0000"
                          disabled={empregoAtual}
                          value={value || ""}
                          onAccept={(val) => onChange(val)}
                          className={`${inputClassName} ${empregoAtual ? 'bg-gray-200 cursor-not-allowed opacity-50' : ''}`}
                          placeholder="MM/AAAA"
                        />
                      )}
                    />
                    <div className="h-4">
                      {errors.experiencias?.[index]?.dataFim && (
                        <span className="text-red-500 text-xs">{errors.experiencias[index]?.dataFim?.message}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 mt-8 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`empregoAtual-${index}`}
                      {...register(`experiencias.${index}.empregoAtual`)}
                      className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                    />
                    <Label htmlFor={`empregoAtual-${index}`} className="cursor-pointer text-sm">Trabalho aqui atualmente</Label>
                  </div>
                </div>
              </div>
            );
          })}
        </Card>

        <Button type="submit" className="w-full gap-2 text-lg h-12 bg-emerald-600 hover:bg-emerald-700" disabled={isSubmitting}>
          {isSubmitting ? "Atualizando..." : <><Save size={20} /> Atualizar Currículo</>}
        </Button>
      </form>
    </div>
  );
}