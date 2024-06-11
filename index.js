// variable declaration
const bodyParser = require("body-parser");
const express = require("express"),
  path = require("path"),
  fs = require("fs"),
  morgan = require("morgan");
  uuid = require('uuid');
const app = express();

app.use(bodyParser.json());

// creates a writable stream (data is written into a file, in this case log.txt) using the fs module
const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a",
}); // the a flag opens the file for writing & positions the stream at the end of the file

let users = [
  {
    "name": "Kate",
    "favoriteMovies": ["Divergent"],
    "id": 1,
  },
  {
    "name": "James",
    "favoriteMovies": [],
    "id": 2,
  },
];

let movies = [
  {
    "Title": "Missing 411: The UFO Connection",
    "Genre": {
      "Name": "Mystery",
      "Description":
        "Mystery involves a mysterious death or a crime to be solved."
    },
    "Description":
      "David Paulides investigates cases of elk hunters who've gone missing from specific regions of North America, and explores the theory that there could be a connection between these disappearances and sightings of UFOs.",
    "Director": {
      "Name": "David Paulides",
      "Bio": "David Paulides is a former police officer who is now an investigator and writer known primarly for his books dedicated to proving Bigfoot and the investigation of cases of people who go missing in national parks and wilderness areas under mysterious circumstances.",
      "Birth Year": "N/A"
    },
    "ImageURL": "placeholder",
    "Featured": false
  },
  {
    "Title": "The Ritual",
    "Genre": {
      "Name": "",
      "Description": ""
    },
    "Description": "",
    "Director": {
      "Name": "David Bruckner",
      "Bio": "",
      "Birth Year": "",
      "Death Year": ""
    },
    "ImageURL": "placeholder",
    "Featured": false
  },
  {
    "Title": "Divergent",
    "Genre": {
      "Name": "",
      "Description":
        ""
    },
    "Description": "",
    "Director": {
      "Name": "Neil Burger",
      "Bio": "",
      "Birth Year": "",
      "Death Year": ""
    },
    "ImageURL": "placeholder",
    "Featured": false
  },
  {
    "Title": "The Maze Runner",
    "Genre": {
      "Name": "",
      "Description":
        ""
    },
    "Description": "",
    "Director": {
      "Name": "Wes Bell",
      "Bio": "",
      "Birth Year": "",
      "Death Year": ""
    },
    "ImageURL": "placeholder",
    "Featured": false
  },
  {
    "Title": "How It Ends",
    "Genre": {
      "Name": "",
      "Description":
        ""
    },
    "Description": "",
    "Director": {
      "Name": "David M. Rosenthal",
      "Bio": "",
      "Birth Year": "",
      "Death Year": ""
    },
    "ImageURL": "placeholder",
    "Featured": false
  },
  {
    "Title": "Leave the World Behind",
    "Genre": {
      "Name": "",
      "Description":
        ""
    },
    "Description": "",
    "Director": {
      "Name": "Sam Esmail",
      "Bio": "",
      "Birth Year": "",
      "Death Year": ""
    },
    "ImageURL": "placeholder",
    "Featured": false
  },
  {
    "Title": "Atlas",
    "Genre": {
      "Name": "",
      "Description":
        ""
    },
    "Description": "",
    "Director": {
      "Name": "Brad Peyton",
      "Bio": "",
      "Birth Year": "",
      "Death Year": ""
    },
    "ImageURL": "placeholder",
    "Featured": false
  },
  {
    "Title": "Insurgent",
    "Genre": {
      "Name": "",
      "Description":
        ""
    },
    "Description": "",
    "Director": {
      "Name": "Robert Schwentke",
      "Bio": "",
      "Birth Year": "",
      "Death Year": ""
    },
    "ImageURL": "placeholder",
    "Featured": false
  },
  {
    "Title": "Avatar",
    "Genre": {
      "Name": "Action",
      "Description":
        "Action focuses on the protagonist's sacrifice for life and death and generates excitement."
    },
    "Description": "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
    "Director": {
      "Name": "James Cameron",
      "Bio": "James Cameron is a Canadian filmmaker known for his expansive vision and innovative special-effects films, most notably Titanic (1997), and Avatar (2009).",
      "Birth Year": "1954",
      "Death Year": "N/A"
    },
    "ImageURL": "https://static.wikia.nocookie.net/20thcenturyfox/images/6/6c/Avatar_Poster.jpg/revision/latest?cb=20221209033444",
    "Featured": true
  },
  {
    "Title": "I Am Legend",
    "Genre": {
      "Name": "",
      "Description":
        ""
    },
    "Description": "",
    "Director": {
      "Name": "Francis Lawrence",
      "Bio": "",
      "Birth Year": "",
      "Death Year": ""
    },
    "ImageURL": "placeholder",
    "Featured": false
  },
  {
    "Title": "The Woman in Black",
    "Genre": {
      "Name": "",
      "Description":
        ""
    },
    "Description": "",
    "Director": {
      "Name": "James Watkins",
      "Bio": "",
      "Birth Year": "",
      "Death Year": ""
    },
    "ImageURL": "placeholder",
    "Featured": false
  },
];

// sets up the logger using morgan to log "combined" (specific data that will be logged) into the accessLogStream
app.use(morgan("combined", { stream: accessLogStream }));

// takes specific pathname "/" requests from the user and uses express to route them to any file located in the public folder
app.use(express.static("public"));

// GET REQUESTS

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/documentation.html"));
});

app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

app.get("/movies/:title", (req, res) => { // outputs movie information from a specific movie the user reqeusts
  
  const { title } = req.params; /* object destructuring, this is the same as: const title = req.paramas.title; here it is used to assign the movie 
  title the user inputs into a title variable */

  const movie = movies.find( movie => movie.Title === title ); // when the requested title is equal to a movie title in the array it will assign it to this movie variable

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("Movie not found");
  }
});

app.get("/movies/genre/:genreName", (req, res) => { // outputs genre information from a specific genre the user reqeusts

  const { genreName } = req.params;

  const genre = movies.find( movie => movie.Genre.Name === genreName ).Genre; /* .Genre will only return the particular property of the
  object instead of returning all the data where the genre is located like the specific movie name that matches up with it */

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send("Genre not found");
  }
})

app.get("/movies/directors/:directorName", (req, res) => { // outputs director information from a specific director the user reqeusts

  const { directorName } = req.params;

  const director = movies.find( movie => movie.Director.Name === directorName ).Director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send("Director not found")
  }
})

// CREATE/POST REQUESTS

app.post("/users", (req, res) => { // adds a new user

  const newUser = req.body; // uses bodyparser package to read data from the body object

  if (newUser.name) {
    newUser.id = uuid.v4(); // this will assign a brand new id to the user
    users.push(newUser);
    res.status(201).json(newUser) // new user has been created, good status reqest
  } else {
    res.status(400).send("Users need names");
  }
})

app.post("/users/:id/:movieTitle", (req, res) => { // adds a favorite movies to users favorites list

  const { id, movieTitle } = req.params; // pulls both the user id and movie title from req parmas

  let user = users.find( user => user.id == id ); // checks the users array to see if any id in the array is equal to req params id from user input

  if (user) { // if that user exists in the user array then ->
    user.favoriteMovies.push(movieTitle) // the users favorite movies array will be altered by adding a new movie into the array
    res.status(200).send(`${movieTitle} has been added to ${user.name}'s favorites`) // lets the user know that new movie has been added to favorites
  } else {
    res.status(400).send('Movie could not be added to favorites')
  }
})

// DELETE REQUESTS 

app.delete("/users/:id/:movieTitle", (req, res) => { // removes a favorite movie from users favorites lists

  const { id, movieTitle } = req.params;

  let user = users.find( user => user.id == id );

  if (user) { // if that user exists in the user array then ->
    user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle ) // uses filter method to filter out movies that DO NOT match the one the user is trying to remove
    res.status(200).send(`${movieTitle} has been removed from ${user.name}'s favorites`) // lets the user know that new movie has been added to favorites
  } else {
    res.status(400).send('Movie not found in favorites')
  }
})

app.delete("/users/:id", (req, res) => { // removes a user from the database

  const { id } = req.params;

  let user = users.find( user => user.id == id );

  if (user) { // if that user exists in the user array then ->
    users = users.filter( user => user.id != id ) // uses filter method to filter out users that DO NOT match the user that is trying to be deleted
    res.status(200).send(`${user.name}'s account has been deleted`) // lets the user know their account has been deleted
  } else {
    res.status(400).send('No such user found')
  }
})

// UPDATE/PUT REQUESTS 

app.put("/users/:id", (req, res) => { // updates an already existing users username

  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find( user => user.id == id );

  if (user) { // if that user exists in the user array then ->
    user.name = updatedUser.name; // change the user's name in the array to the updated username taken from the req.body input in Postman
    res.status(200).send("Username has been updated")
  } else {
    res.status(400).send('No such user found')
  }
})

// catches any errors regarding "res" responses to the user
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Webpage not fonud");
});

app.listen(8081, () => {
  console.log("My first Node test server is running on Port 8081");
});
