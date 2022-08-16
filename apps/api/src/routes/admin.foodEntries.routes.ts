import { FoodEntryModel } from '@models';
import { isAdmin, checkInputErrors } from '@middlewares';
import { Router } from 'express';
import { body } from 'express-validator';

const adminFoodEntriesRouter = Router();

adminFoodEntriesRouter.get('/', isAdmin, async (req, res) => {
  const entries = await FoodEntryModel.find();

  res.send(entries);
});

adminFoodEntriesRouter.post(
  '/',
  isAdmin,
  body('userId').isMongoId(),
  body('timestamp').isISO8601(),
  body('name').isLength({ min: 1 }),
  body('calories').isFloat({ min: 0 }),
  body('price').isFloat({ min: 0 }),
  checkInputErrors,
  async (req, res) => {
    const { userId, timestamp, name, calories, price } = req.body;

    const entry = await FoodEntryModel.create({
      userId,
      timestamp,
      name,
      calories,
      price,
    });

    res.send(entry);
  }
);

adminFoodEntriesRouter.put(
  '/:id',
  isAdmin,
  body('userId').isMongoId(),
  body('timestamp').isISO8601(),
  body('name').isLength({ min: 1 }),
  body('calories').isFloat({ min: 0 }),
  body('price').isFloat({ min: 0 }),
  checkInputErrors,
  async (req, res) => {
    const { id } = req.params;
    const { userId, timestamp, name, calories, price } = req.body;

    const entry = await FoodEntryModel.findByIdAndUpdate(
      id,
      {
        userId,
        timestamp,
        name,
        calories,
        price,
      },
      { new: true }
    );

    res.send(entry);
  }
);

adminFoodEntriesRouter.delete('/:id', isAdmin, async (req, res) => {
  const { id } = req.params;

  await FoodEntryModel.findByIdAndDelete(id);

  res.send({ message: 'Entry deleted' });
});

export { adminFoodEntriesRouter };
