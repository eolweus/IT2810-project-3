const Queries = require('server/queries');
const queries = new Queries();

describe('sample search query', () => {
    it('returns a result including spotify:track:3uYDO9dPLTVrgfwg7EYXSf(lift yourself)', async () => {
        result = await queries.search("kanye", 20,0, 'no', 'no');
        expect(result.body.hits.hits.some((track) => track._id === '3uYDO9dPLTVrgfwg7EYXSf')).toBe(true);
    })
});

describe('Add review to database', ()=>{
    it('adds the review to the database', async () =>{
        await queries.getById('3uYDO9dPLTVrgfwg7EYXSf').then((result) => {
            expect(result.body._source.total_user_reviews).toBe(0);
            expect(result.body._source.cumulated_user_review_score).toBe(0);
        });
        await queries.addRating(4, '3uYDO9dPLTVrgfwg7EYXSf');
        await queries.getById('3uYDO9dPLTVrgfwg7EYXSf').then((result) => {
            expect(result.body._source.total_user_reviews).toBe(1);
            expect(result.body._source.cumulated_user_review_score).toBe(4);
        });
        await queries.addRating(5, '3uYDO9dPLTVrgfwg7EYXSf');
        await queries.getById('3uYDO9dPLTVrgfwg7EYXSf').then((result) => {
            expect(result.body._source.total_user_reviews).toBe(2);
            expect(result.body._source.cumulated_user_review_score).toBe(9);
        });
    })
});