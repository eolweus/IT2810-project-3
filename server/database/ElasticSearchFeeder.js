const fs = require('fs');
const {Client} = require('@elastic/elasticsearch');
const client = new Client({node: 'http://localhost:9200'});

async function feed() {
    let tracks = fs.readFileSync('tools/tracks.json', 'utf8');
    let jsonData = JSON.parse(tracks);
    const body = jsonData.flatMap((track) => {
        track['total_user_reviews'] = 0;
        track['cumulated_user_review_score'] = 0;
        return [{index: {_index:'tracks', '_id':track.id}}, track];
});
    const {body: bulkresponse} = await client.bulk({refresh: true, body})


}

feed();
