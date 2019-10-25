const fs = require('fs');
const path = require("path");
const {Client} = require('@elastic/elasticsearch');
const client = new Client({node: 'http://localhost:9200'});

async function feed() {
    await client.indices.delete({
        index: 'tracks',
    }).then(function (res) {
            console.log("Successful delete!");
            console.log(JSON.stringify(res, null, 4));
        }
    ).catch((error) => {
        console.log(error);
        console.log("Probably because index doesnt exist yet");
    });
    let tracks = fs.readFileSync(path.resolve(__dirname, '../database/tools/tracks.json'), 'utf8');
    let jsonData = JSON.parse(tracks);
    const body = jsonData.flatMap((track) => {
        track['total_user_reviews'] = 0;
        track['cumulated_user_review_score'] = 0;
        return [{index: {_index: 'tracks', '_id': track.id}}, track];
    });
    const {body: bulkresponse} = await client.bulk({refresh: true, body}).then(console.log("Successfully added tracks"));


}

feed();
