import { UserModel } from '@models';
import { isAdmin } from '@middlewares';
import { Router } from 'express';

const adminUsersRoutes = Router();

adminUsersRoutes.get('/', isAdmin, async (req, res) => {
  const entries = await UserModel.find();

  res.send(entries);
});

export { adminUsersRoutes };
