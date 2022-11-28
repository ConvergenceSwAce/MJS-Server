import 'dotenv/config';
import express, { Express } from 'express';
import mongoose from 'mongoose';
import menuRouter from './routes/menu';
import noticeRouter from './routes/notice';

const app: Express = express();
const { PORT, MONGODB_URI } = process.env;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MongoDB 연결
mongoose
  .connect(`${MONGODB_URI}`)
  .then(() => console.log('- Connected to MongoDB'))
  .catch((error: unknown) => console.error(error));

// 라우터
app.use('/menu', menuRouter);
app.use('/notice', noticeRouter);

app.listen(PORT, () => {
  console.log(`- Server is running at http://localhost:${PORT}`);
});
