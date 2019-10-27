import ReactWordCloud from 'react-wordcloud';
import React, {Component} from 'react';
import {observer, inject} from "mobx-react";

@inject("SongStore")
@observer
class WordCloud extends Component {
    componentDidMount() {
        this.forceUpdate();
    }

    render() {
        const {SongStore} = this.props;
        if (SongStore.renderCloud === true) {
            return (
                <ReactWordCloud words={SongStore.wordCloud}/>
            );
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default WordCloud;