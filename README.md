# Assignment 3

## User guide to run locally
<br>
#### Required software
1. Node.js (12.10.0 is confirmed to work, version 10 will not)
2. Yarn
3. Docker (with linux subsystem)


#### Installation
1. Clone this project to your computer using git, or download the zip and unzip it
2. Using the command line interface, navigate to the server folder and run `npm install`
3. Navigate to the app folder and run 'yarn install'

## Database installation and startup
##### Based on https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html
1. Make sure docker is running on your computer
2. Run commands as admin (open as admin in windows)
3. Run `docker pull docker.elastic.co/elasticsearch/elasticsearch:7.4.1`
4. Run `docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.4.1`
5. Your database should now be running, this can be confirmed by going to `localhost:9200` in browser

### Starting the project
1. Using the command line interface, navigate to the server folder and run `npm start`
2. In the same folder run `npm run-script db-init`, this can be ran again to clear any user generated data in the database
3. Navigate to the app folder and run 'yarn start'
SANDER OG KRISTOFFER, SJEKK AT DETTE STEMMER
<hr>


### Use of yarn and npm
Originally, we were only using npm. Due to some weird bug we couldn't squash in our package.json file, we had to switch to using yarn midway. We are fully aware that it is not a common practice to use multiple package managers for a single project


### Heirarchy
Our app is primarily devided into an app folder, and a server folder. The app contains the clientside of our application, while the server (naturaly) contains the serverside.

## Frontend
KRISTOFFER FYLLER UT HER

### Dependencies and plugins


### Technology

<hr>

## Backend
For the backend we have chosen to use a REST api implemented with express, and elasticsearch for our database.

### The Express API
We implemented a REST api using Express.js in the `server.js` file in the server folder. The reason we chose express, is that an express REST API has all the feautures needed for our project needs and is straight foward to implement. Additionally, it proved to be very well documented and simple to set up.

The `server.js` file contains 3 main functions. One for getting song data with the ID of a track which only takes the id as a param. The other get function takes in a multitude of parameters, including a search string. It then returns a set of all tracks matching the search on either the name of the song, the name of the artist, or the name of the album.

The final function is a POST request, and updates the user rating of a song by taking in the trackId as a parameter. The rating of a song is a variable derived from the two data fields updated in this function; `cumulated_user_review_score` and `total_user_reviews`.

<hr>

### Elastic search database
Elasticsearch is a document database based on apache Lucene. We decided to use this because it is a very flexible and fast database that has all the feautures we want. It has built in search functionality and allows us to feed it with json object without having to model the data first, this made getting the data really simple since we took it straight from the spotify API and feed it into the database with very little overhead, all we did was make sure the ID used by elasticsearch was the same as the track ID.

To communicate with the database we used elastics own Node.js api. This has beed used to add data to the database as well as retriving data from it.
The `ElasticSearchFeeder.js` is used to feed the database with the data we have retrieved from spotify, with a bulk request.
In `queries.js` we have our helping functions for the API, these functions are used to search, add user reviews to tracks and to get a single track by ID.

- More info on Node.js api https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html
- More info on Json bodies used https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-body.html

### Scraping data
We have scraped our song data from the spotify api.
In order to get data from spotify you need to get an authorization token, how we obtained our token is described here: https://developer.spotify.com/documentation/general/guides/authorization-guide/#client-credentials-flow
The token is used by the `SpotifyPlaylistScraper.js` to iterate through all the plalist IDs we have added, adding them to tracklist and then writing tracklist to tracks.json

### Responsive Design Testing


<hr>

## Testing
For testing, we decided to go with two different approaches for the frontend and backend. In the frontend, and for E2E testing, we used cypress. For the Backend we used integration testing with Jest.

### Integration testing with jest
#### How to run integration testing
##### Make sure that you have elasticsearch running on localhost:9200 and server.js running on localhost:5000, as it should be after finishing the user guide to run locally in this doc.

1. Simply navigate to the server folder and run `npm run-script test-it`, NOTE, this will remove all reviews from the server as it "resets" the database. Ideally we would make another instance of elasticsearch for this test but we had some problems running docker images on different ports.

### Testing with cypress
For testing DOM functionality we decided to go with cypress. Cypress proved easy to set up, and easy to use. The tests we have written focus on changing up the selection of songs displayed.

### How to run cypress tests locally
To set up the cypress testing environment locally navigate to the app folder and run `yarn run cypress open`. After opening the cypress testing tool, run all the tests in the dom_tests folder.
