// components/SugestoesCurriculo.tsx
import { analisarCurriculo, Sugestao } from "@/lib/sugestoesCurriculo";
import { Lightbulb, CheckCircle2, AlertTriangle } from "lucide-react";

interface SugestoesCurriculoProps {
  curriculo: any;
}

export function SugestoesCurriculo({ curriculo }: SugestoesCurriculoProps) {
  const sugestoes = analisarCurriculo(curriculo);

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center gap-2 border-b pb-2">
        <Lightbulb className="text-yellow-500" size={24} />
        <h3 className="text-xl font-bold text-slate-800">Sugestões de Melhoria</h3>
      </div>
      
      <div className="grid gap-3">
        {sugestoes.map((sug, index) => (
          <div 
            key={index} 
            className={`flex items-start gap-3 p-4 rounded-lg border shadow-sm transition-all ${
              sug.tipo === "alerta" 
                ? "bg-amber-50 border-amber-200 text-amber-800" 
                : "bg-emerald-50 border-emerald-200 text-emerald-800"
            }`}
          >
            {sug.tipo === "alerta" ? (
              <AlertTriangle className="mt-0.5 shrink-0" size={18} />
            ) : (
              <CheckCircle2 className="mt-0.5 shrink-0" size={18} />
            )}
            <p className="text-sm font-medium leading-tight">
              {sug.mensagem}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}