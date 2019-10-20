import {observable, action, computed} from "mobx";

class SongStore {
    @observable songs = [];

    @action addSong = (song) => {
        this.songs.push(song);
    }

    @computed get songCount() {
        return this.songs.length;
    }
}


//export instance of SongStore in order to use the same information in the same store accross the application
const store = new SongStore();
export default store;