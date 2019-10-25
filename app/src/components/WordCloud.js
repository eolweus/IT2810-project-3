import TagCloud from 'react-tag-cloud';
import randomColor from 'randomcolor';
import React, {Component} from 'react';

const text = "why won't this work instead of passing empty divs".split(" ");

class WordCloud extends Component {
    render() {
        return (
            <TagCloud
                className='tag-cloud'
                style={{
                    fontSize: () => Math.round(Math.random() * 50) + 16,
                    color: () => randomColor({
                        hue: 'red'
                    }),
                    padding: 5,
                    height: '100%',
                    width: '100%'
                }}>
                {text.map(word => (
                    <div>{word}</div>
                ))}
            </TagCloud>
        );
    }
}

export default WordCloud;