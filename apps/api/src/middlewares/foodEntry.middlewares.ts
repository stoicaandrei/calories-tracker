import { RequestHandler } from 'express';
import { FoodEntryModel } from '../models/foodEntry.model';
import { isAuth } from './auth.middlewares';

export const ownsFoodEntry: RequestHandler = async (req, res, next) => {
  isAuth(req, res, async () => {
    const entry = await FoodEntryModel.findById(req.params.id, 'userId');

    if (!entry) {
      return res.status(404).send({
        message: 'Entry not found!',
      });
    }

    if (entry.userId != req.userId) {
      return res.status(401).send({
        message: 'Not authorized!',
      });
    }

    next();
  });
};
