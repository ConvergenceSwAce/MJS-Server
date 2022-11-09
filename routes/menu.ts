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
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }
    const menu: Menu = req.body;
    switch (req.body.cafeteria) {
      case 0:
        Menu0.create(menu);
        break;
      case 10:
        Menu10.create(menu);
        break;
      case 11:
        Menu11.create(menu);
        break;
      case 12:
        Menu12.create(menu);
        break;
    }
    res.send('ok');
  },
);

export default router;
