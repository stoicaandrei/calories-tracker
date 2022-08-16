import { Router } from 'express';
import { authRouter } from './auth.routes';
import { foodEntriesRouter } from './foodEntries.routes';
import { adminFoodEntriesRouter } from './admin.foodEntries.routes';
import { adminUsersRoutes } from './admin.users.routes';

const routes = Router();

routes.use('/auth', authRouter);
routes.use('/food_entries', foodEntriesRouter);
routes.use('/admin/food_entries', adminFoodEntriesRouter);
routes.use('/admin/users', adminUsersRoutes);

export default routes;
