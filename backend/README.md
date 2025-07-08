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
# Usar assistente de configuração
npm run setup:aiven

# OU configurar manualmente
cp .env.production .env
# Editar .env com suas credenciais do Aiven
```

### 3. Testar conexão

```bash
# Teste rápido
npm run test:db:dev

# Validação completa
npm run validate:aiven
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
│   ├── middleware/              # Middlewares personalizados
│   ├── models/                  # Modelos e validações Zod
│   ├── routes/                  # Definição das rotas
│   ├── services/                # Lógica de negócio
│   ├── utils/                   # Utilitários
│   ├── app.ts                   # Configuração do Express
│   └── server.ts                # Servidor principal
├── docs/                        # Documentação
├── certs/                       # Certificados SSL
├── .env.example                 # Exemplo de configuração
├── setup-aiven.js               # Assistente de configuração
└── validate-aiven.js            # Validador de configuração
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
- `GET /api/usuarios` - Listar usuários
- `POST /api/usuarios` - Criar usuário
- `GET /api/usuarios/:id` - Obter usuário
- `PUT /api/usuarios/:id` - Atualizar usuário
- `DELETE /api/usuarios/:id` - Deletar usuário

### Jogos
- `GET /api/jogos` - Listar jogos
- `POST /api/jogos` - Criar jogo
- `GET /api/jogos/:id` - Obter jogo
- `PUT /api/jogos/:id` - Atualizar jogo
- `DELETE /api/jogos/:id` - Deletar jogo

### Listas
- `GET /api/listas` - Listar listas
- `POST /api/listas` - Criar lista
- `GET /api/listas/:id` - Obter lista
- `PUT /api/listas/:id` - Atualizar lista
- `DELETE /api/listas/:id` - Deletar lista

### Avaliações
- `GET /api/avaliacoes` - Listar avaliações
- `POST /api/avaliacoes` - Criar avaliação
- `GET /api/avaliacoes/:id` - Obter avaliação
- `PUT /api/avaliacoes/:id` - Atualizar avaliação
- `DELETE /api/avaliacoes/:id` - Deletar avaliação

### Comentários
- `GET /api/comentarios` - Listar comentários
- `POST /api/comentarios` - Criar comentário
- `GET /api/comentarios/:id` - Obter comentário
- `PUT /api/comentarios/:id` - Atualizar comentário
- `DELETE /api/comentarios/:id` - Deletar comentário

### Categorias
- `GET /api/categorias` - Listar categorias
- `POST /api/categorias` - Criar categoria
- `GET /api/categorias/:id` - Obter categoria
- `PUT /api/categorias/:id` - Atualizar categoria
- `DELETE /api/categorias/:id` - Deletar categoria

### Plataformas
- `GET /api/plataformas` - Listar plataformas
- `POST /api/plataformas` - Criar plataforma
- `GET /api/plataformas/:id` - Obter plataforma
- `PUT /api/plataformas/:id` - Atualizar plataforma
- `DELETE /api/plataformas/:id` - Deletar plataforma

## 🧪 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev                    # Servidor em modo desenvolvimento
npm run build                 # Build para produção
npm start                     # Servidor em produção

# Banco de Dados
npm run test:db:dev           # Teste rápido de conexão
npm run validate:aiven        # Validação completa da configuração
npm run setup:aiven           # Assistente de configuração

# Utilitários
npm run clean                 # Limpar diretório dist
```

## 🔧 Configurações Avançadas

### Pool de Conexões

```bash
# Conexões
DB_MAX_CONNECTIONS=10
DB_MIN_CONNECTIONS=2

# Timeouts
DB_CONNECTION_TIMEOUT=10000
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
# Validar configuração
npm run validate:aiven

# Verificar logs
npm run dev
```

### Erro SSL

```bash
# Verificar certificado
ls -la certs/
cat certs/ca.pem

# Testar sem SSL (apenas desenvolvimento)
DB_SSL=false
```

### Pool de Conexões

```bash
# Reduzir conexões
DB_MAX_CONNECTIONS=5
DB_MIN_CONNECTIONS=1

# Aumentar timeouts
DB_CONNECTION_TIMEOUT=15000
DB_ACQUIRE_TIMEOUT=90000
```