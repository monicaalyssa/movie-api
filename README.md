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
> | `201`         | `application/json; charset=utf-8`        | JSON array of objects 

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
> | `201`         | `application/json; charset=utf-8`        | JSON object 
> | `500`         | `text/html; charset=utf-8`        | `"Error: " + message`

</details>                                                  
