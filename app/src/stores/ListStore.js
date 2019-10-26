import {observable, action, computed} from "mobx";
import QueryStore from './QueryStore'

class ListStore {
    @observable rows = [];
    @observable page;
    @observable rowsPerPage;
    @observable order = 'asc';
    @observable totalHits = 0;

    fetchedRows = [];

    constructor() {
        this.page = 0;
        this.rowsPerPage = 5;
    }

    @action addRows = (rows) => {
        this.fetchedRows = rows;
        this.populateRows();
    };

    @action populateRows = () => {
        this.rows = this.fetchedRows;
        console.log(this.rows);
    };
    @action addElementsToList = (newElements) => {

        //newElements.forEach((element) => this.list.push(element));
        console.log("ListStore list: " + this.rows);
    };

    @action setOrder = (order, orderBy) => {
        QueryStore.setSort(order, orderBy);
        this.order = QueryStore.sortOrder;
    }

    @action setPage = (page) => {
        this.page = page;
        console.log("From ListStore" + page);
        QueryStore.setOffset(page*this.rowsPerPage);
    }
    @action setPageWithoutDbCall = (page) => {
        this.page = page;
    }

    @action setRowsPerPage = (rowsPerPage) => {
        this.rowsPerPage = rowsPerPage;
        QueryStore.setLimit(rowsPerPage);
    }
    @action setTotalHits = (totalHits) => {
        this.totalHits = totalHits;
    }




}

const store = new ListStore();
export default store;