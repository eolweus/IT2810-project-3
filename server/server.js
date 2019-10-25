const Queries = require('./queries.js');
const queries = new Queries();
const express = require('express');
//const {Client} = require('@elastic/elasticsearch');
//const client = new Client({node: 'http://localhost:9200'});

console.log(queries);
const app = express();

// Load songs from database
app.get('/api/tracks/:trackId', (req, res) => {
    queries.getById(req.params.trackId).then((result) => res.json(result)).catch((error) => {
        console.log(error);
        res.send(error)
    });
});


app.get('/api/tracks', (req, res) => {
    console.log(req);
    const searchString = req.query.searchString;
    const limit = (req.query.limit === undefined ? 20 : req.query.limit);
    const offset = (req.query.offset === undefined ? 0 : req.query.offset);
    const sortBy = req.query.sortBy;
    let sortOrder = req.query.sortOrder;

    if (sortBy === undefined || sortOrder === undefined) {
        queries.search(searchString, limit, offset).then((result) => res.json(result)).catch((error) => {
            console.log(error);
            res.send(error)
        });
    } else if (!['asc', 'desc'].includes(sortOrder)) {
        res.send("sortOrder has to be asc, desc or unused");
    } else {
        /*
            *Function searchWithSorting
            *@Param {String} userInput - string with the search input
            *@Param {String} sortBy - string describing what to sort some valid inputs are 'popularity', 'album.total_tracks'
            *,'album.release_date', 'duration_ms', 'name.keyword', 'album.name.keyword' */
        sortOrder = (sortOrder === 'asc' ? true : false); // false means desc
        queries.searchWithSorting(searchString, limit, offset, sortBy, sortOrder).then((result) => res.json(result)).catch((error) => {
            console.log(error);
            res.send(error)
        });
    }
    console.dir(req.query);
});


// Update rating of a song
app.post('/api/tracks/:trackId', (req, res) => {
    const trackId = req.params.trackId;
    const score = parseInt(req.query.score);
    if(!(score>=1 && score <=5)){
        res.status(400);
        res.send("score query param is required and must be in range 1 and 5");
    }
    queries.addRating(score, trackId).then((result) => res.json(result)).catch((error) => {
        console.error(error);
        res.send(error)
    });

});

// Denne må endres. Bruker 5000 midlertidig for å ha noe å kjøre lokalt
const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
