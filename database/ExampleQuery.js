const {Client} = require('@elastic/elasticsearch');
const client = new Client({node: 'http://localhost:9200'});

function searchExample(userInput, pageSize, fromElement){
    return client.search({
        index: 'tracks',
        from:   fromElement, //From and size is for pagination
        size : pageSize,
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

searchExample("this is america", 10, 0).then((result) => {console.log(result.body.hits.hits)});