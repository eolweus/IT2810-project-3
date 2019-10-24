import TagCloud from 'react-tag-cloud';
import randomColor from 'randomcolor';
import React, {Component} from 'react';

class WordCloud extends Component {
    render() {
        return (
            <div className='app-outer'>
                <TagCloud
                    className='tag-cloud'
                    style={{
                        fontFamily: 'sans-serif',
                        fontSize: () => Math.round(Math.random() * 50) + 16,
                        color: () => randomColor({
                            hue: 'blue'
                        }),
                        padding: 5,
                    }}>
                    <div>Futurama</div>
                    <div >Transformers</div>
                    <div >Simpsons</div>
                    <div >Dragon Ball</div>
                    <div >Rick & Morty</div>
                    <div >He man</div>
                    <div >World trigger</div>
                    <div >Avengers</div>
                    <div >Family Guy</div>
                    <div >American Dad</div>
                </TagCloud>
            </div>
        );
    }
}

export default WordCloud;