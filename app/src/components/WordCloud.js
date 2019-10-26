import ReactWordCloud from 'react-wordcloud';
import randomColor from 'randomcolor';
import React, {Component} from 'react';
import {observer, inject} from "mobx-react";

@inject("SongStore")
@observer
class WordCloud extends Component {
    render() {
        const {SongStore} = this.props;
        return (
            <ReactWordCloud words={SongStore.wordsForCloud} />
        );
    }
}

export default WordCloud;