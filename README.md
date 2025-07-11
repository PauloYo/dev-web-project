# 🎮 Dev Web Project - Sistema de Jogos

Sistema web para classificação e avaliação de jogos, permitindo aos usuários criar listas personalizadas, avaliar jogos e compartilhar suas opiniões.

## 📖 Sobre o Projeto

Este projeto é um sistema de jogos que permite:
- **Classificação de jogos** em diferentes listas personalizadas
- **Avaliação de usuários** com notas e comentários
- **Listas públicas e privadas** para organização de jogos
- **Perfis de usuários** com histórico de avaliações
- **Sistema de administração** para gerenciar jogos no sistema

## 🚀 Tecnologias

### Backend
- **Node.js** + **TypeScript**
- **Express.js** - Framework web
- **PostgreSQL** - Banco de dados relacional
- **Zod** - Validação de esquemas
- **Aiven** - Banco de dados na nuvem

### Frontend
- **React** + **TypeScript**
- **Vite** - Build tool e dev server
- **React Router DOM** - Roteamento
- **Tailwind CSS** - Estilização
- **Zod** - Validação no frontend

## 🛠️ Como Executar

### Pré-requisitos
- Node.js 16+
- npm ou yarn

### 1. Clonar o repositório
```bash
git clone https://github.com/PauloYo/dev-web-project.git
cd dev-web-project
```

### 2. Instalar dependências
```bash
# Instalar dependências do backend
cd backend
npm install

# Instalar dependências do frontend
cd ../frontend
npm install
```

### 3. Configurar variáveis de ambiente
```bash
# No diretório backend, configure o .env com suas credenciais do banco
# Veja backend/README.md para mais detalhes
```

### 4. Executar o projeto
```bash
# Para iniciar o backend (porta 3001)
npm run dev:backend

# Para iniciar o frontend (porta 5173)
npm run dev:frontend
```

Execute ambos os comandos em terminais separados para rodar o projeto completo.

## 📁 Estrutura do Projeto

```
dev-web-project/
├── backend/          # API REST em Node.js/TypeScript
├── frontend/         # Interface em React/TypeScript
├── docs/            # Documentação e diagramas
└── shared/          # Esquemas compartilhados
```

## 📚 Documentação

- [Backend README](./backend/README.md) - Detalhes da API e configuração
- [Frontend README](./frontend/README.md) - Configuração do cliente React
- [Documentação Completa](./docs/README.md) - Visão geral e protótipos

## 🌐 Funcionalidades

### Para Usuários
- ✅ Visualizar ranking de jogos mais bem avaliados
- ✅ Pesquisar e filtrar jogos por nome e plataforma
- ✅ Avaliar jogos com notas e comentários
- ✅ Criar listas personalizadas (públicas ou privadas)
- ✅ Gerenciar perfil com foto e descrição
- ✅ Ver listas públicas de outros usuários

### Para Administradores
- ✅ Adicionar novos jogos ao sistema
- ✅ Editar informações de jogos existentes
- ✅ Remover jogos do sistema
- ✅ Gerenciar categorias e plataformas

## 🔗 Links Úteis

- **Backend**: http://localhost:3001
- **Frontend**: http://localhost:5173
- **Banco de Dados**: Aiven Cloud PostgreSQL
