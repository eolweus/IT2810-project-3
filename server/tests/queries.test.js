const Queries = require('server/queries');
const queries = new Queries();

describe('sample search query', () => {
    it('returns a result including spotify:track:3uYDO9dPLTVrgfwg7EYXSf(lift yourself)', async () => {
        console.log("hello");
        result = await queries.search("kanye", 20,0);
        expect(result.body.hits.hits.some((track) => track._id === '3uYDO9dPLTVrgfwg7EYXSf')).toBe(true);
    })
});