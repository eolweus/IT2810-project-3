import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import {Container, Grid, CssBaseline, Typography, Paper, AppBar, ListItem, List, OutlinedInput, TextField, Button} from "@material-ui/core";

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
        padding: theme.spacing(3, 2)
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

@inject("QueryStore")
@observer
class DataQuerying extends Component {

    render() {
        return(
            <Typography>
                <Paper>

                </Paper>
            </Typography>
        );
    }


}


export default DataQuerying;