import { Request, Response, NextFunction } from 'express';

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);
  
  // Erro de validação Zod
  if (err?.issues && Array.isArray(err.issues)) {
    const messages = err.issues.map((issue: any) => 
      `${issue.path.join('.')}: ${issue.message}`
    );
    return res.status(400).json({ error: messages.join(', ') });
  }
  
  // Erro de violação de chave única (duplicação)
  if (err.code === '23505') {
    return res.status(400).json({ error: 'Dados duplicados' });
  }
  
  // Erro de violação de chave estrangeira
  if (err.code === '23503') {
    return res.status(400).json({ error: 'Referência não encontrada' });
  }
  
  // Erro genérico
  res.status(500).json({ error: err.message || 'Erro interno do servidor' });
};
