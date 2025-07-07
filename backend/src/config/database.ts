import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Configuração para PostgreSQL (suporta tanto local quanto Aiven)
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'admin',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'postgres',
  // Configurações específicas para Aiven (SSL obrigatório)
  ssl: process.env.DB_SSL === 'true' ? {
    rejectUnauthorized: false
  } : false,
  // Configurações adicionais para conexões em nuvem
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
  max: 20,
});

// Teste de conexão
pool.on('connect', () => {
  console.log('Conectado ao banco de dados PostgreSQL');
});

pool.on('error', (err) => {
  console.error('Erro na conexão com o banco:', err);
});

export default pool;
