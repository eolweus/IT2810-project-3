import { observable, action, computed } from "mobx";
import SongStore from './SongStore';
class QueryStore {
    @observable searchString;
    @observable limit;
    @observable offset;
    @observable filterBy;
    @observable greaterThan;
    @observable sortBy;
    @observable sortOrder;

    @action setSearchString = (string) => {
        this.searchString = string;
        SongStore.searchForSongAsync();
    }

    @action setLimit = (limit) => {
        this.limit = limit;
    }
    @action setOffset = (offset) => {
        this.offset = offset;
    }
    @action setFilter = (filterBy, greaterThan) => {
        this.filterBy = filterBy;
        this.greaterThan = greaterThan;
    }

    @action setSort = (sortBy, sortOrder) => {
        this.sortBy = sortBy;
        this.sortOrder = sortOrder;
    }

   /* @computed getQueryString() {
        return [this.searchString, this.limit, this.offset, this.filterBy, this.greaterThan, this.sortBy, this.sortOrder];
    }
*/
    @action clearFilter = () => {
        this.setSearchString(null)
        this.setLimit(null);
        this.setOffset(null);
        this.setFilter(null, null);
        this.setSort(null, null);
    }


}

const store = new QueryStore();
export default store;