import { Router } from 'express';
import { asyncHandler } from '../../middleware/errorHandler';
import { validateRequest } from '../../middleware/validateRequest';
import { CreateCategoriaJogoSchema } from '../../models/categoriaJogo.model';
import { JogoCategoriaController } from '../../controllers/jogoCategoria.controller';
import { IdParamSchema } from '../../models/validation.param.model';

const router = Router();

router.post(
  '/',
  validateRequest({
    body: CreateCategoriaJogoSchema
  }),
  asyncHandler(JogoCategoriaController.create)
);

router.get(
  '/',
  asyncHandler(JogoCategoriaController.getAll)
);

//router.get(
//  '/jogo/:fk_Jogo_id',
//  validateRequest({
//    params: IdParamSchema
//  }),
//  asyncHandler(JogoCategoriaController.getByJogoId)
//)

router.delete(
  '/',
  validateRequest({
    body: CreateCategoriaJogoSchema
  }),
  asyncHandler(JogoCategoriaController.delete)
);

export default router;
