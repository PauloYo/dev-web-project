import { Router } from 'express';
import { asyncHandler } from '../../middleware/errorHandler';
import { validateRequest } from '../../middleware/validateRequest';
import { CreateJogoListaSchema } from '../../models/jogoLista.model';
import { JogoListaController } from '../../controllers/jogoLista.controller';

const router = Router();

// Adicionar jogo à lista
router.post(
  '/',
  validateRequest({
    body: CreateJogoListaSchema
  }),
  asyncHandler(JogoListaController.create)
);

// Listar relações
router.get(
  '/',
  asyncHandler(JogoListaController.getAll)
);

// Remover jogo da lista
router.delete(
  '/',
  validateRequest({
    body: CreateJogoListaSchema
  }),
  asyncHandler(JogoListaController.delete)
);

export default router;
