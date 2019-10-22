import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import {Container, Grid, CssBaseline, Typography, Paper, AppBar, ListItem, List, OutlinedInput, TextField, Button} from "@material-ui/core";
import InfinityList from "./components/InfinityList";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#8eacbc',
      main: '#607d8c',
      dark: '#34515f',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7539',
      main: '#FF3D00',
      dark: '#c30000',
      contrastText: '#000',
    },
  },
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    paddingTop: theme.spacing(1),
    flexGrow: 1  },
  title: {
    flexGrow: 1,
    color: theme.palette.primary.contrastText,
  },
  subtitle: {
    flexGrow: 1
  },
  footnote: {
    fontsize: 8,
    color: theme.palette.primary.light
  },
  container: {
    padding: theme.spacing(3, 2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing(1),
    color: theme.palette.secondary.main
  },
  outlinedInput: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(1),
  }
}));


@inject("SongStore")
@observer
class App extends Component{

  handleSubmit = (e) => {
    e.preventDefault();
    const song = this.song.value;
    this.props.SongStore.addSong(song);
    //clear input field in order to enable adding more songs
    this.song.value = "";
  }
  filter = (e) => {
    this.props.SongStore.filter = e.target.value;
  }

  render() {
    const {SongStore} = this.props;
    const classes = useStyles;

    return (
        <div className={classes.root} style={{ backgroundColor: theme.palette.primary.main}}>
          <CssBaseline/>
          <Container maxWidth="lg"
                     justifyContent="center"
                     justifyItems="center"
          >
            <Typography component="div" style={{ backgroundColor: theme.palette.primary.light, minHeight: '100vh'}}
                        >
              <AppBar position="static" style={{backgroundColor: theme.palette.primary.dark, height: '8vh'}}>
                <Typography variant="h3" className={classes.title} align="center">
                  Mind Blowing Playlist Display
                </Typography>
                <Typography variant="subtitle2" align="center">
                  brought to you by Group 67
                </Typography>
              </AppBar>

              <Paper className={classes.container} elevation={-10}>
                <Typography className="endless-list" paragraph={true} align="center">
                  <Typography variant="h4" className={classes.subtitle}>
                    Amazing list of Infinity*
                  </Typography>
                  <Typography className={classes.footnote} variant="subttle2">
                    *not actually infinite
                  </Typography>
                  <Grid item md={12}
                    container
                    alignContent="center"
                    alignItems="center"
                    justify="center"
                  >
                    <Paper elevation={10}>
                      <Typography className={classes.container}>
                        <InfinityList/>
                      </Typography>
                    </Paper>
                  </Grid>
                </Typography>

              </Paper>

              <Paper className={classes.container} align="center" elevation={12}>
                <Typography component="div" className="input-container" >
                  <TextField label="Filter" className="filter" value={SongStore.filter} onChange={this.filter.bind(this)} margin="dense" variant="outlined"/>
                  <form className="song-form" onSubmit={e => this.handleSubmit(e)}>
                    <OutlinedInput type="text" placeholder="Enter song title" variant="outlined" margin="dense" inputRef={input => this.song = input}/>
                    <Button variant="contained" style={{backgroundColor: theme.palette.secondary.main}} size="medium" onClick={e => this.handleSubmit(e)}>Add Song</Button>
                  </form>
                </Typography>
                <Typography className="data-container">
                  <Typography variant="h4" className={classes.subtitle} paragraph={true}>
                    You have {SongStore.songCount} songs in your playlist.
                  </Typography>
                  <Typography component="div">
                    <List>
                      {SongStore.filteredSongs.map(song => (
                          <ListItem key={song} divider={true}>
                            {song}
                          </ListItem>
                      ))}
                    </List>
                  </Typography>
                </Typography>
              </Paper>
            </Typography>
          </Container>
        </div>
    );
  }
}

export default App;
