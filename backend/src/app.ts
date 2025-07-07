import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import setupRoutes from './routes';
import { errorHandler } from './middleware/errorHandler';

// Carrega variáveis de ambiente
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Configuração de rotas
setupRoutes(app);

// Middleware de tratamento de erros (deve ser o último)
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
