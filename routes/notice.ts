import { Request, Response, Router } from 'express';
import { check, validationResult } from 'express-validator';
import { Notice } from './../interfaces/notice';
import Notices from '../models/notice';

const router = Router();

// 전체 공지사항 조회
router.get('/all', async (req: Request, res: Response) => {
  try {
    const notice = await Notices.find();
    return res.json(notice);
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).json({ error: 'error' });
  }
});

// 공지사항 조회
router.get(
  '/',
  [check('_id').notEmpty()],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }
    try {
      const { _id } = req.query;
      const notice = await Notices.find({
        _id,
      });
      return res.json(notice);
    } catch (error: unknown) {
      console.error(error);
      return res.status(500).json({ error: 'error' });
    }
  },
);

// 공지사항 입력
router.post(
  '/',
  [check('title').notEmpty(), check('body').notEmpty()],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }
    try {
      const notice: Notice = req.body;
      await Notices.create(notice);
      return res.json({ message: 'success' });
    } catch (error: unknown) {
      console.error(error);
      return res.status(500).json({ error: 'error' });
    }
  },
);

// 공지사항 수정
router.patch(
  '/',
  [check('_id').notEmpty()],
  async (req: Request, res: Response) => {
    try {
      const { _id, ...info } = req.body;
      const exNotice = await Notices.findByIdAndUpdate(_id, info);
      if (!exNotice) throw new Error('공지사항 정보가 없습니다.');
      return res.json({ message: 'success' });
    } catch (error: unknown) {
      console.error(error);
      return res.status(500).json({ error: 'error' });
    }
  },
);

// 공지사항 삭제
router.delete(
  '/',
  [check('_id').notEmpty()],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }
    try {
      const { _id } = req.query;
      await Notices.deleteOne({
        _id,
      });
      return res.json({ message: 'success' });
    } catch (error: unknown) {
      console.error(error);
      return res.status(500).json({ error: 'error' });
    }
  },
);

export default router;
