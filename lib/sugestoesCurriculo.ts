// lib/sugestoesCurriculo.ts

export interface Sugestao {
  tipo: "alerta" | "sucesso";
  mensagem: string;
}

export function analisarCurriculo(curriculo: any): Sugestao[] {
  const sugestoes: Sugestao[] = [];

  // 1. Regra: Resumo profissional muito curto (Item 4 do enunciado)
  const resumo = curriculo.sobreMim || curriculo.resumo || "";
  if (resumo.length < 50) {
    sugestoes.push({ 
      tipo: "alerta", 
      mensagem: "O seu resumo profissional está muito curto. Adicione mais detalhes sobre suas competências e objetivos." 
    });
  }

  // 2. Regra: Ausência de experiências profissionais
  if (!curriculo.experiencias || curriculo.experiencias.length === 0) {
    sugestoes.push({ 
      tipo: "alerta", 
      mensagem: "Você ainda não adicionou experiências profissionais. Isso é fundamental para os recrutadores." 
    });
  }

  // 3. Regra: Ausência de formação acadêmica
  if (!curriculo.formacoes || curriculo.formacoes.length === 0) {
    sugestoes.push({ 
      tipo: "alerta", 
      mensagem: "Adicione sua formação acadêmica para que saibam sua base de conhecimento." 
    });
  }

  // 4. Regra: Poucas habilidades (Se você tiver o campo de habilidades)
  if (curriculo.habilidades && curriculo.habilidades.length < 3) {
    sugestoes.push({ 
      tipo: "alerta", 
      mensagem: "Tente listar pelo menos 3 habilidades técnicas ou comportamentais." 
    });
  }

  // 5. Regra: Validação de e-mail ou telefone (Verificação simples)
  if (curriculo.email && !curriculo.email.includes("@")) {
    sugestoes.push({ 
      tipo: "alerta", 
      mensagem: "O formato do e-mail informado parece estar inválido." 
    });
  }

  // Se tudo estiver preenchido corretamente
  if (sugestoes.length === 0) {
    sugestoes.push({ 
      tipo: "sucesso", 
      mensagem: "Parabéns! Seu currículo está completo e segue as boas práticas." 
    });
  }

  return sugestoes;
}