// config/passport.js

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import 'dotenv/config';
import User from '../models/User.js';

// Configure Google Strategy
passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // The callback URL where Google sends the user after authentication
    callbackURL: '/api/auth/google/callback', 
    scope: ['profile', 'email'],
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        // User already exists, log them in
        return done(null, existingUser);
      }
      
      // Check if user exists with the email but without googleId
      let user = await User.findOne({ email: profile.emails[0].value });

      if (user) {
        // Link Google ID to existing user and save
        user.googleId = profile.id;
        await user.save();
      } else {
        // Create a new user
        user = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          avatarUrl: profile.photos[0].value,
          // Note: passwordHash is not required because googleId is present
        });
      }

      done(null, user);

    } catch (error) {
      done(error, null);
    }
  })
);

// Used to put user's ID into the session cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Used to get the user object from the ID stored in the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;