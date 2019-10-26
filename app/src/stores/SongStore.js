import {observable, action, computed, async, runInAction} from "mobx";
import SongService from "./SongService";
import ListStore from './ListStore';
import QueryStore from './QueryStore';

class SongStore {
    @observable songData =[];
    @observable status;
    @observable query = "";

    constructor() {
        this.songService = new SongService();
        this.status = "initial";
        this.query = "lil wayne";
    }

    @action setQuery = (string) => {
        this.query = string;
    }

    @action getSongsAsync = async () => {
        try {

            let params = {
                searchString: this.query
            }
            const urlParams = new URLSearchParams(Object.entries(params));
            const data = await this.songService.get(urlParams)
            runInAction(() => {
                let fetchedData = data;
                fetchedData.body.hits.hits.forEach( (song) => {
                    song = song._source;
                    this.songData.push({
                        name: song.name,
                        artist: song.artists[0].name,
                        album: song.album.name,
                        duration: Math.floor(song.duration_ms / 60000),
                        rating: Math.round(song.cumulated_user_review_score / song.total_user_reviews)})
                });
                ListStore.addRows(this.songData);
            });

        } catch (error) {
            runInAction(() => {
                this.status = error.toString();
            });
        }
    };

    @action getFilteredSongsAsync = async () => {
        try {
            let queryString = QueryStore.getQueryString();
            let params = {
                searchString: queryString[0],
                limit: queryString[1],
                offset: queryString[2],
                filterBy: queryString[3],
                greaterThan: queryString[4],
                sortBy: queryString[5],
                sortOrder: queryString[6]

            }
            const urlParams = new URLSearchParams(Object.entries(params));
            const data = await this.songService.get(urlParams)
            runInAction(() => {
                this.songData = data;
            });
            QueryStore.clearFilter();
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
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
    @action updateSongRatingAsync = async (vehicle) => {
        try {
            const response = await this.songService.put(vehicle)
            if (response.status === 200) {
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
    @action deleteSongRatingAsync = async (id) => {
        try {
            const response = await this.countryService.delete(id);
            if (response.status === 204) {
                runInAction(() => {
                    this.status = "success";
                })
            }
        } catch (error) {
            runInAction(() => {
                this.status = error.toString();
            });
        }
    }








}


//export instance of SongStore in order to use the same information in the same store accross the application
const store = new SongStore();
export default store;