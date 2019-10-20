import React, {Component} from 'react';
import {inject, observer} from "mobx-react";

@inject("SongStore")
@observer
class App extends Component{

  handleSubmit = (e) => {
    e.preventDefault();
    const song = this.song.value;
    this.props.SongStore.addSong(song);
    //empty input field in order to enable adding more songs
    this.song.value = "";
  }

  render() {
    const {SongStore} = this.props;

    return (
        <div className="App">

          <h2>You have {SongStore.songCount} songs in your playlist.</h2>

          <form onSubmit={e => this.handleSubmit(e)}>
            <input type="text" placeholder="Enter song title" ref={input => this.song = input}/>
            <button>Add Song</button>
          </form>

          <ul>
            {SongStore.songs.map(song => (
                <li key={song}>
                  {song}
                </li>
            ))}
          </ul>
        </div>
    );
  }
}

export default App;
