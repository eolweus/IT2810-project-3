import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {createMuiTheme, makeStyles} from '@material-ui/core/styles';
import {Checkbox, FormControlLabel, TextField, Typography} from "@material-ui/core";


@inject("QueryStore")
@observer
class DataQuerying extends Component {
    constructor(props) {
        super(props);
        this.state = {checkedFilterHasReviews: false}
    }


    sendUserInput(searchString) {
        const {QueryStore} = this.props;

        if (this.state.checkedFilterHasReviews) {
            QueryStore.setFilter('total_user_reviews', 1);
        } else {
            QueryStore.setFilter(null, null);
        }
        QueryStore.setSearchString(searchString);

    }

    render() {

        return (
            <Typography>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={this.state.checkedFilterHasReviews}
                            onChange={(ev) => {
                                this.setState({checkedFilterHasReviews: !this.state.checkedFilterHasReviews})
                            }}
                            value="filterHasReview"
                            color="secondary"
                        />
                    }
                    label="Has user reviews"
                />
                <TextField
                    id="outlined-search"
                    label="Search field"
                    type="search"
                    className={TextField}
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