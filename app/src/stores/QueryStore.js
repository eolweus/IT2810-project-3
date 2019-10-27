import {action, observable} from "mobx";
import SongStore from './SongStore';

class QueryStore {
    @observable searchString = null;
    @observable limit = null;
    @observable offset = null;
    @observable filterBy = null;
    @observable greaterThan = null;
    @observable sortBy = null;
    @observable sortOrder = null;

    @action setSearchString = (string) => {
        this.searchString = string;
        SongStore.searchForSongAsync();
    };

    @action setLimit = (limit) => {
        this.limit = limit;
        SongStore.searchForSongAsync();

    };
    @action setOffset = (offset) => {
        this.offset = offset;
        console.log("QueryStore offset: " + offset);
        SongStore.searchForSongWithoutListWipeAsync();
    };
    @action setFilter = (filterBy, greaterThan) => {
        this.filterBy = filterBy;
        this.greaterThan = greaterThan;
        SongStore.searchForSongAsync();
    };

    @action setSort = (sortBy, sortOrder) => {
        this.sortBy = sortBy;
        this.sortOrder = sortOrder;
        SongStore.searchForSongAsync();
    };

    @action clearFilter = () => {
        this.setSearchString(null);
        this.setLimit(null);
        this.setOffset(null);
        this.setFilter(null, null);
        this.setSort(null, null);
    }


}

const store = new QueryStore();
export default store;