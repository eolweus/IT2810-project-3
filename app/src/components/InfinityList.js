import PropTypes from 'prop-types';
import clsx from 'clsx';
import { createMuiTheme, lighten, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableHead, TableRow, TablePagination, TableSortLabel, Toolbar, Typography, Paper, IconButton, Tooltip, FormControlLabel, Switch } from '@material-ui/core';
import React, { Component } from "react";
import Rating from '@material-ui/lab/Rating';
import { observer, inject } from "mobx-react";

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

const useToolbarStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));




const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        padding: theme.spacing(3)
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));


@inject("SongStore", "ListStore")
@observer
class InfinityList extends Component {
    componentDidMount() {
        this.props.SongStore.searchForSongAsync();
    }

    handleChangePage = (event, newPage) => {
        const {ListStore} = this.props;
        ListStore.setPage(newPage);
    };

    handleChangeRowsPerPage = event => {
        const {ListStore} = this.props;
        ListStore.setRowsPerPage(parseInt(event.target.value, 10));
        ListStore.setPage(0);
    };

    handleChangeRating = (e) => {
        try {
            this.rows[e.target.id].rating = e.target.value;
        } catch (e) {

        }

    };

    handleRequestSort = (event, property) => {
        const {ListStore} = this.props;
        const isDesc = ListStore.orderBy === property && ListStore.order === 'desc';
        ListStore.setOrder(isDesc ? 'asc' : 'desc', property);

    };

    EnhancedTableHead(props) {
        const { classes, order, orderBy, rowCount, onRequestSort } = props;
        const createSortHandler = property => event => {
            onRequestSort(event, property);
        };

        const headCells = [
            { id: 'name', numeric: false, disablePadding: false, label: 'Title' },
            { id: 'artist', numeric: false, disablePadding: false, label: 'Artist' },
            { id: 'album', numeric: false, disablePadding: false, label: 'Album' },
            { id: 'duration', numeric: true, disablePadding: false, label: 'Duration' },
            { id: 'rating', numeric: true, disablePadding: false, label: 'Rating' },
        ];

        return (
            <TableHead>
                <TableRow>
                    {headCells.map(headCell => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                            padding={headCell.disablePadding ? 'none' : 'default'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={order}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <span className={classes.visuallyHidden}>
                                    </span>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }


    render() {
        const {ListStore} = this.props;
        const classes = useStyles;

        this.EnhancedTableHead.propTypes = {
            classes: PropTypes.object.isRequired,
            onRequestSort: PropTypes.func.isRequired,
            order: PropTypes.oneOf(['asc', 'desc']).isRequired,
            orderBy: PropTypes.string.isRequired,
            rowCount: PropTypes.number.isRequired,
        };

        const rowLength = ListStore.rowCount;

        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <div className={classes.tableWrapper}>
                        <Table
                            className={classes.table}
                            size={'medium'}
                            aria-label="enhanced table"
                        >{this.EnhancedTableHead(
                            {classes: classes, order: ListStore.order, orderBy: ListStore.orderBy, rowCount: rowLength, onRequestSort: this.handleRequestSort}
                        )}
                            <TableBody>
                                {ListStore.rows.slice(ListStore.page * ListStore.rowsPerPage, ListStore.page * ListStore.rowsPerPage + ListStore.rowsPerPage)
                                    .map((row, index) => {
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                key={row.name}
                                            >
                                                <TableCell component="th" id={labelId} scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="left">{row.artist}</TableCell>
                                                <TableCell align="left">{row.album}</TableCell>
                                                <TableCell align="right">{row.duration}</TableCell>
                                                <TableCell align="right" id={index}>
                                                    <Rating name="rating" value={row.rating} precision={1} size="small"
                                                            onChange={e => this.handleChangeRating(e)}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </div>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={ListStore.rowCount}
                        rowsPerPage={ListStore.rowsPerPage}
                        page={ListStore.page}
                        backIconButtonProps={{
                            'aria-label': 'previous page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'next page',
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        );
    }

}

export default InfinityList;
