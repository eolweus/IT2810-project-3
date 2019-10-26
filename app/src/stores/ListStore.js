import {observable, action, computed} from "mobx";
import QueryStore from './QueryStore'

class ListStore {
    @observable rows = [];
    @observable page;
    @observable rowsPerPage;
    @observable order;
    @observable orderBy;

    fetchedRows = [];

    constructor() {
        this.page = 0;
        this.rowsPerPage = 10;
        this.order = 'asc';
        this.orderBy = 'Title';
    }

    @action addRows = (rows) => {
        this.fetchedRows = rows;
        this.populateRows();
    }

    @action populateRows = () => {
        this.rows = this.fetchedRows
    }

    @action setOrder = (order, orderBy) => {
        QueryStore.setSort(order, orderBy);
        this.order = QueryStore.sortOrder;
        this.orderBy = QueryStore.sortBy;
    }

    @action setPage = (page) => {
        this.page = page;
    }

    @action setRowsPerPage = (rowsPerPage) => {
        this.rowsPerPage = rowsPerPage;
        QueryStore.setLimit(rowsPerPage);
    }

    @computed get rowCount() {
        return this.rows.length;
    }



}

const store = new ListStore();
export default store;