const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  Models = require("./models.js"),
  passportJWT = require("passport-jwt");

let Users = Models.User,
  JWTStrategy = passportJWT.Strategy,
  ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new LocalStrategy /* passport strategy that takes a username and password from the
        req body and uses Mongoose to check the db for a user with the same username*/(
    {
      usernameField: "Username",
      passwordField: "Password"
    },
    async (username, password, callback) => {
      console.log(`${username} ${password}`);
      await Users.findOne({ Username: username })
        .then((user) => {
          if (!user) {
            console.log("Incorrect username");
            return callback(null, false, {
              message: "Incorrect username or password."
            });
          }
          console.log("Finished");
          return callback(null, user);
        })
        .catch((error) => {
          if (error) {
            console.error(error);
            return callback(error);
          }
        });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // jwt is extracted from header of HTTP req
      secretOrKey: "your_jwt_secret" // "secret" key to verify the signature of the JWT
    },
    async (jwtPayload, callback) => {
      return await Users.findById(jwtPayload._id)
        .then((user) => {
          return callback(null, user);
        })
        .catch((error) => {
          return callback(error);
        });
    }
  )
);
