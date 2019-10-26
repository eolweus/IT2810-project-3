import ReactWordCloud from 'react-wordcloud';
import randomColor from 'randomcolor';
import React, {Component} from 'react';
import {observer, inject} from "mobx-react";

@inject("SongStore")
@observer
class WordCloud extends Component {
    componentDidMount() {
        setInterval(() => {
            this.forceUpdate();
        }, 8000);
    }

    render() {
        const {SongStore} = this.props;
        return (
            <ReactWordCloud words={SongStore.wordCloud}/>
        );
    }
}

export default WordCloud;