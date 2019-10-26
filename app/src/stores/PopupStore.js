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
        this.image = "https://images.genius.com/acc119aa004ef3bb9fef2f340122a552.1000x1000x1.jpg"
        this.album = ""
        this.artist = ""
        this.name = "mangetsu"
        this.url = ""
    }

    @action updatePopup = (name, artist, album, url) => {
        this.name = name
        this.artist = artist
        this.album = album
        this.url = url
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
