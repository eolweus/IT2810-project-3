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

    createData(name, artist, album, duration, rating) {
        return { name, artist, album, duration, rating };
    }

    stableSort(array, cmp) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = cmp(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map(el => el[0]);
    }

    getSorting(order, orderBy) {
        return order === 'desc' ? (a, b) => this.desc(a, b, orderBy) : (a, b) => -this.desc(a, b, orderBy);
    }

    desc(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    handleChangePage = (event, newPage) => {
        const {ListStore} = this.props;
        ListStore.setPage(newPage);
    };

    handleChangeRowsPerPage = event => {
        const {ListStore} = this.props;
        this.setRowsPerPage(parseInt(event.target.value, 10));
        this.setPage(0);
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
        ListStore.setOrder(isDesc ? 'asc' : 'desc');
        ListStore.setOrderBy(property);
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
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
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

        const [order]= [ListStore.order];
        const setOrder = ListStore.setOrder;
        const [orderBy, setOrderBy] = [ListStore.orderBy, ListStore.setOrderBy];
        const [page, serPage] = [ListStore.page, ListStore.setPage];
        const [rowsPerPage, setRowsPerPage] = [ListStore.rowsPerPage, ListStore.setRowsPerPage];

        const rows = [
            this.createData('Ja Vi Elsker', "Bjørnstjerne Bjørnson", "N/A", 2, 1),
            this.createData('Vi Ska Fæst', "DDE", "Rai-Rai", 5.90, 5),
            this.createData('E6', "DDE", "Rai-Rai", 6, 3),
            this.createData('Dovregubbens Hall', "Edvard Grieg", "N/A", 8, 1),
            this.createData('Nu Klinger', "Frode Rinnan", "Cassa Rossa", 4, 2),
            this.createData('Raske Briller', "Nicolay Ramm", "Raske Briller", 2, 4),
            this.createData('Sound of Silence', "Pentatonix", "Sounds of Silence", 8, 3),

        ];

        this.EnhancedTableHead.propTypes = {
            classes: PropTypes.object.isRequired,
            onRequestSort: PropTypes.func.isRequired,
            order: PropTypes.oneOf(['asc', 'desc']).isRequired,
            orderBy: PropTypes.string.isRequired,
            rowCount: PropTypes.number.isRequired,
        };

        const rowLength = 80;

        const hrs = this.handleRequestSort();

        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <div className={classes.tableWrapper}>
                        <Table
                            className={classes.table}
                            size={'medium'}
                            aria-label="enhanced table"
                        >{this.EnhancedTableHead(
                            [classes, order, orderBy, rowLength, this.handleRequestSort]
                        )}
                            <TableBody>
                                {this.stableSort(rows, this.getSorting(ListStore.order, ListStore.orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                                                    <Rating name="rating" value={row.rating} precision={0.5} size="small"
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
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
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
