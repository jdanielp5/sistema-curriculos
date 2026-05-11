"use client";

import { useState, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, PlusCircle, Save, GraduationCap, BriefcaseBusiness, UserCircle, Upload } from "lucide-react";
import { IMaskInput } from "react-imask";
import { useRouter } from "next/navigation";
import { curriculoService } from "@/lib/curriculoService";

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
  sobreMim: yup.string().required("Escreva um breve resumo sobre você").min(10, "Mínimo 10 caracteres"),
  experiencias: yup.array().of(
    yup.object({
      empresa: yup.string().required("Informe a empresa"),
      cargo: yup.string().required("Informe o cargo"),
      dataInicio: yup.string()
        .required("Data de início obrigatória")
        .min(7, "Incompleto")
        .test('data-futura', 'Não pode ser no futuro', validarMesAnoPassado),
      empregoAtual: yup.boolean().default(false),
      dataFim: yup.string().when('empregoAtual', ([empregoAtual], schema) => {
        return empregoAtual 
          ? schema.notRequired() 
          : schema.required("Data de fim obrigatória")
                  .min(7, "Incompleto")
                  .test('data-futura', 'Não pode ser no futuro', validarMesAnoPassado);
      })
    })
  ).min(1, "Adicione pelo menos uma experiência"),
  formacoes: yup.array().of(
    yup.object({
      instituicao: yup.string().required("Informe a instituição"),
      curso: yup.string().required("Informe o curso"),
    })
  ).min(1, "Adicione pelo menos uma formação"),
}).required();

export default function CadastrarCurriculo() {
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { register, control, handleSubmit, setValue, reset, watch, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nome: "",
      sobrenome: "",
      dataNascimento: "",
      cpf: "",
      email: "",
      telefone: "",
      sobreMim: "",
      experiencias: [{ empresa: "", cargo: "", dataInicio: "", dataFim: "", empregoAtual: false }],
      formacoes: [{ instituicao: "", curso: "" }],
    },
  });

  const { fields: fieldsExp, append: appendExp, remove: removeExp } = useFieldArray({ control, name: "experiencias" });
  const { fields: fieldsForm, append: appendForm, remove: removeForm } = useFieldArray({ control, name: "formacoes" });

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const arquivo = e.target.files?.[0];
    if (!arquivo) return;
    const url = URL.createObjectURL(arquivo);
    setFotoPreview(url);
  };

  const onSubmit = async (data: any) => {
    try {
      // 3.1 Cadastro de currículo no Firestore
      const dadosCompletos = {
        ...data,
        foto: fotoPreview ?? null,
      };

      await curriculoService.create(dadosCompletos);
      
      toast.success("Currículo cadastrado com sucesso!");
      
      setFotoPreview(null);
      reset();
      router.push("/curriculos/visualizar"); 
    } catch (error) {
      console.error(error);
      toast.error("Erro ao cadastrar currículo no banco de dados.");
    }
  };

  const inputClassName = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Cadastro de Currículo</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

        <Card className="p-6 space-y-6">
          <h2 className="text-xl font-semibold border-b pb-2">Dados Pessoais</h2>

          <div className="flex flex-col items-center gap-3">
            <div className="h-24 w-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
              {fotoPreview ? (
                <img src={fotoPreview} alt="Preview" className="h-full w-full object-cover" />
              ) : (
                <UserCircle size={48} className="text-gray-400" />
              )}
            </div>
            <input
              ref={inputFileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFotoChange}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => inputFileRef.current?.click()}
            >
              <Upload size={16} /> {fotoPreview ? "Trocar foto" : "Adicionar foto"}
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome</Label>
              <Input id="nome" {...register("nome")} placeholder="Ex: José" />
              {errors.nome && <span className="text-red-500 text-xs">{errors.nome.message}</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="sobrenome">Sobrenome</Label>
              <Input id="sobrenome" {...register("sobrenome")} placeholder="Ex: Silva" />
              {errors.sobrenome && <span className="text-red-500 text-xs">{errors.sobrenome.message}</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataNascimento">Data de Nascimento</Label>
              <IMaskInput
                mask="00/00/0000"
                {...register("dataNascimento")}
                className={inputClassName}
                placeholder="DD/MM/AAAA"
                onAccept={(value: any) => setValue("dataNascimento", value, { shouldValidate: true })}
              />
              {errors.dataNascimento && <span className="text-red-500 text-xs font-medium">{errors.dataNascimento.message}</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <IMaskInput
                mask="000.000.000-00"
                {...register("cpf")}
                className={inputClassName}
                placeholder="000.000.000-00"
                onAccept={(value: any) => setValue("cpf", value, { shouldValidate: true })}
              />
              {errors.cpf && <span className="text-red-500 text-xs font-medium">{errors.cpf.message}</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <IMaskInput
                mask="(00) 00000-0000"
                {...register("telefone")}
                className={inputClassName}
                placeholder="(00) 00000-0000"
                onAccept={(value: any) => setValue("telefone", value, { shouldValidate: true })}
              />
              {errors.telefone && <span className="text-red-500 text-xs font-medium">{errors.telefone.message}</span>}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="email">E-mail Profissional</Label>
              <Input id="email" type="email" {...register("email")} placeholder="jose@email.com" />
              {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="sobreMim">Sobre mim (Resumo Profissional)</Label>
              <Textarea
                id="sobreMim"
                {...register("sobreMim")}
                placeholder="Fale um pouco sobre sua trajetória, habilidades e objetivos..."
                className="resize-none h-24"
              />
              {errors.sobreMim && <span className="text-red-500 text-xs">{errors.sobreMim.message}</span>}
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <GraduationCap className="text-blue-600" /> Formação Acadêmica
            </h2>
            <Button
              type="button" variant="outline" size="sm" className="gap-2"
              onClick={() => appendForm({ instituicao: "", curso: "" })}
            >
              <PlusCircle size={16} /> Adicionar
            </Button>
          </div>

          {fieldsForm.map((field, index) => (
            <div key={field.id} className="flex gap-4 items-start bg-gray-50 p-4 rounded-lg relative">
              <div className="flex-1 space-y-2">
                <Label>Instituição de Ensino</Label>
                <Input {...register(`formacoes.${index}.instituicao`)} placeholder="Ex: Universidade XYZ" />
                {errors.formacoes?.[index]?.instituicao && (
                  <span className="text-red-500 text-xs">{errors.formacoes[index]?.instituicao?.message}</span>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <Label>Curso</Label>
                <Input {...register(`formacoes.${index}.curso`)} placeholder="Ex: Análise de Sistemas" />
                {errors.formacoes?.[index]?.curso && (
                  <span className="text-red-500 text-xs">{errors.formacoes[index]?.curso?.message}</span>
                )}
              </div>
              <Button
                type="button" variant="ghost" size="icon" className="mt-8 text-red-500 hover:text-red-700"
                onClick={() => removeForm(index)}
              >
                <Trash2 size={20} />
              </Button>
            </div>
          ))}
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <BriefcaseBusiness className="text-blue-600" /> Experiência Profissional
            </h2>
            <Button
              type="button" variant="outline" size="sm" className="gap-2"
              onClick={() => appendExp({ empresa: "", cargo: "", dataInicio: "", dataFim: "", empregoAtual: false })}
            >
              <PlusCircle size={16} /> Adicionar
            </Button>
          </div>

          {fieldsExp.map((field, index) => {
            const empregoAtual = watch(`experiencias.${index}.empregoAtual`);

            return (
              <div key={field.id} className="flex flex-col gap-4 bg-gray-50 p-4 rounded-lg relative">
                <div className="flex gap-4 items-start">
                  <div className="flex-1 space-y-2">
                    <Label>Empresa</Label>
                    <Input {...register(`experiencias.${index}.empresa`)} placeholder="Ex: Tech Solutions" />
                    {errors.experiencias?.[index]?.empresa && (
                      <span className="text-red-500 text-xs">{errors.experiencias[index]?.empresa?.message}</span>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label>Cargo</Label>
                    <Input {...register(`experiencias.${index}.cargo`)} placeholder="Ex: Desenvolvedor Front-end" />
                    {errors.experiencias?.[index]?.cargo && (
                      <span className="text-red-500 text-xs">{errors.experiencias[index]?.cargo?.message}</span>
                    )}
                  </div>
                  <Button
                    type="button" variant="ghost" size="icon" className="mt-8 text-red-500 hover:text-red-700"
                    onClick={() => removeExp(index)}
                  >
                    <Trash2 size={20} />
                  </Button>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="flex-1 space-y-2">
                    <Label>Data de Início</Label>
                    <IMaskInput
                      mask="00/0000"
                      {...register(`experiencias.${index}.dataInicio`)}
                      className={inputClassName}
                      placeholder="MM/AAAA"
                      onAccept={(value: any) => setValue(`experiencias.${index}.dataInicio`, value, { shouldValidate: true })}
                    />
                    <div className="h-4">
                      {errors.experiencias?.[index]?.dataInicio && (
                        <span className="text-red-500 text-xs">{errors.experiencias[index]?.dataInicio?.message}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 space-y-2">
                    <Label>Data de Fim</Label>
                    <IMaskInput
                      mask="00/0000"
                      disabled={empregoAtual}
                      {...register(`experiencias.${index}.dataFim`)}
                      className={`${inputClassName} ${empregoAtual ? 'bg-gray-200 cursor-not-allowed opacity-50' : ''}`}
                      placeholder="MM/AAAA"
                      onAccept={(value: any) => setValue(`experiencias.${index}.dataFim`, value, { shouldValidate: true })}
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
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <Label htmlFor={`empregoAtual-${index}`} className="cursor-pointer text-sm">Trabalho aqui atualmente</Label>
                  </div>
                </div>
              </div>
            );
          })}
        </Card>

        <Button type="submit" className="w-full gap-2 text-lg h-12" disabled={isSubmitting}>
          {isSubmitting ? "Processando..." : <><Save size={20} /> Salvar Currículo Completo</>}
        </Button>
      </form>
    </div>
  );
}