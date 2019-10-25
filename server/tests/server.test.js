const http = require('http');
const request = require('request');

function getRequest(url) {
    return new Promise(resolve => {
        http.get(url, (res) => {

            data = '';
            res.on('data', d => {
                data += d;
            });
            res.on('end', () => resolve(JSON.parse(data)));
        });
    });
}

function postRequest(url) {
    return new Promise(resolve => {
        request.post(url).on('response', function (response) {
            resolve(response)
        }).on('error', function (err) {
            console.log(err)
        });
    });
}

describe('Get single track', () => {
    it('get the track', async () => {

        res = await getRequest('http://localhost:5000/api/tracks/3uYDO9dPLTVrgfwg7EYXSf');
        expect(res.statusCode).toEqual(200);
        expect(res.body._source.name).toBe("Lift Yourself");
    });
});
describe('Add review with api', () => {
    it("adds review points with api", async () => {
        let getRes = await getRequest('http://localhost:5000/api/tracks/0osPUefhvYxoB2eZw6prBt');
        expect(getRes.body._source.total_user_reviews).toEqual(0);
        expect(getRes.body._source.cumulated_user_review_score).toEqual(0);
        expect(getRes.statusCode).toEqual(200);
        expect(getRes.body._source.name).toBe("One Man Can Change The World");
        let postRes = await postRequest('http://localhost:5000/api/tracks/0osPUefhvYxoB2eZw6prBt?score=5');
        expect(postRes.statusCode).toEqual(200);
        getRes = await getRequest('http://localhost:5000/api/tracks/0osPUefhvYxoB2eZw6prBt');
        expect(getRes.body._source.total_user_reviews).toEqual(1);
        expect(getRes.body._source.cumulated_user_review_score).toEqual(5);
        await postRequest('http://localhost:5000/api/tracks/0osPUefhvYxoB2eZw6prBt?score=4');
        await postRequest('http://localhost:5000/api/tracks/0osPUefhvYxoB2eZw6prBt?score=5');
        getRes = await getRequest('http://localhost:5000/api/tracks/0osPUefhvYxoB2eZw6prBt');
        expect(getRes.body._source.total_user_reviews).toEqual(3);
        expect(getRes.body._source.cumulated_user_review_score).toEqual(14);


    });
});
describe('get songs with api search', ()=>{
    it('finds the song on search', async ()=>{
        let response = await getRequest('http://localhost:5000/api/tracks?searchString=shoot me down');
        expect(response.body.hits.hits.some((track) => track._id === '5fwsVjNN11mSSLYBXa2X7b')).toBe(true);
    });
});