import passport from 'passport';
import bcrypt from 'bcrypt';
import PassportLocal from 'passport-local';
import Manager from '../models/manager';

const LocalStrategy = PassportLocal.Strategy;

export const local = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email: string, password: string, done: any) => {
        try {
          const exManager = await Manager.findOne({
            email,
          });
          if (exManager) {
            const result = await bcrypt.compare(password, exManager.password);
            if (result) {
              done(null, exManager);
            } else {
              done(null, false);
            }
          } else {
            done(null, false);
          }
        } catch (error: unknown) {
          console.error(error);
          done(error);
        }
      },
    ),
  );
};
