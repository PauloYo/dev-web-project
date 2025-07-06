# Backend - Dev Web Project

Este é o backend do projeto Dev Web

## Estrutura do Projeto

```
backend/
├── src/
│   ├── db.ts                  # Configuração do banco de dados
│   ├── server.ts              # Servidor principal
│   └── routes/                # Rotas da API
│       ├── avaliacao.ts
│       ├── categoria.ts
│       ├── categoria_jogo.ts
│       ├── comentario.ts
│       ├── jogo.ts
│       ├── jogo_lista.ts
│       ├── jogo_plataforma.ts
│       ├── lista.ts
│       ├── plataforma.ts
│       └── usuario.ts
├── dist/                      # Arquivos JavaScript compilados
├── package.json
├── tsconfig.json
└── README.md
```

## Instalação

1. Instale as dependências:
```bash
npm install
```

2. Configure o banco de dados PostgreSQL no arquivo `src/db.ts` se necessário.

## Scripts Disponíveis

- `npm run dev` - Executa o servidor em modo desenvolvimento com hot reload
- `npm run build` - Compila o TypeScript para JavaScript
- `npm start` - Executa o servidor em produção (arquivos compilados)
- `npm run clean` - Remove a pasta dist

## Desenvolvimento

Para desenvolver, execute:
```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3001`

## Compilação

Para compilar o projeto:
```bash
npm run build
```

Os arquivos compilados estarão na pasta `dist/`