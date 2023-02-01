import { NextFunction, Request, Response } from 'express';

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).json({ message: 'not loggedin' });
  }
};

export const isNotLoggedIn = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(403).json({ message: 'already loggedin' });
  }
};
