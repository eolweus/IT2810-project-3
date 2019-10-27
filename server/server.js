const Queries = require('./queries.js');
const queries = new Queries();
const express = require('express');
const cors = require('cors');

const app = express();

// Load songs from database based on track ID
app.use(cors());

// Load songs from database
app.get('/api/tracks/:trackId', (req, res) => {
    queries.getById(req.params.trackId).then((result) => res.json(result)).catch((error) => {
        console.log(error);
        res.send(error)
    });
});

// Load songs from database based on query.
// Passes in a searchString, a parameter which decides how many songs will load (limit),
// An offset used to decide what song number in the resultset is the first in the songs displayed,
// sortBy, which decides on what variable the result set will be sorted on
// and what order to sort in (ascending/descending)

//By default sortBy will sort on overall relevance of the search based on the fields searched

app.get('/api/tracks', (req, res) => {
    console.log(req);
    const searchString = (req.query.searchString === undefined ? null : req.query.searchString);
    const limit = (req.query.limit === undefined ? 5 : req.query.limit);
    const offset = (req.query.offset === undefined ? 0 : req.query.offset);
    const filterBy = (req.query.filterBy === undefined ? 'no' : req.query.filterBy);
    const greaterThan = (req.query.greaterThan === undefined ? 0 : req.query.greaterThan);
    const sortBy = req.query.sortBy;
    let sortOrder = req.query.sortOrder;

    if (sortBy === undefined || sortOrder === undefined) {
        queries.search(searchString, limit, offset, filterBy, greaterThan).then((result) => res.json(result)).catch((error) => {
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
        queries.searchWithSorting(searchString, limit, offset, filterBy, greaterThan, sortBy, sortOrder).then((result) => res.json(result)).catch((error) => {
            console.log(error);
            res.send(error)
        });
    }
    console.dir(req.query);
});


// Update rating of a song based on Track ID
app.post('/api/tracks/:trackId', (req, res) => {
    const trackId = req.params.trackId;
    const score = parseInt(req.query.score);
    if (!(score >= 1 && score <= 5)) {
        res.status(400);
        res.send("score query param is required and must be in range 1 and 5");
    }
    queries.addRating(score, trackId).then((result) => res.json(result)).catch((error) => {
        console.error(error);
        res.send(error)
    });

});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
