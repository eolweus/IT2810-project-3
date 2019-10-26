const {Client} = require('@elastic/elasticsearch');
const client = new Client({node: 'http://localhost:9200'});

class Queries {

    constructor() {

    }
    // Returns a specific track based on the trackId
    getById(trackId) {
        return client.get({
            index: 'tracks',
            id: trackId, //ID is the unique identifier for each track, this is the same that is used by Spotify
            type: "_doc" //This is standard type in elasticsearch
        });
    }

    // Searches among all songs on songname, artistname and albumname fields with the user input
    // Results will be searched by relevance.
    search(userInput, pageSize, fromElement) {
        return client.search({
            index: 'tracks',
            from: fromElement, //From and size is for pagination
            size: pageSize,
            body: {
                "query": {
                    "bool": {
                        "must": {
                            "multi_match": {
                                "query": userInput,
                                "fields": [//Fields that are searched
                                    "name",
                                    "artists.name",
                                    "album.name"
                                ]
                            }
                        }
                    }
                }
            }
        });
    }

    /*
        *@Param {String} userInput - string with the search input
        *@Param {String} sortBy - string describing what to sort some valid inputs are 'popularity', 'album.total_tracks'
        *,'album.release_date', 'duration_ms', 'name.keyword', 'album.name.keyword' */
    searchWithSorting(userInput, pageSize, fromElement, sortBy, sortAsc) {
        let searchObject = {
            index: 'tracks',
            from: fromElement, //From is the start element
            size: pageSize, //size is the max amount of hits that are returned
            body: {
                'sort': {},
                "query": {
                    "bool": {
                        "must": {
                            "multi_match": {
                                "query": userInput,
                                "fields": [//Fields that are searched
                                    "name",
                                    "artists.name",
                                    "album.name"
                                ]
                            }
                        }
                    }
                }
            }
        };
        searchObject.body.sort[sortBy] = {'order': (sortAsc ? 'asc' : 'desc')};
        return client.search(searchObject);
    }

    // Updates the rating of a song using the user specified score.
    // elasticsearch can take scripts as "queries", and here it runs a script
    // which updates the total score of a song (found by trackId), and increments
    // the number of reviews.
    // The score of a song is a variable derived from the total score and nr of reviews.
    addRating(score, trackId) {
        return client.update({
            'index': 'tracks',
            "id": trackId,
            'type': '_doc',
            'body': {
                "script": {
                    "source":
                        "ctx._source.total_user_reviews += 1; ctx._source.cumulated_user_review_score += params.review_score", //This script will run on the database
                    "lang": "painless", //painless is a language developed for elasticsearch
                    "params": {// parameters passed to the script
                        "review_score": score
                    }
                }
            }
        })

    }
}

module.exports = Queries;

/*searchExample("this is america", 10, 0).then((result) => {
    console.log(result.body.hits.hits)
});*/
/*searchExampleWithSorting("this is america", 10, 0, 'album.name.keyword', true).then((result) => {
    console.log(result.body.hits.hits)
});*/
