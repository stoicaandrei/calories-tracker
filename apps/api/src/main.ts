import express from 'express';
import cookieParser from 'cookie-parser';
import { connectDb } from './config/database.config';
import routes from './routes';

connectDb();

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use('/api', routes);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
