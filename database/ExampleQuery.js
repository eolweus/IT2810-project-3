const {Client} = require('@elastic/elasticsearch');
const client = new Client({node: 'http://localhost:9200'});

function searchExample(userInput, pageSize, fromElement) {
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
function searchExampleWithSorting(userInput, pageSize, fromElement, sortBy, sortAsc) {
    let searchObject = {
        index: 'tracks',
        from: fromElement, //From and size is for pagination
        size: pageSize,
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

/*searchExample("this is america", 10, 0).then((result) => {
    console.log(result.body.hits.hits)
});*/
/*searchExampleWithSorting("this is america", 10, 0, 'album.name.keyword', true).then((result) => {
    console.log(result.body.hits.hits)
});*/
searchExampleWithSorting("this is america", 20, 0, 'album.name.keyword', true).then((result) => {
    result.body.hits.hits.forEach((track) => console.log(track._source.album.name))
});
