import {observable, action, computed} from "mobx";

class ListStore {
    @observable rows = [];
    @observable order;
    @observable orderBy;
    @observable page;
    @observable rowsPerPage;

    fetchedRows = [];

    constructor() {
        this.order = 'asc';
        this.orderBy = 'title';
        this.page = 0;
        this.rowsPerPage = 5;
    }

    @action addRows = (rows) => {
        this.fetchedRows = rows;
        this.populateRows();
    }

    @action populateRows = () => {
        this.rows = this.fetchedRows
    }

    @action setOrder = (order) => {
        this.order = order;
    }

    @action setOrderBy = (orderBy) => {
        this.orderBy = orderBy;
    }

    @action setPage = (page) => {
        this.page = page;
    }

    @action setRowsPerPage = (rowsPerPage) => {
        this.rowsPerPage = rowsPerPage;
    }



}

const store = new ListStore();
export default store;