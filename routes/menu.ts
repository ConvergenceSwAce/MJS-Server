import { Request, Response, Router } from 'express';
import { body, query, validationResult } from 'express-validator';
import { MenuDto } from '../interfaces/menuDto';
import Menu0 from '../models/menu0';
import Menu10 from '../models/menu10';
import Menu11 from '../models/menu11';
import Menu12 from '../models/menu12';

const router = Router();

// 식단 조회
router.get(
  '/',
  [
    query('cafeteria').notEmpty().toInt(),
    query('start').notEmpty().toDate(),
    query('end').notEmpty().toDate(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }
    const { cafeteria, start, end } = req.query;
    try {
      switch (parseInt(cafeteria as string, 10)) {
        case 0:
          const menu0Arr = await Menu0.find({
            date: { $gte: start, $lte: end },
          });
          return res.json(menu0Arr);
        case 10:
          const menu10Arr = await Menu10.find({
            date: { $gte: start, $lte: end },
          });
          return res.json(menu10Arr);
        case 11:
          const menu11Arr = await Menu11.find({
            date: { $gte: start, $lte: end },
          });
          return res.json(menu11Arr);
        case 12:
          const menu12Arr = await Menu12.find({
            date: { $gte: start, $lte: end },
          });
          return res.json(menu12Arr);
      }
    } catch (error: unknown) {
      console.error(error);
      return res.status(500).json({ message: 'Sever Error' });
    }
  },
);

// 식단 입력
router.post(
  '/',
  [
    body('date').notEmpty().toDate(),
    body('day').notEmpty().isString(),
    body('cafeteria').notEmpty().toInt(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }
    try {
      const menu: MenuDto = req.body;
      switch (menu.cafeteria) {
        case 0:
          await Menu0.create(menu);
          break;
        case 10:
          await Menu10.create(menu);
          break;
        case 11:
          await Menu11.create(menu);
          break;
        case 12:
          await Menu12.create(menu);
          break;
      }
      return res.json({ message: 'success' });
    } catch (error: unknown) {
      console.error(error);
      return res.status(500).json({ message: 'Sever Error' });
    }
  },
);

// 식단 수정
router.patch(
  '/',
  [body('_id').notEmpty().isMongoId(), body('cafeteria').notEmpty().toInt()],
  async (req: Request, res: Response) => {
    const { _id, ...updatedMenu } = req.body;
    try {
      switch (updatedMenu.cafeteria) {
        case 0:
          const exMenu0 = await Menu0.findByIdAndUpdate(_id, updatedMenu);
          if (!exMenu0) throw new Error('식단 정보가 없습니다.');
          break;
        case 10:
          const exMenu10 = await Menu0.findByIdAndUpdate(_id, updatedMenu);
          if (!exMenu10) throw new Error('식단 정보가 없습니다.');
          break;
        case 11:
          const exMenu11 = await Menu0.findByIdAndUpdate(_id, updatedMenu);
          if (!exMenu11) throw new Error('식단 정보가 없습니다.');
          break;
        case 12:
          const exMenu12 = await Menu0.findByIdAndUpdate(_id, updatedMenu);
          if (!exMenu12) throw new Error('식단 정보가 없습니다.');
          break;
      }
      return res.json({ message: 'success' });
    } catch (error: unknown) {
      console.error(error);
      return res.status(500).json({ message: 'Sever Error' });
    }
  },
);

export default router;
