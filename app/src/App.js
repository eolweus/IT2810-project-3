import React, {Component} from 'react';
import {inject, observer} from "mobx-react";

@inject("SongStore")
@observer
class App extends Component{

  handleSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    const {SongStore} = this.props;

    return (
        <div className="App">
          <h2>You have {SongStore.songCount} songs in your playlist.</h2>

          <form onSubmit={e => handleSubmit(e)}>
            <input type="text" placeholder="Enter song title:" ref={input => this.song = input}/>
            <button>Add Song</button>
          </form>
        </div>
    );
  }
}

export default App;
