import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {createMuiTheme, makeStyles} from '@material-ui/core/styles';
import {Checkbox, FormControlLabel, TextField, Typography} from "@material-ui/core";

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

    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

@inject("QueryStore")
@observer
class DataQuerying extends Component {
    constructor(props) {
        super(props);
        this.state = {checkedFilterHasReviews: false}
    }

    sendUserInput(searchString) {
        const {QueryStore} = this.props;
        QueryStore.setSearchString(searchString);

    }

    render() {
        const {QueryStore} = this.props;
        const classes = useStyles;
        return (
            <Typography>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={this.state.checkedFilterHasReviews}
                            onChange={(ev) => {
                                this.setState({checkedFilterHasReviews: !this.state.checkedFilterHasReviews});
                                if (this.state.checkedFilterHasReviews) {
                                    QueryStore.setFilter(null, null);
                                } else {
                                    QueryStore.setFilter('total_user_reviews', 3);
                                }
                            }}
                            value="filterHasReview"
                            color={theme.palette.secondary.main}
                        />
                    }
                    label="Has high user reviews"
                />
                <TextField
                    id="outlined-search"
                    label="Search field"
                    type="search"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    onKeyPress={(ev) => {
                        console.log(`Pressed keyCode ${ev.key}`);
                        if (ev.key === 'Enter') {
                            ev.preventDefault();
                            this.sendUserInput(ev.target.value);
                        }
                    }}
                />
            </Typography>
        );
    }


}


export default DataQuerying;