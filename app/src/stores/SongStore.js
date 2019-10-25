import {observable, action, computed, async, runInAction} from "mobx";
import SongService from "./SongService";
import ListStore from "./ListStore"

class SongStore {
    @observable songData = {

    };
    @observable status = "initial";
    @observable initalQuery = "muse";
    @observable query = "";

    constructor() {
        this.songService = new SongService();
    }

    @action setQuery = (string) => {
        this.query = string;
    }

    @action getAllSongsAsync = async () => {
        try {
            let params = {
                searchString: this.initalQuery
            }
            const urlParams = new URLSearchParams(Object.entries(params));
            const data = await this.songService.get(urlParams)
            runInAction(() => {
                this.songData = data;
                this.songData.body.hits.hits.forEach( (song) => {
                    song = song._source;
                    ListStore.addRow({
                        name: song.name,
                        artist: song.artists[0].name,
                        album: song.album.name,
                        duration: Math.round(song.duration_ms / 60000),
                        rating: Math.round(song.cumulated_user_review_score / song.total_user_reviews)})
                });
                ListStore.populateRows();
            });
        } catch (error) {
            runInAction(() => {
                this.status = error.toString();
            });
        }
    };

    @action getSpecifiedSongsAsync = async () => {
        try {
            let params = {
                name: this.songData.name,
                query: this.query,
            }
            const urlParams = new URLSearchParams(Object.entries(params));
            const data = await this.songService.get(urlParams)
            runInAction(() => {
                this.songData = data;
            });
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