// variable declaration 
const express = require("express"),
  path = require("path"),
  fs = require("fs"),
  morgan = require("morgan");
const app = express();

// creates a writable stream (data is written into a file, in this case log.txt) using the fs module
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'}); // the a flag opens the file for writing & positions the stream at the end of the file

let topMovies = [
  {
    title: "",
    author: "",
  },
  {
    title: "",
    author: "",
  },
  {
    title: "",
    author: "",
  },
  {
    title: "",
    author: "",
  },
  {
    title: "",
    author: "",
  },
  {
    title: "",
    author: "",
  },
  {
    title: "",
    author: "",
  },
  {
    title: "",
    author: "",
  },
  {
    title: "",
    author: "",
  },
  {
    title: "",
    author: "",
  },
];

// sets up the logger using morgan to log "combined" (specific data that will be logged) into the accessLogStream
app.use(morgan('combined', {stream: accessLogStream}));

// takes specific pathname "/" requests from the user and uses express to route them to any file located in the public folder
app.use(express.static("public"));

app.get("/movies", (req, res) => {
  res.json(topMovies);
});

app.get("/", (req, res) => {
  res.send("Hello testing!!");
});

// catches any errors regarding "res" responses to the user
app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).send("Webpage not fonud");
});

app.listen(8080, () => {
  console.log("My first Node test server is running on Port 8080.");
});
