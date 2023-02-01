import 'dotenv/config';
import express, { Express, NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import menuRouter from './routes/menu';
import noticeRouter from './routes/notice';
import managerRouter from './routes/manager';
import passportConfig from './passport';

const app: Express = express();
const { PORT, MONGODB_URI } = process.env;

passportConfig();
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser('test'));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: 'test',
    cookie: {
      httpOnly: true,
      secure: false,
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

// MongoDB 연결
mongoose
  .connect(`${MONGODB_URI}`)
  .then(() => console.log('- Connected to MongoDB'))
  .catch((error: unknown) => console.error(error));

// 라우터
app.use('/menu', menuRouter);
app.use('/notice', noticeRouter);
app.use('/manager', managerRouter);

// 에러
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: 'Server Error' });
});

app.listen(PORT, () => {
  console.log(`- Server is running at http://localhost:${PORT}`);
});
