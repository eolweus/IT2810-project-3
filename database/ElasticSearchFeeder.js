const fs = require('fs');
const {Client} = require('@elastic/elasticsearch');
const client = new Client({node: 'http://localhost:9200'});

async function feed() {
    let tracks = fs.readFileSync('tools/tracks.json', 'utf8');
    let jsonData = JSON.parse(tracks);
    //TODO map spotify ID slik at den blir dokoment ID
    const body = jsonData.flatMap((track => [{index: {_index:'tracks', "_id":track.id}}, track]));
    const {body: bulkresponse} = await client.bulk({refresh: true, body})


}

feed();
