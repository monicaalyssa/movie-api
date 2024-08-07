# PopcornPal <a name="top"></a>
<img align="right" src="images/moviecamera.svg" alt="Movie Camera" width="140"/>
PopcornPal is a full-stack web application for movie enthusiasts who enjoy reading information about movies. It allows users to explore a diverse collection of movies, learn about movie directors and genres, and manage favorite movies if registered.

## Features

- **Browse Movies:** Browse through a wide collection of movies.
- **Search:** Search for specific movies by title or genre.
- **Movie Details:** Access information on a movie, including the plot summary and details about the directors.
- **User Registration:** Create an account by providing a username, password, and email address.
- **User Profile Management:** Registered users can modify their profile information.
- **Personalized Experience:** Users can add and remove movies in their "My Favorites" list.

## Installation

To use this application locally, follow these steps inside your terminal:

1. Clone this repository to your local machine:
```bash
git clone https://github.com/monicaalyssa/movie-api
```
<img align="right" src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/People/Woman%20Technologist.webp" alt="Woman Technologist" width="115"/>

2. Navigate to the project directory: `cd movie-api`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`
5. Open your browser and visit: `http://localhost:8082`

## Technologies & Dependencies
### Frontend
<table><tr><td><img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original.svg" width="60"/></td><td><strong>React:</strong> A JavaScript library for building responsive user interfaces with a component-based approach, optimizing performance through virtual DOM for seamless updates and rendering.</td></tr></tr></table>

### Backend
<table><tr><td><img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original-wordmark.svg" width="60"/></td><td><strong>Node.js:</strong> The runtime environment for the PopcornPal project, handling HTTP requests and routing clients to the appropriate API endpoints.</td></tr><tr><td><img src="https://github.com/devicons/devicon/blob/master/icons/express/express-original-wordmark.svg" width="60"/></td><td><strong>Express.js:</strong> Works alongside Node.js to handle HTTP requests, define routes, and implement middleware to manage various aspects of the project.</td></tr></table>

### Database
<table><tr><td><img src="https://github.com/devicons/devicon/blob/master/icons/mongodb/mongodb-plain-wordmark.svg" width="60"/></td><td><strong>MongoDB:</strong> The database management system for handling the storage and retrieval of data related to movies and users.</td></tr></table>

### Mongoose
Interacts with the MongoDB database to define schemas, validate structures of movie and user documents, and employs query methods to locate matching records.

### JWT/JSON Web Token
Generates tokens at user login for secure, stateless authorization.

### Passport.js
Works alongside JWT authentication to handle authentication and authorization between endpoints on the web server.

### Bcrypt
Enables secure login authentication by hashing users' passwords for enhanced security.

##
[Back to top](#top)
