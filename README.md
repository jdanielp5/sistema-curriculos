# 📄 Sistema de Gestão de Currículos

> Trabalho 2 — Etapa 1: Frontend | Disciplina de Desenvolvimento Web

**Dupla:**
- Maria Eduarda da Cunha
- José Daniel Leon Pena

---

## 📌 Sobre o Projeto

O **ProFile** é uma aplicação web para gestão de currículos profissionais. Desenvolvida com Next.js e App Router, permite cadastrar, visualizar, editar e excluir currículos com dados persistidos no `localStorage`. A aplicação foi construída com foco em boas práticas de UX, validação rigorosa de formulários e componentização modular.

---

## 🚀 Stack Tecnológica

| Categoria | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router) |
| Linguagem | TypeScript |
| Estilização | Tailwind CSS v4 |
| UI Components | shadcn/ui |
| Formulários | React Hook Form + Yup |
| Máscaras | react-imask |
| Notificações | Sonner |
| Ícones | Lucide React |
| Fonte | Plus Jakarta Sans (via next/font) |

---

## 📁 Estrutura do Projeto

```
sistema-curriculos/
├── app/
│   ├── curriculos/
│   │   ├── cadastrar/         # Formulário de novo currículo
│   │   │   └── page.tsx
│   │   ├── editar/[id]/       # Edição de currículo existente
│   │   │   └── page.tsx
│   │   └── visualizar/        # Listagem e detalhes
│   │       ├── page.tsx
│   │       └── [id]/page.tsx
│   ├── globals.css
│   ├── layout.tsx             # Layout raiz com Sidebar e Toaster
│   └── page.tsx               # Landing page (Home)
├── components/
│   └── ui/
│       ├── Sidebar.tsx        # Navegação lateral com active state
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── skeleton.tsx
│       └── textarea.tsx
├── lib/
│   └── utils.ts
|   └── data.ts
├── public/                    # Ativos estáticos
├── package.json
└── tsconfig.json
```

---

## ⚙️ Como Executar

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

### Instalação e execução

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/sistema-curriculos.git

# 2. Entre na pasta do projeto
cd sistema-curriculos

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

### Scripts disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm run start    # Inicia o build de produção
npm run lint     # Verifica erros de lint
```

---

## 🗺️ Rotas da Aplicação

| Rota | Descrição |
|---|---|
| `/` | Landing page com apresentação do sistema |
| `/curriculos/visualizar` | Listagem de todos os currículos |
| `/curriculos/visualizar/[id]` | Detalhes de um currículo específico |
| `/curriculos/cadastrar` | Formulário de cadastro de novo currículo |
| `/curriculos/editar/[id]` | Edição de currículo existente |

> As rotas seguem o padrão amigável definido nos requisitos, sem expor a estrutura interna de diretórios do Next.js.

---

## ✅ Funcionalidades Implementadas

### Requisitos Obrigatórios

- [x] **Landing Page** com apresentação dos benefícios do sistema (shadcn/ui Cards, Badge)
- [x] **Listagem de currículos** com cards (Nome, Cargo, Resumo, E-mail)
- [x] **Detalhes do currículo** via rota dinâmica `/visualizar/[id]`
- [x] **Formulário de cadastro** completo com validação via Yup
- [x] **Persistência mockada** com dados iniciais + `localStorage`
- [x] **Máscaras de entrada** para CPF, Telefone e Data de Nascimento (react-imask)
- [x] **Feedback visual** com Sonner toast em todas as ações (sucesso e erro)
- [x] **Responsividade** com Tailwind CSS (mobile, tablet, desktop)
- [x] **Ícones contextuais** com Lucide React

### Desafios Técnicos

- [x] **Field Arrays dinâmicos** — Experiências Profissionais e Formações Acadêmicas com `useFieldArray` (React Hook Form)
- [x] **Empty State** — Mensagem amigável quando não há resultados na busca
- [x] **Skeleton Screen** — Simulação de carregamento com `Skeleton` do shadcn/ui
- [x] **Busca em tempo real** — Filtro por nome ou cargo na listagem

### Refinamentos de UI

- [x] **Active state** no menu lateral (Sidebar) indicando a página atual
- [x] **Estados dos botões** — hover, focus-visible e disabled durante submissão
- [x] **Toast com descrição** contendo os erros específicos do Yup
- [x] **Edição e exclusão** de currículos na página de detalhes

---

## 🎨 Decisões de Design

- **Paleta de cores:** Tons de verde esmeralda (`emerald`) como cor primária, com cinza-slate para textos e fundos neutros.
- **Tipografia:** Plus Jakarta Sans — fonte moderna com excelente legibilidade em múltiplos pesos.
- **Layout:** Sidebar fixa na esquerda em desktop; conteúdo principal em `flex-1`. Em mobile, a sidebar é ocultada.
- **Estética geral:** Clean e profissional, com cards que utilizam `border-l` colorida para hierarquia visual e micro-animações de hover.

---

## 📦 Dependências Principais

```json
{
  "next": "16.2.4",
  "react": "19.2.4",
  "react-hook-form": "^7.72.1",
  "yup": "^1.7.1",
  "sonner": "^2.0.7",
  "react-imask": "^7.6.1",
  "lucide-react": "^1.8.0",
  "tailwindcss": "^4",
  "shadcn": "^4.3.0"
}
```

---

## 👥 Equipe

| Nome | GitHub |
|---|---|
| Maria Eduarda da Cunha | [@Maria90eduarda](https://github.com/Maria90eduarda) |
| José Daniel Leon Pena | [@jdanielp5](https://github.com/jdanielp5) |

---

*Trabalho acadêmico — © 2026*