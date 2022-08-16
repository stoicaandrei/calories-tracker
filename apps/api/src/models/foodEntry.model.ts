import { FoodEntry } from '@calories-tracker/api-interfaces';
import { Schema, model } from 'mongoose';

const schema = new Schema<FoodEntry>({
  userId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  name: { type: String, required: true },
  calories: { type: Number, required: true },
  price: { type: Number, required: true },
});

export const FoodEntryModel = model<FoodEntry>('FoodEntry', schema);
