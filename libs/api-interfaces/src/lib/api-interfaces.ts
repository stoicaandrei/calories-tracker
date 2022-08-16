export interface Message {
  message: string;
}

export enum UserRole {
  admin = 'admin',
}
export interface User {
  _id: string;
  email: string;
  password: string;
  roles: UserRole[];

  caloriesGoal: number;
}

export interface FoodEntry {
  _id: string;
  userId: string;
  timestamp: Date;
  name: string;
  calories: number;
  price: number;
}
