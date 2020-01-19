import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
	table: {
		minWidth: 650,
	},
	titleContainer: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: theme.spacing(2),
	},
}));

function SimpleTable(props) {
	const classes = useStyles();

	const {
		tableTitle = 'Title',
		dataList = [[]],
		rowTitles = [],
		history,
		routeName = '',
	} = props;
	return (
		<>
			<div className={classes.titleContainer}>
				<h1>{tableTitle}</h1>
				<Fab
					color='primary'
					onClick={() =>
						routeName && history.push(`/${routeName}/create`)
					}
				>
					<AddIcon />
				</Fab>
			</div>
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label='simple table'>
					<TableHead>
						<TableRow head='head'>
							{rowTitles.map(title => (
								<TableCell key={title}>{title}</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{dataList.map(row => (
							<TableRow
								key={row[0]}
								hover
								onClick={() =>
									routeName &&
									history.push(`/${routeName}/${row[0]}`)
								}
							>
								{row.map(val => (
									<TableCell key={val + row[0]}>
										{val}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}

export default withRouter(SimpleTable);
