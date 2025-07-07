import { ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';

type Schemas = {
  body?: ZodSchema;
  params?: ZodSchema;
  query?: ZodSchema;
};

export const validateRequest = (schemas: Schemas) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (schemas.params) {
      const result = schemas.params.safeParse(req.params);
      if (!result.success) throw result.error;
      res.locals.params = result.data;
    }

    if (schemas.body) {
      const result = schemas.body.safeParse(req.body);
      if (!result.success) throw result.error;
      res.locals.body = result.data;
    }

    if (schemas.query) {
      const result = schemas.query.safeParse(req.query);
      if (!result.success) throw result.error;
      res.locals.query = result.data;
    }

    next();
  } catch (error) {
    return res.status(400).json({ error: (error as any).flatten?.() || error });
  }
};