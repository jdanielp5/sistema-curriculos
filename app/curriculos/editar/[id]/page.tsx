"use client"
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";

export default function EditarCurriculo({ params }: { params: { id: string } }) {
  const { register, control, handleSubmit, reset } = useForm();
  
  // Lógica de Campos Dinâmicos (Requisito 8.1)
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiencias"
  });

  useEffect(() => {
    // VOCÊ: Implementar aqui a busca no localStorage usando o params.id
    // const dadosExistentes = buscarCurriculoPorId(params.id);
    // reset(dadosExistentes); 
    console.log("Buscando dados do currículo:", params.id [cite: 23, 28]);
  }, [params.id, reset]);

  return (
    <section>
      <h1>Editar Currículo</h1>
      <form onSubmit={handleSubmit((data) => console.log("Atualizando dados:", data))}>
        
        {/* COLEGA: Estilizar campos de Nome, Cargo e Resumo com Shadcn [cite: 78, 83] */}
        <div>
          <label>Nome Completo</label>
          <input {...register("nome")} />
        </div>

        {/* Sua Lógica de Campos Dinâmicos [cite: 51, 52] */}
        <h3>Experiências Profissionais</h3>
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <input {...register(`experiencias.${index}.empresa`)} placeholder="Empresa" />
            <button type="button" onClick={() => remove(index)}>Remover</button>
          </div>
        ))}
        
        <button type="button" onClick={() => append({ empresa: "" })}>
          Adicionar Experiência
        </button>
        
        <hr />
        <button type="submit">Salvar Alterações</button>
      </form>
    </section>
  );
}