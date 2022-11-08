import 'dotenv/config';
import express, { Express } from 'express';
import mongoose from 'mongoose';

const app: Express = express();
const { PORT, MONGODB_URI } = process.env;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MongoDB 연결
mongoose
  .connect(`${MONGODB_URI}`)
  .then(() => console.log('- Successfully connected to MongoDB'))
  .catch((error: unknown) => console.error(error));

app.listen(PORT, () => {
  console.log(`- Server is running at https://localhost:${PORT}`);
});
