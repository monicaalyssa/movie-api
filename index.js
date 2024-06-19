// variable declaration
const bodyParser = require("body-parser");
const express = require("express"),
  path = require("path"),
  fs = require("fs"),
  morgan = require("morgan"),
  uuid = require("uuid"),
  mongoose = require("mongoose"),
  Models = require("./models.js");

const app = express();
const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// creates a writable stream (data is written into a file, in this case log.txt) using the fs module
const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a"
}); // the a flag opens the file for writing & positions the stream at the end of the file

let movies = [
  {
    Title: "Missing 411: The UFO Connection",
    Genre: {
      Name: "Mystery",
      Description:
        "Mystery involves a mysterious death or a crime to be solved."
    },
    Description:
      "David Paulides investigates cases of elk hunters who've gone missing from specific regions of North America, and explores the theory that there could be a connection between these disappearances and sightings of UFOs.",
    Director: {
      Name: "David Paulides",
      Bio: "David Paulides is a former police officer who is now an investigator and writer known primarly for his books dedicated to proving Bigfoot and the investigation of cases of people who go missing in national parks and wilderness areas under mysterious circumstances."
    },
    ImageURL:
      "https://play-lh.googleusercontent.com/-TiIUCEbFD3cgf-t4kiJLHN-0Gd7L-U5ZDdencoTbuEYnNhUxfA1Yx-6SVyBLgBGqja62ZYxW1HO16IL6yQ",
    Featured: false
  },
  {
    Title: "The Ritual",
    Genre: {
      Name: "Horror",
      Description:
        "Horror is intended to scare, shock, and thrill its audience."
    },
    Description:
      "A group of old college friends reunite for a trip to a most dangerous country in Europe - Sweden, encountering a menacing presence there stalking them.",
    Director: {
      Name: "David Bruckner",
      Bio: "David Buckner is an american film director.",
      Birthdate: "1977-01-01"
    },
    ImageURL:
      "https://m.media-amazon.com/images/M/MV5BMjAzMzAyMDI4Ml5BMl5BanBnXkFtZTgwODMwOTY2NDM@._V1_.jpg",
    Featured: false
  },
  {
    Title: "Divergent",
    Genre: {
      Name: "Action",
      Description:
        "Action focuses on the protagonist's sacrifice for life and death and generates excitement."
    },
    Description:
      "A dystopian science fiction movie that takes place in an isolated city-state, where it is walled off from the rest of the world where no one seems to know what is happening outside of it. Almost all of society is spilt into five factions, each of which values certain human traits above all others. As each person enters adulthood, he or she must choose a faction and commit to it for life.",
    Director: {
      Name: "Neil Burger",
      Bio: "Neil Burger is an American film and television director, writer, and producer.",
      Birthdate: "1963-01-01"
    },
    ImageURL:
      "https://www.movieposters.com/cdn/shop/files/divergent_2f948395_480x.progressive.jpg?v=1697572173",
    Featured: false
  },
  {
    Title: "The Maze Runner",
    Genre: {
      Name: "Action",
      Description:
        "Action focuses on the protagonist's sacrifice for life and death and generates excitement."
    },
    Description:
      "Thomas is deposited in a community of boys after his memory is erased, soon learning they're all trapped in a maze that will require him to join forces with fellow 'runners' for a shot at escape.",
    Director: {
      Name: "Wes Bell",
      Bio: "Wes ball is an American director known for Kingdom of the Planet of Apes (2024), and The Maze Runner trilogy.",
      Birthdate: "1980-10-28"
    },
    ImageURL:
      "https://m.media-amazon.com/images/M/MV5BMjUyNTA3MTAyM15BMl5BanBnXkFtZTgwOTEyMTkyMjE@._V1_.jpg",
    Featured: false
  },
  {
    Title: "How It Ends",
    Genre: {
      Name: "Action",
      Description:
        "Action focuses on the protagonist's sacrifice for life and death and generates excitement."
    },
    Description:
      "In the midst of an apocalypse, a man struggles to reach his pregnant fiancé, who is thousands of miles away.",
    Director: {
      Name: "David M. Rosenthal",
      Bio: "David Rosenthal is an American director who graduated from the American Film Institue. He is known for A Single Shot (2013), How It Ends (2018), and No Limit (2022).",
      Birthdate: "1969-03-23"
    },
    ImageURL:
      "https://m.media-amazon.com/images/M/MV5BMjMwOTg0MzU4MV5BMl5BanBnXkFtZTgwODk2NjY3NTM@._V1_.jpg",
    Featured: false
  },
  {
    Title: "Leave the World Behind",
    Genre: { Name: "Mystery", Description: "Mystery involves a mysterious death or a crime to be solved." },
    Description:
      "A family's getaway to a luxurious rental home takes an ominous turn when a cyberattack knocks out their devices, and two strangers appear at their door.",
    Director: {
      Name: "Sam Esmail",
      Bio: "Sam Esmail is an American producer and writer, with 5 film award wins.",
      Birthdate: "1977-09-17"
    },
    ImageURL:
      "https://m.media-amazon.com/images/M/MV5BMTUzM2I3NDEtMjNhYi00NTQ0LThmZDItZTMyMzM2MjJmZGRjXkEyXkFqcGdeQXVyMTU3NDU4MDg2._V1_.jpg",
    Featured: false
  },
  {
    Title: "Ponyo",
    Genre: {
      Name: "Fantasy",
      Description:
        "Fantasy stories are set in a faraway or fictional universe and are usually inspired by mythology and folklore."
    },
    Description:
      "A five-year-old boy develops a relationship with Ponyo, a young goldfish princess who longs to become a human after falling in love with him.",
    Director: {
      Name: "Hayao Miyazaki",
      Bio: "Hayao Miyazaki is one of Japan's greatest animation directors. The entertaining plots, compelling characters, and breathtaking visuals in his films have earned him international renown from critics as well as public recognition within Japan.",
      Birthdate: "1941-01-05"
    },
    ImageURL:
      "https://m.media-amazon.com/images/M/MV5BOTc3YmM3N2QtODZkMC00ZDE5LThjMTQtYTljN2Y1YTYwYWJkXkEyXkFqcGdeQXVyODEzNjM5OTQ@._V1_.jpg",
    Featured: false
  },
  {
    Title: "Maze Runner: The Scorch Trials",
    Genre: {
      Name: "Action",
      Description:
        "Action focuses on the protagonist's sacrifice for life and death and generates excitement."
    },
    Description:
      "After having escaped the Maze, the Gladers now face a new set of challenges on the open roads of a desolate landscape filled with unimaginable obstacles.",
    Director: {
      Name: "Wes Ball",
      Bio: "Wes ball is an American director known for Kingdom of the Planet of Apes (2024), and The Maze Runner trilogy.",
      Birthdate: "1980-10-28"
    },
    ImageURL:
      "https://m.media-amazon.com/images/M/MV5BMjE3MDU2NzQyMl5BMl5BanBnXkFtZTgwMzQxMDQ3NTE@._V1_FMjpg_UY3000_.jpg",
    Featured: false
  },
  {
    Title: "Avatar",
    Genre: {
      Name: "Action",
      Description:
        "Action focuses on the protagonist's sacrifice for life and death and generates excitement."
    },
    Description:
      "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
    Director: {
      Name: "James Cameron",
      Bio: "James Cameron is a Canadian filmmaker known for his expansive vision and innovative special-effects films, most notably Titanic (1997), and Avatar (2009).",
      Birthdate: "1954-08-16"
    },
    ImageURL:
      "https://static.wikia.nocookie.net/20thcenturyfox/images/6/6c/Avatar_Poster.jpg/revision/latest?cb=20221209033444",
    Featured: true
  },
  {
    Title: "I Am Legend",
    Genre: {
      Name: "Action",
      Description:
        "Action focuses on the protagonist's sacrifice for life and death and generates excitement."
    },
    Description:
      "Years after a plague kills most of humanity and transforms the rest into monsters, the sole survivor in New York City struggles valiantly to find a cure.",
    Director: {
      Name: "Francis Lawrence",
      Bio: "Francis Lawrence is an American filmmaker. He started directing over 60 music videos before he directed Constantine, I Am Legend, and Water for Elephants. He also directed The Hunger Games.",
      Birthdate: "1971-03-26"
    },
    ImageURL:
      "https://m.media-amazon.com/images/M/MV5BYTE1ZTBlYzgtNmMyNS00ZTQ2LWE4NjEtZjUxNDJkNTg2MzlhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
    Featured: false
  }
];

// lines for body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// sets up the logger using morgan to log "combined" (specific data that will be logged) into the accessLogStream
app.use(morgan("combined", { stream: accessLogStream }));

// takes specific pathname "/" requests from the user and uses express to route them to any file located in the public folder
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/documentation.html"));
});

app.post("/users", async (req, res) => {
  // adds a new user
  await Users.findOne({ Username: req.body.Username }) // findOne checks if a user with the username provided already exists
    .then((user) => {
      if (user) {
        // if the user does exist then it lets the client know it already exists
        return res.status(400).send(req.body.Username + "already exists");
      } else {
        // if the user doesn't exist the create command is used on the model to execute this operation on MongoDB
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        })
          .then((user) => {
            res.status(201).json(user);
          }) /* after the document is create a callback fun takes the document as a parameter, 
      sending back a response to the client containing a status code and the document called "user" */
          .catch((error) => {
            // error func in case your command runs an error
            console.log(error);
            res.status(500).send("Error" + error);
          });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Error" + error);
    });
});

app.get("/users", async (req, res) => { // gets all the users
  await Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.get("/users/:Username", async (req, res) => { // gets a user by username
  await Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.put("users/:Username", async (req, res) => { // updates all users with a certain username
  await Users.findOneAndUpdate({ Username: req.params.Username }, { $set: 
    { /* $set specifies which fields in the user document you're updating, the new values are extracted
      from the reqest body */
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  }, 
{ new: true }) /* this line makes sure the updated document is returned, it specifies that 
in the proceeding callback you want the document that was just udpated to be  */
.then((updatedUser) => { // the then() method accepts the returned document
  res.json(updatedUser); // sends the document as a JSON response to the client
})
.catch((err) => {
  console.log(err);
  res.status(500).send('Error:' + err);
})
});

app.post("users/:Username/movies/:MovieID", async (req, res) => { // adds a movie to a user's list of favorites
  await Users.findOneAndUpdate ({ Username: req.params.Username }, { 
    $push: { FavoriteMovies: req.params.MovieID } // $push is used to add a new movie ID to the end of the array
  },
{ new: true })
.then((updatedUser) => {
  res.json(updatedUser);
})
.catch((err) => {
  console.log(err);
  res.status(500).send('Error: ' + err);
})
})

app.delete("users/:Username", async (req, res) => { // deletes a user by username
  await Users.findOneAndRemove ({ Username: req.params.Username })
  .then ((user) => {
    if (!user) {
      res.status(400).send(req.params.Username + ' was not found');
    } else {
      res.status(200).send(req.params.Username + 'has been deleted');
    }
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send('Error: ' + err);
  })
})

// catches any errors regarding "res" responses to the user
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Webpage not fonud");
});

app.listen(8081, () => {
  console.log("My first Node test server is running on Port 8081");
});
