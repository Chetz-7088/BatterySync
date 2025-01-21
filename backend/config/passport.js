const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your-secret-key', // Change this in production
};

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
  // Find user by JWT payload (use your own database logic here)
  User.findById(jwt_payload.id, (err, user) => {
    if (err) return done(err, false);
    if (user) return done(null, user);
    else return done(null, false);
  });
}));
