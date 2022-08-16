import { FoodEntryModel } from '@models';
import { Router } from 'express';
import { isAuth, ownsFoodEntry, checkInputErrors } from '@middlewares';
import { body } from 'express-validator';

const foodEntriesRouter = Router();

foodEntriesRouter.get('/', isAuth, async (req, res) => {
  const entries = await FoodEntryModel.find(
    { userId: req.userId },
    '_id name calories price timestamp'
  );

  res.send(entries);
});

foodEntriesRouter.post(
  '/',
  isAuth,
  body('timestamp').isISO8601(),
  body('name').isLength({ min: 1 }),
  body('calories').isFloat({ min: 0 }),
  body('price').isFloat({ min: 0 }),
  checkInputErrors,
  async (req, res) => {
    const { timestamp, name, calories, price } = req.body;

    const entry = await FoodEntryModel.create({
      userId: req.userId,
      timestamp,
      name,
      calories,
      price,
    });

    res.send(entry);
  }
);

foodEntriesRouter.put(
  '/:id',
  ownsFoodEntry,
  body('timestamp').isISO8601(),
  body('name').isLength({ min: 1 }),
  body('calories').isFloat({ min: 0 }),
  body('price').isFloat({ min: 0 }),
  checkInputErrors,
  async (req, res) => {
    const { id } = req.params;
    const { timestamp, name, calories, price } = req.body;

    const entry = await FoodEntryModel.findByIdAndUpdate(
      id,
      {
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

foodEntriesRouter.delete('/:id', ownsFoodEntry, async (req, res) => {
  const { id } = req.params;

  await FoodEntryModel.findByIdAndDelete(id);

  res.send({ message: 'Entry deleted' });
});

export { foodEntriesRouter };
