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

## API Endpoints

**Base URL**
``` 
https://popcornpal-32d285ffbdf8.herokuapp.com/ 
```

#### Existing movie data

<details>
 <summary><code>GET</code> <code><b>/movies</b></code> <code>(gets a list of all movies)</code></summary>

##### Parameters

> | None |
> |---------------|

##### Responses

> | HTTP Code     | Content-Type                      | Response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json; charset=utf-8`        | JSON array of objects 

</details>

<details>
 <summary><code>GET</code> <code><b>/movies/{uuid}</b></code> <code>(gets data about a specific movie by id)</code></summary>
 
##### Parameters

> | Name   | Data Type      | Description                                          |
> |--------|----------------|------------------------------------------------------|
> | `uuid` | string         | The specific movie id                 |


##### Responses

> | HTTP Code     | Content-Type                      | Response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json; charset=utf-8`        | JSON object 
> | `500`         | `text/html; charset=utf-8`        | `"Error: " + message`

##### Example Request
`https://popcornpal-32d285ffbdf8.herokuapp.com/movies/666f4ac82ea46717e439e608`

##### Example Response (200 OK)
```json
{
  "Genre": {
    "Name": "Mystery",
    "Description": "Mystery involves a mysterious death or a crime to be solved."
  },
  "Director": {
    "Name": "Sam Esmail",
    "Bio": "Sam Esmail is an American producer and writer, with 5 film award wins.",
    "Birthdate": "1977-09-17T00:00:00.000Z"
  },
  "_id": "666f4ac82ea46717e439e608",
  "Title": "Leave the World Behind",
  "Description": "A family's getaway to a luxurious rental home takes an ominous turn when a cyberattack knocks out their devices, and two strangers appear at their door.",
  "ImageURL": "https://m.media-amazon.com/images/M/MV5BMTUzM2I3NDEtMjNhYi00NTQ0LThmZDItZTMyMzM2MjJmZGRjXkEyXkFqcGdeQXVyMTU3NDU4MDg2._V1_.jpg",
  "Featured": false,
  "BannerURL": "https://stadt-bremerhaven.de/wp-content/uploads/2023/10/Leave-the-world-behind.jpg",
  "Duration": "2h20m"
}
```

</details> 

<details>
 <summary><code>GET</code> <code><b>/genre/{genrename}</b></code> <code>(gets data about a specific genre by name)</code></summary>

##### Parameters

> | Name   | Data Type      | Description                                          |
> |--------|----------------|------------------------------------------------------|
> | `genrename` | string         | The name of the genre (case sensitive)                 |


##### Responses

> | HTTP Code     | Content-Type                      | Response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json; charset=utf-8`        | JSON object 
> | `404`         | `text/html; charset=utf-8`        | `genrename + "genre not found"`

##### Example Request
`https://popcornpal-32d285ffbdf8.herokuapp.com/genre/Fantasy`

##### Example Response (200 OK)
```json
{
  "Name": "Fantasy",
  "Description": "Fantasy stories are set in a faraway or fictional universe and are usually inspired by mythology and folklore."
}
```

</details>

<details>
 <summary><code>GET</code> <code><b>/directors/{directorname}</b></code> <code>(gets data about a specific director by name)</code></summary>

##### Parameters

> | Name   | Data Type      | Description                                          |
> |--------|----------------|------------------------------------------------------|
> | `directorname` | string         | The name of the director (case sensitive)                 |


##### Responses

> | HTTP Code     | Content-Type                      | Response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json; charset=utf-8`        | JSON object 
> | `404`         | `text/html; charset=utf-8`        | `directorname + " not found"`

##### Example Request
`https://popcornpal-32d285ffbdf8.herokuapp.com/directors/James Cameron`

##### Example Response (200 OK)
```json
{
  "Name": "James Cameron",
  "Bio": "James Cameron is a Canadian filmmaker known for his expansive vision and innovative special-effects films, most notably Titanic (1997), and Avatar (2009).",
  "Birthdate": "1954-08-16T00:00:00.000Z"
}
```

</details>

<details>
 <summary><code>GET</code> <code><b>/users/{username}</b></code> <code>(gets data about a specific user)</code></summary>

##### Parameters

> | Name   | Data Type      | Description                                          |
> |--------|----------------|------------------------------------------------------|
> | `username` | string         | Users username                 |

##### Auth Parameters

> | Auth Type   | Value      | Description                                          |
> |--------|----------------|------------------------------------------------------|
> | `Bearer Token` | string         | JWT Token                 |

##### Responses

> | HTTP Code     | Content-Type                      | Response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json; charset=utf-8`        | JSON object
> | `404`         | `text/html; charset=utf-8`        | `"User with username" + username + " not found"`
> | `401`         | `text/plain; charset=utf-8`        | `"Unauthorized"`

##### Example Request
`https://popcornpal-32d285ffbdf8.herokuapp.com/users/johndoe`

##### Example Response (200 OK)
```json
{
  "_id": "6262a50dc4d247589f699b38ab9204f4",
  "Username": "johndoe",
  "Password": "$2b$12$q3lFXBytAOfnH5mXYll.AOH6rnNmXzbEmtsK61jUONaCW02wKz11W",
  "Email": "johndoe@exmaple.com",
  "Birthday": "1997-03-20T00:00:00.000Z",
  "Favorites": [],
  "__v": 0
},
```

</details>

<details>
 <summary><code>POST</code> <code><b>/login</b></code> <code>(authenticates a user and returns a JWT token)</code></summary>

##### Query Parameters

> | Key   | Value      | Description                                          |
> |--------|----------------|------------------------------------------------------|
> | `Username` | string         | User username                 |
> | `Password` | string         | User password                 |


##### Responses

> | HTTP Code     | Content-Type                      | Response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json; charset=utf-8`        | JSON object 
> | `401`         | `text/html; charset=utf-8`        | `"Invalid username or password"`

##### Example Request
`https://popcornpal-32d285ffbdf8.herokuapp.com/login?Username=johndoe&Password=password123`

##### Example Response (200 OK)

```json
{
    "user": {
        "_id": "6262a50dc4d247589f699b38ab9204f4",
        "Username": "johndoe",
        "Password": "$2b$12$q3lFXBytAOfnH5mXYll.AOH6rnNmXzbEmtsK61jUONaCW02wKz11W",
        "Email": "johndoe@exmaple.com",
        "Birthday": "1997-03-20T00:00:00.000Z",
        "Favorites": [],
        "__v": 0
    },
    "token": "Lmi97X7rSYyEVywRuee2sYlODgI0W7pFpAscfOPggAuwe6CaCi7WumymeBzH8bUm8JS9TKu4fD88VB42E1HO9Qe8fiLOJbfPtFq1taGtdV4rzoCxZ4L3AdEPwVexWSGAESVjIRRlCc7e84ChB5V5i19iZmGtulGfwXTQ-rrihSqU0-p4CsMXfommD79Qqehtgv-6JlzZcILXc-WOsSBkSCVMoTW5p6ppVPZH"
}
```
</details>

<details>
 <summary><code>GET</code> <code><b>/users</b></code> <code>(gets a list of all users and their favorite movies)</code></summary>

##### Auth Parameters

> | Auth Type   | Value      | Description                                          |
> |--------|----------------|------------------------------------------------------|
> | `Bearer Token` | string         | JWT Token                 |

##### Responses

> | HTTP Code     | Content-Type                      | Response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json; charset=utf-8`        | JSON array of objects

</details>

