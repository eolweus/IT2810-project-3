import {observable, action, computed, async, runInAction} from "mobx";
import SongService from "./SongService";
import ListStore from './ListStore';
import QueryStore from './QueryStore';
import {List} from "@material-ui/core";

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
            let i = 0;
            data.body.hits.hits.forEach( (song) => {
                song = song._source;
                this.songData.push({
                    id: song.id,
                    imageURL: song.album.images[1].url,
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
            ListStore.setTotalHits(data.body.hits.total.value);
            ListStore.setPage(0);
        });
    };

    @action searchForSongWithoutListWipeAsync = async () => {
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
            this.clearCloud();

            let i = 0;
            data.body.hits.hits.forEach( (song) => {
                song = song._source;
                this.songData.push({
                    id: song.id,
                    name: song.name,
                    artist: song.artists[0].name,
                    imageURL: song.album.images[1].url,
                    album: song.album.name,
                    duration: Math.floor(song.duration_ms / 60000),
                    rating: Math.round(song.cumulated_user_review_score / song.total_user_reviews)});
                this.wordsForCloud.push({text: song.name, value: i});
                i++;
            });
            console.log("New request has ran");
            ListStore.addElementsToList(this.songData);
            ListStore.setTotalHits(data.body.hits.total.value);
        });
    };



    @action createSongRatingAsync = async (model) => {
        try {
            let data = model.split("-");
            let params = {
                id: data[0],
                rating: data[1]
            }
            const response = await this.songService.post(model, params.id + "?score=" + params.rating);
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