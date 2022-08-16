import { User } from '@calories-tracker/api-interfaces';
import { Schema, model } from 'mongoose';

const schema = new Schema<User>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  roles: { type: [String], default: [], enum: ['admin'] },

  caloriesGoal: { type: Number, default: 2100 },
});

export const UserModel = model<User>('User', schema);
