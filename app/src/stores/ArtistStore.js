import {observable, action, computed} from "mobx";

class ArtistStore {
    @observable artists = [{name: "", songCount: null, totalRating: null}];

    @computed get artistRating() {
        return this.artists.totalRating;
    }


}


const store = new ArtistStore();
export default store;