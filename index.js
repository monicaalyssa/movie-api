// variable declaration
const bodyParser = require("body-parser"),
  express = require("express"),
  path = require("path"),
  fs = require("fs"),
  morgan = require("morgan"),
  uuid = require("uuid"),
  mongoose = require("mongoose"),
  Models = require("./models.js"),
  cors = require("cors");

const app = express();
const Movies = Models.Movie;
const Users = Models.User;
const { check, validationResult } = require("express-validator");

/* mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); */

mongoose.connect( process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// creates a writable stream (data is written into a file, in this case log.txt) using the fs module
const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a"}); // the a flag opens the file for writing & positions the stream at the end of the file

// lines for body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// imports auth.js
let auth = require("./auth")(app);

// imports passport.js
const passport = require("passport");
require("./passport");

// sets up the logger using morgan to log "combined" (specific data that will be logged) into the accessLogStream
app.use(morgan("combined", { stream: accessLogStream }));

// takes specific pathname "/" requests from the user and uses express to route them to any file located in the public folder
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/documentation.html"));
});

// gets all movies
app.get("/movies", (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// gets a specific movie
app.get("/movies/:Title", (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then((movie) => {
      if (movie) {
        res.status(201).json(movie);
      } else {
        res.status(400).send(req.params.Title + " not found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// gets a specific genre
app.get("/genre/:Genre", (req, res) => {
  Movies.findOne({ "Genre.Name": req.params.Genre })
    .then((genre) => {
      if (genre) {
        res.json(genre.Genre);
      } else {
        res.send(req.params.Genre + " genre not found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// gets a specific director
app.get("/directors/:Director", (req, res) => {
  Movies.findOne({ "Director.Name": req.params.Director })
    .then((director) => {
      if (director) {
        res.json(director.Director);
      } else {
        res.send(req.params.Director + " not found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// gets all the users
app.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Users.find(
      {},
      { _id: 0, Username: 1, Favorites: 1 }) /* {} fetches all users, and _id: 0 exludes the id from the res,
        and using the number 1 includes any of the related fields */
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        res.status(500).send("Error: " + err);
      });
  }
);

// gets a user by username
app.get(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Users.findOne({ Username: req.params.Username })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// adds a new user
app.post(
  "/users",
  [ check("Username", "Username is required").isLength({ min: 5 }), // minimum value of 5 characters are only allowed
    check("Username", "Username contains non alphanumeric characters - not allowed.").isAlphanumeric(),
    check("Password", "Password is required").not().isEmpty(), // chained methods meaning, is not empty
    check("Email", "Email does not appear to be valid").isEmail()
  ],
  async (req, res) => {
    let errors = validationResult(req); // check the validation object for errors
    if (!errors.isEmpty()) { // if errors variable comes back not empty, let the user know which errors, and the rest of the code will not execute
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    await Users.findOne({ Username: req.body.Username }) // findOne checks if a user with the username provided already exists
      .then((user) => {
        if (user) {
          // if the user does exist then it lets the client know it already exists
          return res.status(400).send(req.body.Username + " already exists");
        } else {
          // if the user doesn't exist the create command is used on the model to execute this operation on MongoDB
          Users.create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
            .then((user) => {
              res.status(201).json(user);
            }) /* after the document is created a callback function takes the document as a parameter, 
      sending back a response to the client containing a status code and the document */
            .catch((error) => {
              // error function in case your command runs an error
              console.error(error);
              res.status(500).send("Error" + error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error" + error);
      });
  }
);

// updates a user with a certain username
app.put(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => { /* condition to checek the username in the request body matches the one in the parameter
      so users can ONLY update their information and not others */
    if (req.user.Username !== req.params.Username) {
      // req.user.Username is the username extracted from the JWT payload
      return res.status(400).send("Permission denied");
    }

    await Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $set: { /* $set specifies which fields in the user document you're updating, the new values are 
            extracted from the reqest body */
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        }
      },
      { new: true }) /* this line makes sure the updated document is returned, it specifies that 
        in the proceeding callback you want the document that was just udpated */
      .then((updatedUser) => {
        // the then() method accepts the returned document
        if (updatedUser) {
          res.send(updatedUser.Username + "'s account has been updated");
        } else {
          res.send(updatedUser.Username + "'s account has not be updated");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error:" + err);
      });
  }
);

// adds a movie to a user's list of favorites
app.post(
  "/users/:Username/movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.Username !== req.params.Username) {
      return res.status(400).send("Permission denied");
    }

    try {
      const favMovie = await Movies.findById(req.params.MovieID);
      if (!favMovie) {
        return res.status(404).send("Movie does not exist");
      }

      const updatedUser = await Users.findOneAndUpdate(
        { Username: req.params.Username },
        {
          $push: { Favorites: req.params.MovieID }
        },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).send(req.params.Username + " does not exist");
      }

      res.json(
        favMovie.Title +
          " has been added to " +
          req.params.Username +
          "'s favorites"
      );
    } catch (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    }
  }
);

// delete a movie from users favorites
app.delete(
  "/users/:Username/movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.Username !== req.params.Username) {
      return res.status(400).send("Permission denied");
    }

    try {
      // check if the movie exists, if it does assign it to a variable
      const favMovie = await Movies.findById(req.params.MovieID);
      if (!favMovie) {
        return res.status(404).send("Movie does not exist");
      }

      // check if the user exists, if it does pull movie from favorites
      const updatedUser = await Users.findOneAndUpdate(
        { Username: req.params.Username },
        {
          $pull: { Favorites: req.params.MovieID }
        },
        { new: true }
      );

      // if user not found let the client know
      if (!updatedUser) {
        return res.status(404).send(req.params.Username + " does not exist");
      }

      // lets the user know the movie has been deleted from their favorites
      res.json(
        favMovie.Title +
          " has been deleted from " +
          req.params.Username +
          "'s favorites"
      );
    } catch (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    }
  }
);

// deletes a user by username
app.delete(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.Username !== req.params.Username) {
      return res.status(400).send("Permission denied");
    }

    await Users.findOneAndDelete({ Username: req.params.Username })
      .then((user) => {
        if (!user) {
          res.status(400).send(req.params.Username + " was not found");
        } else {
          res.status(200).send(req.params.Username + " has been deleted");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// catches any errors regarding res responses to the user
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Webpage not fonud");
});

const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
  console.log("Listening on Port " + port);
});
