import {observable, action, computed} from "mobx";

class ListStore {
    @observable order = 'asc';
    @observable orderBy = 'title';
    @observable page = 0;
    @observable rowsPerPage = 5;

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