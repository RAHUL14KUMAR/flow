const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User =require("./modals/userSchema");

const passport = require("passport");
const dotenv=require("dotenv");
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {  
      done(null, profile);
      try{
        let existingUser = await User.findOne({email:profile.emails[0].value});
         if (existingUser) {
           return done(null, existingUser);
         }
         console.log("creating new User");
         await User.create({username:profile.displayName,profilePicture:profile.photos[0].value,email:profile.emails[0].value})
         return done(null, profile);
      }catch(error){
        return done(error, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});