import mongoose from 'mongoose';

export const connectDb = () => {
  mongoose
    .connect('mongodb://localhost:27017/calories-tracker')
    .then(() => {
      console.log('connected to mongodb');
    })
    .catch((err) => {
      console.log(err);
    });
};
