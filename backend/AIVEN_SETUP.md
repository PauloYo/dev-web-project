# Configuração do Aiven PostgreSQL

Este documento descreve como configurar o projeto para usar o PostgreSQL hospedado no Aiven.

## Pré-requisitos

- Conta no Aiven (https://aiven.io/)
- Serviço PostgreSQL criado no Aiven
- Certificado CA do Aiven baixado

## Configuração Passo a Passo

### 1. Obter Informações de Conexão

No painel do Aiven, vá para o seu serviço PostgreSQL e anote:
- **Host**: geralmente no formato `your-project-your-service.aivencloud.com`
- **Port**: geralmente `25060`
- **Database**: geralmente `defaultdb`
- **User**: geralmente `avnadmin`
- **Password**: sua senha definida

### 2. Baixar Certificado CA

1. No painel do Aiven, vá para a aba "Connection information"
2. Baixe o arquivo `ca.pem` (Certificate Authority)
3. Salve na pasta `backend/certificates/` do projeto

### 3. Configurar Variáveis de Ambiente

Crie/edite o arquivo `.env` com as seguintes configurações:

```env
# Configuração do Servidor
PORT=3001
NODE_ENV=production

# Configuração do Aiven PostgreSQL
DB_HOST=your-project-your-service.aivencloud.com
DB_PORT=25060
DB_NAME=defaultdb
DB_USER=avnadmin
DB_PASSWORD=your-secure-password
DB_SSL=true
DB_CA_CERT=certificates/ca.pem
```

### 4. Alternativas para Certificado CA

#### Opção 1: Arquivo de Certificado (Recomendado)
```env
DB_CA_CERT=certificates/ca.pem
```

#### Opção 2: Conteúdo do Certificado Inline
```env
DB_CA_CERT="-----BEGIN CERTIFICATE-----
MIIDQTCCAimgAwIBAgITBmyfz5m/jAo54vB4ikPmljZbyjANBgkqhkiG9w0BAQsF
ADBfMQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQL
ExB3d3cuZGlnaWNlcnQuY29tMR4wHAYDVQQDExVEaWdpQ2VydCBHbG9iYWwgUm9v
dCBHMjAeFw0xMzA4MDExMjAwMDBaFw0zODAxMTUxMjAwMDBaMGYxCzAJBgNVBAYT
AlVTMRUwEwYDVQQKEwxEaWdpQ2VydCBJbmMxGTAXBgNVBAsTEHd3dy5kaWdpY2Vy
dC5jb20xJTAjBgNVBAMTHERpZ2lDZXJ0IEdsb2JhbCBSb290IEcyIC0gRUNDMFkw
EwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE4ghC6nfYJN6gLQaJdgg4AQPeNsxCpCdz
a8LCJXvmXXNiLqPpwXuBmkTgchjEQyF7sZnKCu4iOLOV9sIYPUEzCKiUaAcaBQ0z
-----END CERTIFICATE-----"
```

### 5. Configurações Avançadas

Para otimizar a conexão com o Aiven, você pode ajustar:

```env
# Timeouts (em milliseconds)
DB_CONNECTION_TIMEOUT=10000
DB_IDLE_TIMEOUT=30000
DB_ACQUIRE_TIMEOUT=60000
DB_CREATE_TIMEOUT=8000
DB_DESTROY_TIMEOUT=5000
DB_STATEMENT_TIMEOUT=30000
DB_QUERY_TIMEOUT=30000

# Pool de conexões
DB_MAX_CONNECTIONS=20
DB_MIN_CONNECTIONS=2
DB_CREATE_RETRY_INTERVAL=200
```

### 6. Verificar Conexão

Execute o comando para testar a conexão:

```bash
npm run test:db
```

### 7. Estrutura de Arquivos

```
backend/
├── certificates/
│   └── ca.pem              # Certificado CA do Aiven
├── src/
│   ├── config/
│   │   └── database.ts     # Configuração do banco
│   └── server.ts           # Servidor principal
├── .env                    # Suas configurações
├── .env.example           # Exemplo de configurações
└── setup.js               # Script de setup
```

## Troubleshooting

### Erro de SSL
```
Error: self signed certificate in certificate chain
```
**Solução**: Certifique-se de que `DB_SSL=true` e `DB_CA_CERT` está configurado corretamente.

### Erro de Conexão
```
Error: connect ECONNREFUSED
```
**Solução**: Verifique se o host, porta e credenciais estão corretos.

### Erro de Certificado
```
Error: unable to verify the first certificate
```
**Solução**: Verifique se o arquivo `ca.pem` está no caminho correto e é válido.

## Comandos Úteis

```bash
# Setup inicial
npm run setup

# Testar conexão com banco
npm run test:db

# Desenvolvimento
npm run dev

# Produção
npm run build
npm start
```

## Segurança

- **Nunca** commite arquivos `.env` no Git
- Use variáveis de ambiente no servidor de produção
- Mantenha certificados seguros
- Use senhas fortes para o banco de dados
- Considere usar secrets managers em produção (AWS Secrets Manager, Azure Key Vault, etc.)

## Exemplo de Deploy

Para deploy em produção, você pode usar as seguintes variáveis de ambiente:

```bash
# Heroku exemplo
heroku config:set DB_HOST=your-project-your-service.aivencloud.com
heroku config:set DB_PORT=25060
heroku config:set DB_NAME=defaultdb
heroku config:set DB_USER=avnadmin
heroku config:set DB_PASSWORD=your-secure-password
heroku config:set DB_SSL=true
heroku config:set DB_CA_CERT="-----BEGIN CERTIFICATE-----
..."
```
