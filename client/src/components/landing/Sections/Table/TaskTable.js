import styled from 'styled-components';
import React, { useState, useMemo, useEffect } from 'react';
import Axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';
import useSortableData from './useSortableData';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const Container = styled.div`
	justify-content: center;
	width: 100%;
	.center {
		text-align: center;
	}
	.blue {
		color: #7395ae;
	}
`;
const useStyles = makeStyles({
	root: {
		width: '100%',
	},
});

const columns = [
	{ id: 'title', label: 'Title', minWidth: 170 },
	{ id: 'description', label: 'Descripion', minWidth: 100 },
	{
		id: 'progress',
		label: 'Progress',
		minWidth: 170,
		align: 'right',
		format: (value) => value.toLocaleString('en-US'),
	},
	{
		id: 'status',
		label: 'Status',
		minWidth: 170,
		align: 'right',
		format: (value) => value.toLocaleString('en-US'),
	},
	{
		id: 'deadline',
		label: 'Dealine',
		minWidth: 170,
		align: 'right',
		format: (value) => moment(value).format('MM-DD-YYYY'),
	},
	{
		id: 'action',
		label: 'Action',
		minWidth: 170,
		align: 'right',
		format: (value) => moment(value).format('MM-DD-YYYY'),
	},
];

const TaskTable = (props) => {
	function createData(title, description, progress, status, deadline) {
		return { title, description, progress, status, deadline };
	}
	const rows = props.tasks;

	const classes = useStyles();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};
	const { items, requestSort, sortConfig } = useSortableData(props.tasks);
	const getClassNamesFor = (name) => {
		if (!sortConfig) {
			return;
		}
		return sortConfig.key === name ? sortConfig.direction : undefined;
	};
	const deleteTask = (_id) => {
		Axios({
			url: `/api/delete/${_id}`,
			method: 'DELETE',
		})
			.then((res) => {
				refreshPage();
			})
			.catch((error) => {
				console.log('Error', error);
			});
	};

	function refreshPage() {
		window.location.reload(true);
	}
	return (
		<Container>
			<Paper className={classes.root}>
				<TableContainer className={classes.container}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								{columns.map((column) => (
									<TableCell
										className="center"
										key={column.id}
										align={column.align}
										style={{ minWidth: column.minWidth }}
									>
										<Button
											onClick={() => requestSort(`${column.id}`)}
											className={getClassNamesFor(`${column.id}`)}
											>
											<p className="blue">
											{column.label}
											</p>
										</Button>
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
								return (
									<TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
										{columns.map((column) => {
											if (column.id !== 'action') {
												const value = row[column.id];
												return (
													<TableCell className="center" key={column.id} align={column.align}>
														{column.format && typeof value === 'number'
															? column.format(value)
															: column.id === 'deadline'
															? column.format(value)
															: value}
													</TableCell>
												);
											} else {
												return (
													<TableCell className="center" key={column.id} align="right">
														<Link
															style={{ textDecoration: 'none' }}
															to={{ pathname: `/edit/${row._id}` }}
														>
															<Button>Edit</Button>
														</Link>

														<Button
															onClick={() => {
																deleteTask(row._id);
															}}
														>
															Delete
														</Button>
													</TableCell>
												);
											}
										})}
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Paper>
		</Container>
	);
};
export default TaskTable;
