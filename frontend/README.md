# Frontend - Dev Web Project

Interface web em React/TypeScript para o sistema de jogos e listas de usuários.

## 🚀 Tecnologias

- **React 19** - Biblioteca para interfaces de usuário
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Vite** - Build tool e dev server
- **React Router DOM** - Roteamento para SPA
- **Tailwind CSS** - Framework CSS utilitário
- **Zod** - Validação de esquemas TypeScript
- **FontAwesome** - Ícones
- **Material-UI** - Componentes UI

## 📋 Pré-requisitos

- Node.js 16+
- npm ou yarn
- Backend rodando na porta 3001

## 🛠️ Instalação

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

O frontend se conecta ao backend em `http://localhost:3001` por padrão.

## 🚀 Execução

### Desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:5173

### Build para produção

```bash
npm run build
```

### Preview do build

```bash
npm run preview
```

## 📁 Estrutura do Projeto

```
frontend/
├── src/
│   ├── assets/                  # Imagens, ícones e recursos estáticos
│   ├── components/              # Componentes reutilizáveis
│   │   ├── shared/              # Componentes compartilhados
│   │   │   ├── Nav.tsx
│   │   │   ├── Title.tsx
│   │   │   └── Footer.tsx
│   │   ├── GameCard.tsx
│   │   ├── Avaliacao.tsx
│   │   └── AllReviews.tsx
│   ├── router/                  # Configuração de rotas
│   │   └── index.ts
│   ├── services/                # Serviços para comunicação com API
│   │   ├── avaliacao.ts
│   │   ├── categoria.ts
│   │   ├── comentario.ts
│   │   ├── jogos.ts
│   │   ├── jogoCategoria.ts
│   │   ├── jogoLista.ts
│   │   ├── jogoPlataforma.ts
│   │   ├── listas.ts
│   │   ├── plataformas.ts
│   │   └── usuarios.ts
│   ├── types/                   # Definições de tipos TypeScript
│   │   ├── api.ts              # Tipos da API
│   │   └── internal.ts         # Tipos internos do frontend
│   ├── utils/                   # Funções utilitárias
│   │   └── login.ts
│   ├── views/                   # Páginas/Views da aplicação
│   │   ├── Home.tsx
│   │   ├── Games.tsx
│   │   ├── Login.tsx
│   │   ├── SignIn.tsx
│   │   ├── Profile.tsx
│   │   ├── ProfileEdit.tsx
│   │   ├── CreateList.tsx
│   │   ├── UserLists.tsx
│   │   ├── PublicLists.tsx
│   │   └── SelectedGame.tsx
│   ├── index.css               # Estilos globais com Tailwind
│   ├── main.tsx                # Ponto de entrada da aplicação
│   └── vite-env.d.ts          # Tipos do Vite
├── public/                     # Arquivos públicos
│   └── vite.svg
├── index.html                  # HTML principal
├── vite.config.ts             # Configuração do Vite
├── tailwind.config.js         # Configuração do Tailwind CSS
├── tsconfig.json              # Configuração do TypeScript
└── package.json               # Dependências e scripts
```

## 🌐 Páginas e Funcionalidades

### Páginas Públicas
- **Home (/)** - Ranking dos jogos mais bem avaliados
- **Games (/games)** - Lista de todos os jogos com busca
- **Login (/login)** - Autenticação de usuários
- **Sign In (/sign-in)** - Cadastro de novos usuários
- **Public Lists (/public-lists)** - Listas públicas de outros usuários

### Páginas Autenticadas
- **Profile (/profile)** - Perfil do usuário logado
- **Profile Edit (/profile-edit)** - Edição de perfil (nome, descrição, imagem)
- **User Lists (/user-lists)** - Listas pessoais do usuário
- **Create List (/create-list)** - Criação de nova lista
- **Selected Game (/game/:id)** - Detalhes de um jogo específico

## 🧪 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev                     # Servidor de desenvolvimento (porta 5173)
npm run build                   # Build para produção
npm run preview                 # Preview do build de produção

# Qualidade de código
npm run lint                    # Linting com ESLint
```

## 🎨 Estilização

O projeto usa **Tailwind CSS** para estilização:
- Classes utilitárias para estilização rápida
- Design responsivo
- Tema dark por padrão
- Componentes customizados

## 📡 Comunicação com API

### Services
Cada entidade possui um service correspondente:
- `JogosService` - Gerenciamento de jogos
- `UsuariosService` - Gerenciamento de usuários
- `ListasService` - Gerenciamento de listas
- `AvaliacaoService` - Gerenciamento de avaliações
- E outros serviços para categorias, plataformas, etc.

### Tipos TypeScript
- `types/api.ts` - Tipos compartilhados com o backend
- `types/internal.ts` - Tipos específicos do frontend

## 🔧 Configuração do Vite

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

## 🛠️ Troubleshooting

### Erro de Conexão com Backend
```bash
# Verificar se o backend está rodando
curl http://localhost:3001

# Verificar se as portas estão corretas nos services
```

### Problemas de Build
```bash
# Limpar cache e reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

### Problemas de Tipos TypeScript
```bash
# Verificar configuração do TypeScript
npx tsc --noEmit
```
