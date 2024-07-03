const jwtSecret = "your_jwt_secret"; // has to be the same key used in JWTStrategy

const jwt = require("jsonwebtoken"),
  passport = require("passport");

require("./passport"); // local passport file

let generateJWTToken = (user) => { // creates a JWT based on username and password
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, // username encoded in the JWT
    expiresIn: "7d", // specifies the token will expire in  7 days
    algorithm: "HS256" // algorithm used to encode the values of the JWT
  });
};

module.exports = (router) => {
  router.post("/login", (req, res) => { // endpoint for registered users to log in
    passport.authenticate("local", { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: "Invalid username or password",
          user: user
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token }); // shorthand for res.json({ user: user, token: token })
      });
    })(req, res);
  });
};
