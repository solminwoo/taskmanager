import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Axios from 'axios';
import Popup from 'reactjs-popup';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Slider, Input, Grid } from '@material-ui/core';
import DownArrow from '../../../../assets/DownArrow';
import UpArrow from '../../../../assets/UpArrow';
import InputSlide from './InputSlide';

const Container = styled.div`
	border: 2px solid #7395ae;
	border-radius: 5px;
	width: 90%;
	margin: 1vh 1vw;
	-webkit-box-shadow: 0 8px 6px -6px black;
	-moz-box-shadow: 0 8px 6px -6px black;
	box-shadow: 0 8px 6px -6px black;

	.single-task {
		display: flex;
		// width:fit-content;
	}
	p {
		margin: 0;
	}
	.action {
		right: 0;
		display: flex;
	}
	.sub-div {
		padding: 1vh;
		height: fit-content;
		background-color: rgba(0, 0, 0, 0.07);
	}
	.arrow-cover-button {
		style: none;
	}
	.card-progress {
		display: flex;
		align-content: center;
		font-family: 'Bebas Neue', cursive;
		font-size: 2vh;
	}
	.button {
		padding: 0;
		min-width: 1vw;
		height: 3vh;
	}
	.margin {
		margin: 0 0.2vw;
	}
	.card-description {
		width: 100%;
		display: block;
	}
	.color1 {
		color: rgba(46, 204, 113, 1);
	}
	.color2 {
		color: rgba(246, 54, 53, 1);
	}
`;
const useStyles = makeStyles({
	root: {
		width: 250,
	},
	input: {
		width: 42,
	},
});
const ToDoItem = (props) => {
	const classes = useStyles();
	let [color, setColor] = useState({
		x: 246 - 2 * props.task.progress,
		y: 54 + 1.5 * props.task.progress,
		z: 53 + 0.6 * props.task.progress,
	});
	let [state, setState] = useState({
		_id: '',
		title: '',
		description: '',
		progress: 0,
		createdDate: '',
		deadline: '',
		status: '',
		allList: [],
		displaySubDiv: false,
		initiated: '',
	});
	let [toDoList, setToDoList] = useState([]);
	const getAllTask = () => {
		Axios.get('/api/inprogresslist')
			.then((res) => {
				const data = res.data;
				setToDoList(data);
			})
			.catch((error) => {
				console.log('Error', error);
			});
	};
	const deleteTask = () => {
		Axios({
			url: `/api/delete/${props.task._id}`,
			method: 'DELETE',
		})
			.then((res) => {
				console.log('Data have been deleted');
				const data = res.data;
				setToDoList(data);
			})
			.catch((error) => {
				console.log('Error', error);
			});
	};
	const toggleSubDiv = () => {
		setState({
			...state,
			displaySubDiv: !state.displaySubDiv,
		});
		console.log(state.displaySubDiv);
	};

	const handleChange = ({ target }) => {
		const { name, value } = target;

		setState({
			...state,
			[name]: value,
		});
	};

	const handleSliderChange = (event, newValue) => {
		// setValue(newValue);
		setState({
			...state,
			progress: newValue,
		});
	};
	const handleInputChange = (event) => {
		setState({
			...state,
			progress: event.target.value,
		});
		// setValue(event.target.value === '' ? '' : Number(event.target.value));
	};
	useEffect(() => {
		getAllTask();
	}, []);
	return (
		<Container>
			<div className="task">
				<div key={props.task._id} className="single-task">
					<Grid item xs={1}></Grid>
					<Grid item xs={4}>
						<p>{props.task.title}</p>
					</Grid>
					<Grid item xs={2}>
						<p
							className="card-progress"
							style={{ color: 'rgba(' + color.x + ',' + color.y + ',' + color.z + ')' }}
						>
							{props.task.progress}
						</p>
					</Grid>
					<Grid item xs={1}>
						<div className="action margin">
							<Link to={{ pathname: `/edit/${props.task._id}` }}>
								<button>Edit</button>
							</Link>
							{/* <Popup trigger={<button>trigger</button>} position="right center">
							<div>content</div>
						</Popup> */}

							<form className="margin" onSubmit={deleteTask}>
								<input type="hidden" value={props.task._id} name="id" />
								<button>Delete</button>
							</form>
							<Button className="button margin" onClick={toggleSubDiv} variant="contained">
								{state.displaySubDiv ? <UpArrow></UpArrow> : <DownArrow></DownArrow>}
							</Button>
						</div>
					</Grid>
				</div>
				{state.displaySubDiv ? (
					<div className="sub-div">
						<div className="card-description">
							<p>{props.task.description}</p>
						</div>
						<div>
							<InputSlide task={props.task}></InputSlide>
							{/* <SlideInput task={props.task}></SlideInput> */}
						</div>
					</div>
				) : (
					<div></div>
				)}
			</div>
		</Container>
	);
};

export default ToDoItem;
