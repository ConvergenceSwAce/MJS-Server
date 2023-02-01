import { Request, Response, Router } from 'express';
import { body, query, validationResult } from 'express-validator';
import { NoticeDto } from '../interfaces/noticeDto';
import Notice from '../models/notice';

const router = Router();

// 전체 공지사항 조회
router.get('/all', async (req: Request, res: Response) => {
  try {
    const notice = await Notice.find();
    return res.json(notice);
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).json({ message: 'Sever Error' });
  }
});

// 공지사항 조회
router.get(
  '/',
  [query('_id').notEmpty()],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }
    const { _id } = req.query;
    try {
      const notice = await Notice.find({
        _id,
      });
      return res.json(notice);
    } catch (error: unknown) {
      console.error(error);
      return res.status(500).json({ message: 'Sever Error' });
    }
  },
);

// 공지사항 입력
router.post(
  '/',
  [body('title').notEmpty(), body('body').notEmpty()],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }
    const notice: NoticeDto = req.body;
    try {
      await Notice.create(notice);
      return res.json({ message: 'success' });
    } catch (error: unknown) {
      console.error(error);
      return res.status(500).json({ message: 'Sever Error' });
    }
  },
);

// 공지사항 수정
router.patch(
  '/',
  [body('_id').notEmpty().isMongoId()],
  async (req: Request, res: Response) => {
    const { _id, ...info } = req.body;
    try {
      const exNotice = await Notice.findByIdAndUpdate(_id, info);
      if (!exNotice) throw new Error('공지사항 정보가 없습니다.');
      return res.json({ message: 'success' });
    } catch (error: unknown) {
      console.error(error);
      return res.status(500).json({ message: 'Sever Error' });
    }
  },
);

// 공지사항 삭제
router.delete(
  '/',
  [query('_id').notEmpty().isMongoId()],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }
    const { _id } = req.query;
    try {
      await Notice.deleteOne({
        _id,
      });
      return res.json({ message: 'success' });
    } catch (error: unknown) {
      console.error(error);
      return res.status(500).json({ message: 'Sever Error' });
    }
  },
);

export default router;
