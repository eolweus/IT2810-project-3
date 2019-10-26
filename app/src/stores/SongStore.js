import {observable, action, computed, async, runInAction} from "mobx";
import SongService from "./SongService";
import ListStore from './ListStore';
import QueryStore from './QueryStore';

class SongStore {
    @observable songData =[];
    @observable wordsForCloud = [];
    @observable status;
    @observable initialQuery;


    constructor() {
        this.songService = new SongService();
        this.status = "initial";
        this.initialQuery = "";
    }

    @computed get wordCloud() {
        return this.wordsForCloud;
    }

    @action clearSongData = () => {
        this.songData = [];
    }

    @action clearCloud = () => {
        this.wordsForCloud = [];
    }

    @action searchForSongAsync = async () => {
        let urlParamsObject = {};

        if(!(QueryStore.searchString === null || QueryStore.searchString === "")) { urlParamsObject['searchString'] = QueryStore.searchString}
        if(QueryStore.filterBy !== null) {urlParamsObject['filterBy'] = QueryStore.filterBy}
        if(QueryStore.greaterThan !== null) {urlParamsObject['greaterThan'] = QueryStore.greaterThan}
        if(QueryStore.sortBy !== null) {urlParamsObject['sortBy'] = QueryStore.sortBy}
        if(QueryStore.sortOrder !== null) {urlParamsObject['sortOrder'] = QueryStore.sortOrder}
        if(QueryStore.limit !== null) {urlParamsObject['limit'] = QueryStore.limit}
        if(QueryStore.offset !== null) {urlParamsObject['offset'] = QueryStore.offset}
        const urlParams = new URLSearchParams(urlParamsObject);
        const data = await this.songService.get(urlParams);
        runInAction(() => {
            this.clearSongData();
            this.clearCloud();
            let fetchedData = data;
            let i = 0;
            fetchedData.body.hits.hits.forEach( (song) => {
                song = song._source;
                this.songData.push({
                    name: song.name,
                    artist: song.artists[0].name,
                    album: song.album.name,
                    duration: Math.floor(song.duration_ms / 60000),
                    rating: Math.round(song.cumulated_user_review_score / song.total_user_reviews)});
                this.wordsForCloud.push({text: song.name, value: i});
                i++;
            });
            console.log("New request has ran");
            ListStore.addRows(this.songData);
            ListStore.setTotalHits(fetchedData.body.hits.total.value);
        });
    };



    @action createSongRatingAsync = async (model) => {
        try {
            const response = await this.songService.post(model);
            if (response.status === 201) {
                runInAction(() => {
                    this.status = "success";
                })
            }
        } catch (error) {
            runInAction(() => {
                this.status = error.toString();
            });
        }

    };








}


//export instance of SongStore in order to use the same information in the same store accross the application
const store = new SongStore();
export default store;