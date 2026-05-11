export type Experiencia = {
  empresa: string;
  cargo: string;
};

export type Formacao = {
  instituicao: string;
  curso: string;
};

export type Curriculo = {
  id: string;
  nome: string;
  sobrenome: string;
  dataNascimento: string;
  cpf?: string;
  email: string;
  telefone: string;
  sobreMim: string;
  cargo?: string;
  resumo?: string;
  foto?: string;
  experiencias: Experiencia[];
  formacoes: Formacao[];
};

export const CURRICULOS_INICIAIS: Curriculo[] = [
  {
    id: "1",
    nome: "José",
    sobrenome: "Silva",
    dataNascimento: "15/05/1998",
    cpf: "123.456.789-00",
    email: "jose@email.com",
    telefone: "(47) 99999-8888",
    sobreMim: "Estudante de sistemas com foco em React e Next.js.",
    cargo: "Desenvolvedor Full Stack",
    resumo: "Estudante de sistemas com foco em React e Next.js.",
    foto: "/avatars/avatar-1.png",
    experiencias: [{ empresa: "Tech Solutions", cargo: "Desenvolvedor" }],
    formacoes: [{ instituicao: "Universidade XYZ", curso: "Sistemas" }],
  },
  {
    id: "2",
    nome: "Maria",
    sobrenome: "Oliveira",
    dataNascimento: "20/08/1995",
    cpf: "987.654.321-00",
    email: "maria@email.com",
    telefone: "(11) 98888-7777",
    sobreMim: "Especialista em interfaces limpas e acessibilidade.",
    cargo: "Designer UX/UI",
    resumo: "Especialista em interfaces limpas e acessibilidade.",
    foto: "/avatars/avatar-2.png",
    experiencias: [{ empresa: "Agência Criativa", cargo: "UX Designer" }],
    formacoes: [{ instituicao: "Faculdade de Design", curso: "Design Digital" }],
  },
  {
    id: "3",
    nome: "Carlos",
    sobrenome: "Souza",
    dataNascimento: "10/02/1990",
    cpf: "111.222.333-44",
    email: "carlos@email.com",
    telefone: "(21) 97777-6666",
    sobreMim: "Experiência com Python, SQL e visualização de dados.",
    cargo: "Analista de Dados",
    resumo: "Experiência com Python, SQL e visualização de dados.",
    foto: "/avatars/avatar-3.png",
    experiencias: [{ empresa: "DataCorp", cargo: "Analista de Dados Pleno" }],
    formacoes: [{ instituicao: "Universidade de Dados", curso: "Ciência de Dados" }],
  },
];

export const MOCK_IDS = CURRICULOS_INICIAIS.map((c) => c.id);