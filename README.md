# web server in deno
a [Deno](https://deno.com/) web server using [Oak](https://oakserver.org/).  
It provides two endpoints:

- GET /api/jokes: Returns all stored jokes as JSON.
- POST /api/jokes: Adds a new joke

[MongoDB](https://www.mongodb.com/) is used to store the jokes.
