import { NextFunction, Request, Response, Router } from 'express';
import { body, query, validationResult } from 'express-validator';
import passport from 'passport';
import bcrypt from 'bcrypt';
import Manager from '../models/manager';
import { ManagerDto } from '../interfaces/managerDto';
import { isLoggedIn } from '../middlewares/auth';

const router = Router();

// 비밀번호 중복 확인
router.get(
  '/check',
  query('email').notEmpty().isEmail(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }
    const { email } = req.query;
    try {
      const result = await Manager.findOne({
        email,
      });
      if (result) return res.status(500).json({ message: 'already exists' });
      return res.json({ message: 'success' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Sever Error' });
    }
  },
);

// 회원가입
router.post(
  '/register',
  [
    body('name').notEmpty().isString(),
    body('company').notEmpty().isString(),
    body('cafeteria').notEmpty().toInt(),
    body('phone').notEmpty().isString(),
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().isString(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }
    const manager: ManagerDto = req.body;
    try {
      const hash = await bcrypt.hash(manager.password, 12);
      await Manager.create({ ...manager, password: hash });
      return res.json({ message: 'success' });
    } catch (error: unknown) {
      console.error(error);
      return res.status(500).json({ message: 'Sever Error' });
    }
  },
);

// 로그인
router.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (authError, manager, info) => {
      if (authError) {
        return next(authError);
      }
      if (!manager) {
        return res.status(500).json({ message: 'login failed' });
      }
      return req.login(manager, (loginError) => {
        if (loginError) {
          console.log(loginError);
          return next(loginError);
        }
        return res.json({ message: 'success' });
      });
    })(req, res, next);
  },
);

// 로그아웃
router.post('/logout', isLoggedIn, async (req: Request, res: Response) => {
  try {
    req.logout(() => {
      req.session.destroy(() => {
        return res.json({ message: 'success' });
      });
    });
  } catch (error) {
    return res.status(500).json({ message: 'Sever Error' });
  }
});

// 내 정보 수정
router.patch('/edit', isLoggedIn, async (req: Request, res: Response) => {
  const _id = req.user!._id;
  const updatedManager: Partial<ManagerDto> = req.body;
  try {
    const exManager = await Manager.findByIdAndUpdate(_id, updatedManager);
    if (!exManager) throw new Error();
    return res.json({ message: 'success' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Sever Error' });
  }
});

export default router;
