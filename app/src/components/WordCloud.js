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
                        fontSize: () => Math.round(Math.random() * 50) + 16,
                        color: () => randomColor({
                            hue: 'red'
                        }),
                        padding: 5,
                        height: '100%',
                        width: '100%'
                    }}>
                    <div>why</div>
                    <div>wont</div>
                    <div>this</div>
                    <div>work</div>
                    <div>instead</div>
                    <div>of</div>
                    <div>passing</div>
                    <div>empty</div>
                    <div>div</div>
                    <div>elements</div>
                </TagCloud>
            </div>
        );
    }
}

export default WordCloud;