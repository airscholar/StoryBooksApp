import { UserInterface } from "./../models/User.model";
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
import passport from "passport";
import GoogleOauth20 from "passport-google-oauth20";
import winston from "winston";
import User from "../models/User.model";
import env from "./env.config";

type userType = (UserInterface | Express.User) & { _id?: string };

passport.serializeUser((user: userType, done) => {
  User.findById(user._id).then(user => {
    if (user) {
      try {
        done(null, user._id);
      } catch (err) {
        winston.error(err);
      }
    }
  });
});

passport.deserializeUser((_id, done) => {
  User.findById(_id).then(user => {
    done(null, new User(user));
  });
});

const GoogleStrategy = GoogleOauth20.Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
      proxy: true,
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({
        googleId: profile.id,
      })
        .then((dbUserRecord: UserInterface) => {
          if (!dbUserRecord) {
            const newUser = new User({
              googleId: profile.id,
              first_name: profile.name ? profile.name.givenName : "Default",
              last_name: profile.name ? profile.name.familyName : "Default",
              display_name: profile.displayName,
              image: profile.photos ? profile.photos[0].value : "default.png",
            });
            newUser.save().then((newUser: UserInterface) => {
              done(null, new User(newUser));
            });
          }
          done(null, new User(dbUserRecord));
        })
        .catch(err => {
          winston.error(err);
        });
    }
  )
);

export default passport;
