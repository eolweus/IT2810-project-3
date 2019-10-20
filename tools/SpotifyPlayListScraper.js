const https = require('https');
const fs = require('fs');

let bearerToken = 'BQBU7AJDSRPKuhm-qk0t7Tun09PaaVDcVnOZM2Z-JNCGmjCedJNljz7MOseCIbFicplhl2BiQJXZAx8H5NA'; //Access token from spotify

let playlistID = '0CM1P4PqJKNu5CiJWQNBWV'; //TODO make list of playlists
let options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer ' + bearerToken
    },
    json: true
};
let tracks = [];

function playlistIdToUrl(playlistID) {
    return 'https://api.spotify.com/v1/playlists/' + playlistID + '/tracks';
}

function addSpotifyApiDataToJSON(url) {
    return new Promise(function (resolve, reject) {


        https.get(url, options, (res) => {
            let buffers = [];
            res.on('data', (chunk) => {
                buffers.push(chunk);
            }).on('end', async () => {
                const fullBuffer = Buffer.concat(buffers);
                let json = JSON.parse(fullBuffer.toString());
                json.items.forEach((track) =>
                {
                    if(track.is_local === false){ //IsLocal means not available on spotify servers
                    tracks.push(track.track)}
                }

                );
                if(json.next != null){
                    await addSpotifyApiDataToJSON(json.next);
                }
                resolve("Success")
            });
        });
        setTimeout(()=> reject("Soemthing went wrong"), 10000)
    });
}
function addTracksToFile(tracks){
    data = tracks.map((track)=> JSON.stringify(track));
    fs.writeFile('tracks.json', '[' + data.toString() + ']', 'utf8', ()=>console.log('Files added'));
}


addSpotifyApiDataToJSON(playlistIdToUrl(playlistID)).then(()=>addTracksToFile(tracks));