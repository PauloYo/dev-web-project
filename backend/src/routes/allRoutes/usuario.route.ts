import { Router } from 'express';
import { asyncHandler } from '../../middleware/errorHandler';
import { validateRequest } from '../../middleware/validateRequest';
import { CreateUsuarioSchema } from '../../models/usuario.model';
import { IdParamSchema } from '../../models/validation.param.model';
import { UsuarioController } from '../../controllers/usuario.controller';
import { ImagemSchema } from '../../models/validation.body.model';

const router = Router();

router.post(
  '/',
  validateRequest({
    body: CreateUsuarioSchema
  }),
  asyncHandler(UsuarioController.create)
);

router.get(
  '/',
  asyncHandler(UsuarioController.getAll)
);

router.get(
  '/:id',
  validateRequest({
    params: IdParamSchema
  }),
  asyncHandler(UsuarioController.getById)
);

router.put(
  '/:id',
  validateRequest({
    params: IdParamSchema,
    body: CreateUsuarioSchema
  }),
  asyncHandler(UsuarioController.update)
);

router.patch(
  '/:id/imagem',
  validateRequest({
    params: IdParamSchema,
    body: ImagemSchema
  }),
  asyncHandler(UsuarioController.updateImagem)
);

router.patch(
  '/:id/descricao',
  validateRequest({
    params: IdParamSchema
  }),
  asyncHandler(UsuarioController.updateDescricao)
);

router.patch(
  '/:id/nome',
  validateRequest({
    params: IdParamSchema
  }),
  asyncHandler(UsuarioController.updateNome)
);

router.delete(
  '/:id',
  validateRequest({
    params: IdParamSchema
  }),
  asyncHandler(UsuarioController.delete)
);

export default router;
