# Assignment 3

## User guide to run locally
### Required software
1. Node.js
2. Yarn
3. Docker
3. Elasticsearch

#### Installation
1. Download this project to your computer using git, or download the zip and unzip it
2. Using the command line interface, navigate to the server folder and run 'npm install'
3. Navigate to the app folder and run 'yarn install'
4.

### Starting the project
1. Using the command line interface, navigate to the server folder and run 'npm start'
2. Navigate to the app folder and run 'yarn start'
3. SANDER BESKRIVER INITIALISERING AV ELASTIC SEARCH
SANDER OG KRISTOFFER, SJEKK AT DETTE STEMMER
<hr>


## Use of yarn and npm
Originally, we were only using npm, but due to some weird bug we couldn't squash in our package.json file, we had to switch to using yarn midway. We are fully aware that it is not a common practice to use multiple package managers for a single project


### Heirarchy
Our app is primarily devided into an app folder, and a server folder. The app contains the clientside of our application, while the server (naturaly) contains the serverside.

## Frontend
KRISTOFFER FYLLER UT HER

<hr>

## Backend


### The Express API
We implemented a REST api using Express.js in the `server.js` file in the server folder. The reason we chose express, is that an express API works well with our database of choice: elasticsearch. Additionally, it proved to be very well documented and simple to set up.

The `server.js`file contains 3 main functions. One for getting song data with the ID of a track which only takes the id as a param. The other get function takes in a multitude of parameters, including a search string. It then returns a set of all tracks matching the search on either the name of the song, the name of the artist, or the name of the album.

The final function is a POST request, and updates the user rating of a song by taking in the trackId as a parameter. The rating of a song is a variable derived from the two data fields actually updated in this function; `cumulated_user_review_score` and `total_user_reviews`.

<hr>

### Elastic search database
SANDER FYLLER UT HER
    Få med noe informasjon om `queries.js filen`

### Scraping data
We have scraped our song data from the spotify api.
SANDER FYLLER UT HER

### Responsive Design Testing


<hr>

## Testing
For testing, we decided to go with two different approaches for the frontend and backend. In the frontend, and for E2E testing, we used cypress. For the Backend we used Jest
SANDER FYLLER INN HER

### Testing with jest
SANDER FYLLER INN HER

### Testing with cypress
