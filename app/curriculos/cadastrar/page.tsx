"use client"
import { useForm, useFieldArray } from "react-hook-form"; // [cite: 10, 51]

export default function CadastroCurriculo() {
  const { register, control, handleSubmit } = useForm();
  
  // Sua lógica de campos dinâmicos [cite: 51, 52]
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiencias"
  });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      {/* Colega: Estilizar campos de Nome, Email, CPF com Shadcn */}
      
      {fields.map((field, index) => (
        <div key={field.id}>
          <input {...register(`experiencias.${index}.empresa`)} />
          <button type="button" onClick={() => remove(index)}>Remover</button>
        </div>
      ))}
      
      <button type="button" onClick={() => append({ empresa: "" })}>
        Adicionar Experiência
      </button>
      
      <button type="submit">Salvar Currículo</button>
    </form>
  );
}