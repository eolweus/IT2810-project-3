import {observable, action, computed} from "mobx";

class SongStore {
    @observable songs = [];
    @observable filter = "";

    @action addSong = (song) => {
        this.songs.push(song);
    }

    @computed get songCount() {
        return this.songs.length;
    }

    @computed get filteredSongs() {
        let matchesFilter = new RegExp(this.filter, "i");
        return this.songs.filter(song => !this.filter || matchesFilter.test(song));
    }
}


//export instance of SongStore in order to use the same information in the same store accross the application
const store = new SongStore();
export default store;