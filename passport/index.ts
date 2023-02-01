import passport from 'passport';
import { local } from './local';
import Manager from '../models/manager';

export default function () {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    Manager.findOne({
      where: {
        _id: id,
      },
    })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });
  local();
}
