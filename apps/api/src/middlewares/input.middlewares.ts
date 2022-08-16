import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';

export const checkInputErrors: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};
