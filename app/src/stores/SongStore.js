import {observable, action, computed, async, runInAction} from "mobx";
import SongService from "./SongService";

class SongStore {
    @observable songData = {

    };
    @observable status = "initial";
    @observable query = "";

    constructor() {
        this.songService = new SongService();
    }

    @action getAllSongsAsync = async () => {
        try {
            const urlParams = new URLSearchParams(Object.entries());
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

    @action getSpecifiedSongsAsync = async () => {
        try {
            let params = {
                name: this.songData.name,
                query: this.query,
            }
            const urlParams = new URLSearchParams(Object.entries());
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
                this.status = "error";
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
                this.status = "error";
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
                this.status = "error";
            });
        }
    }








}


//export instance of SongStore in order to use the same information in the same store accross the application
const store = new SongStore();
export default store;