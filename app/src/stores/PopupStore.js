import {observable, action} from "mobx";

class PopupStore {
    @observable image
    @observable album
    @observable artist
    @observable name
    @observable url

    @observable show

    constructor() {
        this.show = false
        this.image = "https://i.scdn.co/image/ab67616d00001e021611cadc919496a29d038213"
    }

    @action updatePopup = (imageURL) => {
        this.image= imageURL
    }

    @action togglePopup() {
        this.show = !this.show
    }

    @action showPopup() {
        this.show = true
    }

    @action hidePopup() {
        this.show = false
    }

}

const store = new PopupStore();
export default store;
