const https = require('https');
const fs = require('fs');
/*Might get duplicates but elasticsearch will handle that*/
let bearerToken = 'BQBDjqgNcVVoromtQtZoL-ACYYsMQU_b65GHBqZm7eUv5_-pMT1TpCr1fJTGp3CIEgLrE4Mms-8V8ANpzf8'; //Access token from spotify, will expire

let playlistID = ['0CM1P4PqJKNu5CiJWQNBWV', '37i9dQZEVXbJvfa0Yxg7E7', '37i9dQZF1DX5EkyRFIV92g', '37i9dQZF1DXcGnc6d1f20P', '37i9dQZF1DWYgE24f8i7FU', '5VkzteknVo43GAQysSIR5u', '6VDDPVmPctk85SqVl1y8jT'];
let options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer ' + bearerToken
    },
    json: true
};
let tracklist = []; //All tracks will be added as Objects

function playlistIdToUrl(playlistID) {
    return 'https://api.spotify.com/v1/playlists/' + playlistID + '/tracks';
}

function addSpotifyApiDataToJSON(url) {
    return new Promise(function (resolve, reject) {


        https.get(url, options, (res) => { //Will go through all the tracks in the playlist and add it to the tracklist variable
            let buffers = [];
            res.on('data', (chunk) => {
                buffers.push(chunk);
            }).on('end', async () => {
                const fullBuffer = Buffer.concat(buffers);
                let json = JSON.parse(fullBuffer.toString());
                json.items.forEach((track) =>
                {
                    if(track.is_local === false){ //IsLocal means not available on spotify servers
                    tracklist.push(track.track)}
                }

                );
                if(json.next != null){ //Spotify will return max 100 tracks in a single request but will include a link for the next 100 tracks if available
                    await addSpotifyApiDataToJSON(json.next); //json.next is the link to the next 100 tracks. await "forces" the line to run syncronously.
                }
                resolve("Success")
            });
        });
        setTimeout(()=> reject("Something went wrong"), 10000)
    });
}
function addTracksToFile(tracks){
    data = tracks.map((track)=> JSON.stringify(track));
    fs.writeFile('tracks.json', '[' + data.toString() + ']', 'utf8', ()=>console.log('files written to json'));
}

function addListOfPlaylists(playlists, tracklist){

    playlists.forEach((playlistID)=>{
        let playlistUrl = playlistIdToUrl(playlistID);
        addSpotifyApiDataToJSON(playlistUrl);
    });
    setTimeout(() => addTracksToFile(tracklist), 7000);


}

addListOfPlaylists(playlistID, tracklist);