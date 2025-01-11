import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import AuthService from "../services/AuthService";
import NotVerifiedError from "../errors/NotVerifiedError";

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error("No JWT secret");
}

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await AuthService.authenticateAndGetUser(username, password);

      if (!user) {
        return done(null, false);
      }

      if (!user.verified) {
        return done(new NotVerifiedError(), false);
      }

      return done(null, {
        _id: user._id,
        username: user.username,
        email: user.email,
      });
    } catch (error) {
      return done(error, false);
    }
  })
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    },
    async (payload, done) => {
      try {
        const user = await AuthService.getUser(payload._id);

        if (!user) {
          return done(null, false);
        }

        return done(null, {
          _id: user._id,
          username: user.username,
          email: user.email,
        });
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
