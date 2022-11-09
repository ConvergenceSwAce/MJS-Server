import { Request, Response, Router } from 'express';
import { check, validationResult } from 'express-validator';
import { Menu } from '../interfaces/menu';
import Menu0 from '../models/menu0';
import Menu10 from '../models/menu10';
import Menu11 from '../models/menu11';
import Menu12 from '../models/menu12';

const router = Router();

// 식단 입력
router.post(
  '/',
  [
    check('date').notEmpty().toDate(),
    check('day').notEmpty(),
    check('cafeteria').notEmpty().toInt(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }
    const menu: Menu = req.body;
    try {
      switch (req.body.cafeteria) {
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
    } catch (error: unknown) {
      console.error(error);
      return res.status(500).json('error')
    }
    res.send('ok');
  },
);

// 식단 수정
router.patch('/', [
  check('_id').notEmpty(),
  check('cafeteria').notEmpty().toInt(),
], async (req: Request, res: Response) => {
  const { _id, cafeteria, ...menu } = req.body;
  try {
    switch (cafeteria) {
      case 0:
        const exMenu0 = await Menu0.findByIdAndUpdate(_id, menu);
        if (!exMenu0) throw new Error('식단 정보가 없습니다.')
        break;
      case 10:
        const exMenu10 = await Menu0.findByIdAndUpdate(_id, menu);
        if (!exMenu10) throw new Error('식단 정보가 없습니다.')
        break;
      case 11:
        const exMenu11 = await Menu0.findByIdAndUpdate(_id, menu);
        if (!exMenu11) throw new Error('식단 정보가 없습니다.')
        break;
      case 12:
        const exMenu12 = await Menu0.findByIdAndUpdate(_id, menu);
        if (!exMenu12) throw new Error('식단 정보가 없습니다.')
        break;
    }
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).json('error')
  }
  
  res.send('ok');
});

export default router;
