# Backend - Dev Web Project

API REST em TypeScript com arquitetura organizada por responsabilidades.

## 📋 Tecnologias

**Base:**
- **Express** - Framework HTTP minimalista
- **TypeScript** - Tipagem estática para facilitar manutenção  
- **ts-node-dev** - Hot reload com TypeScript
- **dotenv** - Gerenciamento de variáveis de ambiente

**Validação:**
- **Zod** - Validação de dados + tipagem (planejado)

**Documentação:**
- **swagger-ui-express** - Interface da documentação da API (planejado)

**Banco de Dados:**
- **PostgreSQL** - Banco relacional (local ou Aiven Cloud)
- **pg** - Driver para conexão

## 🔧 Como Funciona

### `/src/config/database.ts`
Configuração da conexão PostgreSQL com suporte automático para SSL em produção (Aiven) e pool de conexões.

### `/src/models/index.ts` 
Interfaces TypeScript para tipagem de todas as entidades do banco e tabelas de relacionamento.

### `/src/services/`
Classes que contêm a lógica de negócio e operações no banco:
- `AvaliacaoService` - CRUD de avaliações
- `UsuarioService` - CRUD de usuários + validação de email
- `JogoService` - CRUD de jogos + busca com filtros
- `ListaService` - CRUD de listas + operações especiais
- `CategoriaService` - CRUD de categorias
- `PlataformaService` - CRUD de plataformas
- `ComentarioService` - CRUD de comentários

### `/src/middleware/`
- `errorHandler.ts` - Captura e trata erros automaticamente (duplicação, FK, etc.)
- `asyncHandler` - Wrapper para funções async que evita try/catch

### `/src/routes/`
Endpoints da API REST. Cada arquivo define as rotas HTTP e chama os services correspondentes.

### `/src/app.ts`
Configuração do Express, middlewares globais e setup das rotas.

## 🚀 Scripts

```bash
npm run dev      # Desenvolvimento com hot reload
npm run build    # Compila TypeScript
npm start        # Execução em produção
npm run clean    # Remove pasta dist
```

## ⚙️ Configuração

Crie `.env` na raiz:
```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=dev_web_project  
DB_PASSWORD=senha
DB_PORT=5432
DB_SSL=false
PORT=3001
```

Para Aiven Cloud, defina `DB_SSL=true` e use as credenciais fornecidas.
- **dotenv**: Gerenciamento de variáveis de ambiente

### Validação de Dados
- **Zod**: Biblioteca de tipagem + validação, ideal para TypeScript

### Documentação da API
- **swagger-ui-express**: Interface web para documentação da API
- **swagger.yaml**: Definição da documentação em formato YAML

### Banco de Dados
- **PostgreSQL**: Banco de dados relacional (suporta local e Aiven Cloud)
- **pg**: Driver PostgreSQL para Node.js

## 📁 Estrutura do Projeto

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts        # Configuração do banco de dados
│   ├── models/
│   │   └── index.ts           # Interfaces TypeScript dos modelos
│   ├── routes/                # Rotas da API
│   │   ├── allRoutes/         # Todas as rotas da API
│   │   └── index.ts           # Configuração de todas as rotas
│   ├── app.ts                # Configuração principal do Express
│   └── server.ts             # Entrada da aplicação
├── database/
│   └── fisico.sql            # Script SQL para criação das tabelas
├── dist/                     # Arquivos JavaScript compilados
├── .env.example              # Exemplo de variáveis de ambiente
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Como Cada Seção Funciona

### `/src/config/database.ts`
- **Função**: Configuração da conexão com PostgreSQL
- **Características**:
  - Suporte tanto para banco local quanto Aiven Cloud
  - Configuração SSL automática para produção
  - Pool de conexões para melhor performance
  - Tratamento de erros de conexão

### `/src/models/index.ts`
- **Função**: Definição das interfaces TypeScript
- **Características**:
  - Tipagem para todas as entidades do banco
  - Interfaces para tabelas de relacionamento
  - Campos opcionais devidamente marcados

### `/src/routes/`
- **Função**: Definição dos endpoints da API REST
- **Características**:
  - Cada arquivo corresponde a uma entidade
  - Operações CRUD completas
  - Validação de dados de entrada
  - Tratamento de erros HTTP

### `/src/app.ts`
- **Função**: Configuração principal do servidor Express
- **Características**:
  - Configuração de middlewares (CORS, JSON parser)
  - Registro de todas as rotas
  - Carregamento de variáveis de ambiente

## 🚀 Instalação e Configuração

### 1. Instalar Dependências
```bash
npm install
```

### 2. Configurar Variáveis de Ambiente
```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite as configurações do banco
nano .env
```

### 3. Configurações do Banco

#### Para desenvolvimento local:
```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=dev_web_project
DB_PASSWORD=sua_senha
DB_PORT=5432
DB_SSL=false
```

#### Para produção com Aiven:
```env
DB_USER=avnadmin
DB_HOST=seu-host.aivencloud.com
DB_NAME=defaultdb
DB_PASSWORD=sua-senha-secreta
DB_PORT=25060
DB_SSL=true
```

### 4. Executar Scripts SQL
```bash
# Execute o script de criação das tabelas
psql -d sua_database -f database/fisico.sql
```

## 📜 Scripts Disponíveis

- `npm run dev` - Desenvolvimento com hot reload
- `npm run build` - Compila TypeScript para JavaScript
- `npm start` - Executa versão compilada (produção)
- `npm run clean` - Remove pasta dist

## 🔄 Desenvolvimento

Para desenvolver localmente:
```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3001`

## 📋 Endpoints da API

### Usuários (`/usuarios`)
- `GET /usuarios` - Listar todos os usuários
- `POST /usuarios` - Criar novo usuário
- `GET /usuarios/:id` - Buscar usuário por ID
- `PUT /usuarios/:id` - Atualizar usuário completo
- `DELETE /usuarios/:id` - Deletar usuário
- `PATCH /usuarios/:id/nome` - Atualizar apenas nome
- `PATCH /usuarios/:id/imagem` - Atualizar apenas imagem
- `PATCH /usuarios/:id/descricao` - Atualizar apenas descrição

### Jogos (`/jogos`)
- `GET /jogos` - Listar jogos (com filtro por nome)
- `POST /jogos` - Criar novo jogo
- `GET /jogos/:id` - Buscar jogo por ID
- `PUT /jogos/:id` - Atualizar jogo
- `DELETE /jogos/:id` - Deletar jogo
- `POST /jogos/batch` - Buscar múltiplos jogos por IDs

### Listas (`/listas`)
- `GET /listas` - Listar listas (com filtro por usuário)
- `POST /listas` - Criar nova lista
- `GET /listas/:id` - Buscar lista por ID
- `PUT /listas/:id` - Atualizar lista
- `DELETE /listas/:id` - Deletar lista e suas relações
- `PATCH /listas/:id/nome` - Atualizar apenas nome
- `PATCH /listas/:id/status` - Atualizar visibilidade

### Avaliações (`/avaliacoes`)
- `GET /avaliacoes` - Listar avaliações
- `POST /avaliacoes` - Criar nova avaliação
- `GET /avaliacoes/:id` - Buscar avaliação por ID
- `PUT /avaliacoes/:id` - Atualizar avaliação
- `DELETE /avaliacoes/:id` - Deletar avaliação
- `PATCH /avaliacoes/:id/nota` - Atualizar apenas nota

### Relacionamentos
- `/jogo_plataforma` - Associações entre jogos e plataformas
- `/categoria_jogo` - Associações entre categorias e jogos
- `/jogo_lista` - Associações entre jogos e listas

## 🏗️ Compilação para Produção

```bash
# Compilar TypeScript
npm run build

# Executar versão compilada
npm start
```

Os arquivos compilados ficam na pasta `dist/`