# Backend - Dev Web Project

API REST em Node.js/TypeScript para gerenciamento de jogos e listas de usuários.

## 🚀 Tecnologias

- **Node.js** - Ambiente de execução JavaScript
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Express.js** - Framework web para Node.js
- **PostgreSQL** - Banco de dados relacional
- **Zod** - Validação de esquemas TypeScript
- **Aiven** - Serviço de banco de dados PostgreSQL na nuvem

## 📋 Pré-requisitos

- Node.js 16+ 
- npm ou yarn
- PostgreSQL (local ou Aiven)

## 🛠️ Instalação

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar banco de dados

#### Opção A: Banco Local (Desenvolvimento)

```bash
# Copiar arquivo de exemplo
cp .env.example .env

# Editar .env com suas configurações locais
DB_HOST=localhost
DB_PORT=5432
DB_NAME=dev_web_project
DB_USER=postgres
DB_PASSWORD=admin
DB_SSL=false
```

#### Opção B: Aiven (Produção)

```bash
# Configurar manualmente o .env com suas credenciais do Aiven
DB_HOST=seu-host-aiven.aivencloud.com
DB_PORT=26820
DB_NAME=defaultdb
DB_USER=avnadmin
DB_PASSWORD=sua-senha
DB_CA_CERT=certificates/ca.pem
DB_SSL=true
```

### 3. Testar conexão

```bash
# Teste rápido de conexão
npm run test:db:dev
```

## 🚀 Execução

### Desenvolvimento

```bash
npm run dev
```

### Produção

```bash
npm run build
npm start
```

## 📁 Estrutura do Projeto

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts          # Configuração do banco
│   ├── controllers/             # Controladores das rotas
│   │   ├── avaliacao.controller.ts
│   │   ├── categoria.controller.ts
│   │   ├── comentario.controller.ts
│   │   ├── jogo.controller.ts
│   │   ├── jogoCategoria.controller.ts
│   │   ├── jogoLista.controller.ts
│   │   ├── jogoPlataforma.controller.ts
│   │   ├── lista.controller.ts
│   │   ├── plataforma.controller.ts
│   │   └── usuario.controller.ts
│   ├── middleware/              # Middlewares personalizados
│   │   ├── errorHandler.ts
│   │   └── validateRequest.ts
│   ├── models/                  # Modelos e validações Zod
│   │   ├── avaliacao.model.ts
│   │   ├── categoria.model.ts
│   │   ├── categoriaJogo.model.ts
│   │   ├── comentario.model.ts
│   │   ├── jogo.model.ts
│   │   ├── jogoLista.model.ts
│   │   ├── jogoPlataforma.model.ts
│   │   ├── lista.model.ts
│   │   ├── plataforma.model.ts
│   │   ├── usuario.model.ts
│   │   ├── validation.body.model.ts
│   │   └── validation.param.model.ts
│   ├── routes/                  # Definição das rotas
│   │   ├── index.ts
│   │   └── allRoutes/
│   │       ├── avaliacao.route.ts
│   │       ├── categoria.route.ts
│   │       ├── comentario.route.ts
│   │       ├── jogo.route.ts
│   │       ├── jogoCategoria.route.ts
│   │       ├── jogoLista.route.ts
│   │       ├── jogoPlataforma.route.ts
│   │       ├── lista.route.ts
│   │       ├── plataforma.route.ts
│   │       └── usuario.route.ts
│   ├── services/                # Lógica de negócio
│   │   ├── avaliacao.service.ts
│   │   ├── categoria.service.ts
│   │   ├── comentario.service.ts
│   │   ├── jogo.service.ts
│   │   ├── jogoCategoria.service.ts
│   │   ├── jogoLista.service.ts
│   │   ├── jogoPlataforma.service.ts
│   │   ├── lista.service.ts
│   │   ├── plataforma.service.ts
│   │   └── usuario.service.ts
│   ├── utils/                   # Utilitários
│   ├── app.ts                   # Configuração do Express
│   └── server.ts                # Servidor principal
├── certificates/                # Certificados SSL
│   └── ca.pem
├── database/                    # Scripts SQL
│   └── fisico.sql
└── .env                        # Variáveis de ambiente
```

## 🔐 Configuração SSL/TLS (Aiven)

### Método 1: Arquivo de Certificado (Recomendado)

1. Baixe o certificado CA do Aiven
2. Coloque em `certs/ca.pem`
3. Configure no `.env`:

```bash
DB_SSL=true
DB_CA_CERT=./certs/ca.pem
```

### Método 2: Conteúdo Direto

```bash
DB_SSL=true
DB_CA_CERT="-----BEGIN CERTIFICATE-----
MIIDQTCCAimgAwIBAgITBmyfz5m/jAo54vB4ikPmljZbyjANBgkqhkiG9w0BAQsF
...
-----END CERTIFICATE-----"
```

## 🌐 Endpoints da API

### Usuários
- `GET /usuarios` - Listar usuários
- `POST /usuarios` - Criar usuário
- `GET /usuarios/:id` - Obter usuário por ID
- `PUT /usuarios/:id` - Atualizar usuário
- `PATCH /usuarios/:id/nome` - Atualizar nome do usuário
- `PATCH /usuarios/:id/descricao` - Atualizar descrição do usuário
- `PATCH /usuarios/:id/imagem` - Atualizar imagem do usuário
- `DELETE /usuarios/:id` - Deletar usuário

### Jogos
- `GET /jogos` - Listar todos os jogos
- `POST /jogos` - Criar novo jogo
- `GET /jogos/:id` - Obter jogo por ID
- `GET /jogos/:name` - Buscar jogos por nome
- `GET /jogos/:id/rating` - Obter rating médio do jogo
- `GET /jogos/:id/total-user-ratings` - Obter total de avaliações do jogo
- `PUT /jogos/:id` - Atualizar jogo
- `PATCH /jogos/:id/desenvolvedor` - Atualizar desenvolvedor do jogo
- `DELETE /jogos/:id` - Deletar jogo
- `POST /jogos/batch` - Obter múltiplos jogos por IDs

### Listas
- `GET /listas` - Listar listas (com filtros por usuário e público)
- `POST /listas` - Criar nova lista
- `GET /listas/:id` - Obter lista por ID
- `PUT /listas/:id` - Atualizar lista completa
- `PATCH /listas/:id/nome` - Atualizar nome da lista
- `PATCH /listas/:id/status` - Atualizar status público/privado da lista
- `DELETE /listas/:id` - Deletar lista

### Avaliações
- `GET /avaliacoes` - Listar todas as avaliações
- `POST /avaliacoes` - Criar nova avaliação
- `GET /avaliacoes/:id` - Obter avaliação por ID
- `GET /avaliacoes/usuario/:userId/jogo/:jogoId` - Obter avaliação específica usuário-jogo
- `PATCH /avaliacoes/:id/nota` - Atualizar nota da avaliação
- `DELETE /avaliacoes/:id` - Deletar avaliação

### Comentários
- `GET /comentarios` - Listar todos os comentários
- `POST /comentarios` - Criar novo comentário
- `GET /comentarios/:id` - Obter comentário por ID
- `PUT /comentarios/:id` - Atualizar comentário
- `DELETE /comentarios/:id` - Deletar comentário

### Categorias
- `GET /categorias` - Listar todas as categorias
- `POST /categorias` - Criar nova categoria
- `GET /categorias/:id` - Obter categoria por ID
- `POST /categorias/batch` - Obter múltiplas categorias por IDs
- `PUT /categorias/:id` - Atualizar categoria
- `DELETE /categorias/:id` - Deletar categoria

### Plataformas
- `GET /plataformas` - Listar todas as plataformas
- `POST /plataformas` - Criar nova plataforma
- `GET /plataformas/:id` - Obter plataforma por ID
- `POST /plataformas/batch` - Obter múltiplas plataformas por IDs
- `PUT /plataformas/:id` - Atualizar plataforma
- `DELETE /plataformas/:id` - Deletar plataforma

### Relações Jogo-Categoria
- `GET /jogos-categorias` - Listar todas as relações
- `POST /jogos-categorias` - Criar relação jogo-categoria
- `GET /jogos-categorias/jogo/:id` - Obter categorias de um jogo
- `DELETE /jogos-categorias` - Remover relação jogo-categoria

### Relações Jogo-Plataforma
- `GET /jogos-plataformas` - Listar todas as relações
- `POST /jogos-plataformas` - Criar relação jogo-plataforma
- `GET /jogos-plataformas/jogo/:id` - Obter plataformas de um jogo
- `DELETE /jogos-plataformas` - Remover relação jogo-plataforma

### Relações Jogo-Lista
- `GET /jogos-listas` - Listar todas as relações
- `POST /jogos-listas` - Adicionar jogo à lista
- `DELETE /jogos-listas` - Remover jogo da lista

## 🧪 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev                   # Servidor em modo desenvolvimento
npm run build                 # Build para produção
npm start                     # Servidor em produção

# Banco de Dados
npm run test:db:dev           # Teste de conexão com banco

# Utilitários
npm run clean                 # Limpar diretório dist
```

## 🔧 Configurações Avançadas

### Pool de Conexões

```bash
# Conexões
DB_MAX_CONNECTIONS=20
DB_MIN_CONNECTIONS=2

# Timeouts
DB_CONNECTION_TIMEOUT=5000
DB_IDLE_TIMEOUT=30000
DB_ACQUIRE_TIMEOUT=60000
DB_STATEMENT_TIMEOUT=30000
DB_QUERY_TIMEOUT=30000
```

### Segurança

- Todas as rotas usam validação Zod
- Middleware de tratamento de erros
- Pool de conexões com timeouts
- SSL/TLS obrigatório em produção

## 🐛 Troubleshooting

### Erro de Conexão

```bash
# Verificar configuração do .env
cat .env

# Testar conexão
npm run test:db:dev
```

### Erro SSL

```bash
# Verificar certificado
ls -la certificates/
cat certificates/ca.pem

# Para desenvolvimento local, desabilitar SSL
DB_SSL=false
```

### Pool de Conexões

```bash
# Reduzir conexões se necessário
DB_MAX_CONNECTIONS=5
DB_MIN_CONNECTIONS=1

# Aumentar timeouts se necessário
DB_CONNECTION_TIMEOUT=15000
DB_ACQUIRE_TIMEOUT=90000
```