import { Router } from 'express';
import { asyncHandler } from '../../middleware/errorHandler';
import { validateRequest } from '../../middleware/validateRequest';
import { CreateCategoriaJogoSchema } from '../../models/categoriaJogo.model';
import { CategoriaJogoController } from '../../controllers/categoriaJogo.controller';

const router = Router();

router.post(
  '/',
  validateRequest({
    body: CreateCategoriaJogoSchema
  }),
  asyncHandler(CategoriaJogoController.create)
);

router.get(
  '/',
  asyncHandler(CategoriaJogoController.getAll)
);

router.delete(
  '/',
  validateRequest({
    body: CreateCategoriaJogoSchema
  }),
  asyncHandler(CategoriaJogoController.delete)
);

export default router;
