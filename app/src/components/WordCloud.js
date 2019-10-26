import ReactWordCloud from 'react-wordcloud';
import React, {Component} from 'react';
import {inject, observer} from "mobx-react";

@inject("SongStore")
@observer
class WordCloud extends Component {
    componentDidMount() {

        this.forceUpdate();

    }

    render() {
        const {SongStore} = this.props;
        return (<div></div>
            //<ReactWordCloud words={SongStore.wordCloud}/>
        );
    }
}

export default WordCloud;