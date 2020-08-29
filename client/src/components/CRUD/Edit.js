import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { Radio, RadioGroup, FormControlLabel, Input, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';


const Container = styled.div`
width: 100%;
.body {
	display: flex;
}
.home-button {
	position: relative;
	left: 80%;
}
.form {
	width: 35%;
	justify-content: center;
}
.form-input {
	margin: 15px 0;
}
.date-input {
	margin: 30px 0;
}
.title {
	text-align: center;
}
.button {
	width:100%
	justify-content: center;
}
.title{
	font-family: 'Bebas Neue', cursive;
	font-size: 40px;
	text-decoration:none;
	color:#003E51;
}
`;

function Edit(props) {
	let [state, setState] = useState({
		title: '',
		description: '',
		progress: 0,
		createdDate: '',
		deadline: '',
		status: '',
	});

	const handleChange = ({ target }) => {
		const { name, value } = target;
		setState({
			...state,
			[name]: value,
		});
	};

	const submit = (event) => {
		event.preventDefault();
		const id = props.match.params.id;
		progressCheck();
		const payload = {
			title: state.title,
			description: state.description,
			progress: parseInt(state.progress),
			createdDate: state.createdDate,
			updatedDate: Date.now(),
			deadline: state.deadline,
			status: state.status,
		};
		axios({
			url: `/api/edit/${id}`,
			method: 'POST',
			data: payload,
		})
			.then(() => {
				props.history.goBack();
			})
			.catch(() => {
				console.log('data sent error');
			});
	};
	const getOneTask = () => {
		const id = props.match.params.id;
		axios
			.get(`/api/${id}`)
			.then((res) => {
				setState(res.data);
			})
			.catch((error) => {
				console.log('Error', error);
			});
	};
	const progressCheck = () => {
		if (state.progress === 0) {
			setState({
				...state,
				status: 'To do',
			});
		} else if (state.progress === 100) {
			setState({
				...state,
				status: 'Completed',
			});
		} else {
			setState({
				...state,
				status: 'In progresss',
			});
		}
	};
	const handleBlur = () => {
		if (state.progress < 0) {
			setState({
				...state,
				progress: 0,
			});
		} else if (state.progress > 100) {
			setState({
				...state,
				progress: 100,
			});
		}
	};
	useEffect(() => {
		getOneTask();
	}, []);
	return (
		<Container>
			<h1 className="title">Edit Task</h1>
			<div className="body">
				<form onSubmit={submit} className="form">
					<div className="form-input">
						<FormControl fullWidth>
							<InputLabel htmlFor="title">Title</InputLabel>
							<Input name="title" id="title" value={state.title} onChange={handleChange} />
						</FormControl>
					</div>
					<div className="form-input">
						<FormControl fullWidth>
							<InputLabel htmlFor="standard-adornment-amount">Progress</InputLabel>
							<Input
								fullWidth
								name="progress"
								type="number"
								value={state.progress}
								onChange={handleChange}
								onBlur={handleBlur}
								inputProps={{
									min: 0,
									max: 100,
									type: 'number',
									'aria-labelledby': 'input-slider',
								}}
							/>
						</FormControl>
					</div>
					<div className="form-input">
						<FormControl fullWidth>
							<InputLabel htmlFor="description">Description</InputLabel>
							<Input
								name="description"
								id="description"
								value={state.description}
								onChange={handleChange}
							/>
						</FormControl>
					</div>
					<div className="form-input date-input">
						<Input
							fullWidth
							name="deadline"
							id="deadline"
							type="date"
							value={state.deadline}
							onChange={handleChange}
						/>
						{/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
								<KeyboardDatePicker
									fullWidth
									disableToolbar
									variant="inline"
									format="MM/dd/yyyy"
									margin="normal"
									id="deadline"
									label="deadline"
									value={state.deadline}
									onChange={handleDateChange}
									KeyboardButtonProps={{
										'aria-label': 'change date',
									}}
								/>
							</MuiPickersUtilsProvider> */}
					</div>
					<div className="outside">
						<Button fullWidth onClick={submit}>
							Submit
						</Button>
					</div>
				</form>
			</div>
		</Container>
	);
}
export default Edit;
