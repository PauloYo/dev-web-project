import { testDatabaseConnection, closeDatabaseConnection } from './config/database';
import app from './app';

// Função para inicializar o servidor
async function startServer() {
  try {
    // Testar conexão com banco de dados
    const isDbConnected = await testDatabaseConnection();
    
    if (!isDbConnected) {
      console.error('❌ Não foi possível conectar ao banco de dados. Encerrando aplicação...');
      process.exit(1);
    }

    // Iniciar servidor
    const PORT = process.env.PORT || 3001;
    const server = app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`🔗 Acesse: http://localhost:${PORT}`);
    });

    // Configurar graceful shutdown
    const shutdown = async (signal: string) => {
      console.log(`\n⚡ Recebido sinal ${signal}. Iniciando graceful shutdown...`);
      
      server.close(async () => {
        console.log('🔐 Servidor HTTP fechado');
        
        // Fechar conexões do banco
        await closeDatabaseConnection();
        
        console.log('✅ Graceful shutdown concluído');
        process.exit(0);
      });
    };

    // Handlers para graceful shutdown
    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

  } catch (error) {
    console.error('❌ Erro ao inicializar servidor:', error);
    process.exit(1);
  }
}

// Inicializar servidor
startServer();
