import { Pool, PoolConfig } from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

// Função para obter configuração SSL
function getSSLConfig() {
  const sslEnabled = process.env.DB_SSL === 'true';
  
  if (!sslEnabled) {
    return false;
  }

  // Configuração SSL básica (para desenvolvimento ou SSL simples)
  const sslConfig: any = {
    rejectUnauthorized: false
  };

  // Se houver certificado CA especificado (recomendado para produção)
  if (process.env.DB_CA_CERT) {
    try {
      // Tenta ler o certificado como arquivo
      if (fs.existsSync(process.env.DB_CA_CERT)) {
        sslConfig.ca = fs.readFileSync(process.env.DB_CA_CERT, 'utf8');
      } else {
        // Se não for um arquivo, assume que é o conteúdo do certificado
        sslConfig.ca = process.env.DB_CA_CERT;
      }
      sslConfig.rejectUnauthorized = true;
    } catch (error) {
      console.warn('Aviso: Não foi possível carregar o certificado CA:', error);
      console.warn('Usando SSL sem validação de certificado');
    }
  }

  return sslConfig;
}

// Configuração do pool de conexões
const config: PoolConfig = {
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'admin',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'postgres',
  ssl: getSSLConfig(),
  // Configurações de conexão suportadas pelo pg
  connectionTimeoutMillis: parseInt(process.env.DB_CONNECTION_TIMEOUT || '5000'),
  idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT || '30000'),
  max: parseInt(process.env.DB_MAX_CONNECTIONS || '20'),
  min: parseInt(process.env.DB_MIN_CONNECTIONS || '2'),
  // Configurações específicas para PostgreSQL (via options)
  options: `-c statement_timeout=${process.env.DB_STATEMENT_TIMEOUT || '30000'}ms -c idle_in_transaction_session_timeout=${process.env.DB_QUERY_TIMEOUT || '30000'}ms`,
};

// Criar pool de conexões
const pool = new Pool(config);

// Handlers de eventos
pool.on('connect', (client) => {
  console.log('✓ Nova conexão estabelecida com o banco de dados');
});

pool.on('acquire', (client) => {
  console.log('✓ Conexão adquirida do pool');
});

pool.on('error', (err, client) => {
  console.error('❌ Erro inesperado no pool de conexões:', err);
});

pool.on('remove', (client) => {
  console.log('✓ Conexão removida do pool');
});

// Função para testar conectividade
export async function testDatabaseConnection(): Promise<boolean> {
  try {
    console.log('🔍 Testando conexão com o banco de dados...');
    
    const client = await pool.connect();
    const result = await client.query('SELECT NOW() as current_time, version() as version');
    
    console.log('✅ Conexão bem-sucedida!');
    console.log(`📅 Horário do servidor: ${result.rows[0].current_time}`);
    console.log(`🗄️ Versão do PostgreSQL: ${result.rows[0].version.split(' ')[0]} ${result.rows[0].version.split(' ')[1]}`);
    
    client.release();
    return true;
  } catch (error) {
    console.error('❌ Falha na conexão com o banco de dados:', error);
    return false;
  }
}

// Função para fechar todas as conexões
export async function closeDatabaseConnection(): Promise<void> {
  try {
    await pool.end();
    console.log('✅ Pool de conexões fechado com sucesso');
  } catch (error) {
    console.error('❌ Erro ao fechar pool de conexões:', error);
  }
}

// Função para obter estatísticas do pool
export function getPoolStats() {
  return {
    totalCount: pool.totalCount,
    idleCount: pool.idleCount,
    waitingCount: pool.waitingCount
  };
}

export default pool;
