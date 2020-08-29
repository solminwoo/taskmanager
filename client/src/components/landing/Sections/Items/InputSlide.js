import React, { useState,useEffect } from 'react';
import { Grid, Slider, Input,Button } from '@material-ui/core/';
import axios from 'axios';

export default function InputSlide(props) {
	let [state, setState] = useState({
		_id: '',
		title: '',
		description: '',
		progress: 0,
		createdDate: '',
		deadline: '',
		status: '',
		displaySubDiv: false,
		initiated: '',
	});
	let [color, setColor] = useState({
		x: 246 - 2 * props.task.progress,
		y: 54 + 1.5 * props.task.progress,
		z: 53 + 0.6 * props.task.progress,
	});

	const handleSliderChange = (event, newValue) => {
		setState({
			...state,
			progress: newValue,
		});
		setState({
			...state,
			progress: newValue,
		});
		setColor({
			x: 246 - 2 * newValue,
			y: 54 + 1.5 * newValue,
			z: 53 + 0.6 * newValue,
		});
	};

	const handleInputChange = (event) => {
		setState({
			...state,
			progress: event.target.value,
		});
		setColor({
			x: 246 - 2 * event.target.value,
			y: 54 + 1.5 * event.target.value,
			z: 53 + 0.6 * event.target.value,
		});
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
	const setStateAsProps = () => {
		setState({
			title: props.task.title,
			description: props.task.description,
			progress: props.task.progress,
			createdDate: props.task.createdDate,
			updatedDate: props.task.updatedDate,
			deadline: props.task.deadline,
			status: props.task.status,
		});
	};
	const submit = (event) => {
		event.preventDefault();
		const payload = {
			title: props.task.title,
			description: props.task.description,
			progress: state.progress,
			createdDate: props.task.createdDate,
			updatedDate: Date.now(),
			deadline: props.task.deadline,
			status: props.task.status,
		};
		console.log(payload);
		axios({
			url: `/api/edit/${props.task._id}`,
			method: 'POST',
			data: payload,
		})
			.then(() => {
				refreshPage();
			})
			.catch(() => {
				console.log('data sent error');
			});
	};
	function refreshPage() {
		window.location.reload(true);
	};
	useEffect(() => {
		setStateAsProps();
	}, []);
	return (
		<div>
			<Grid container spacing={2} alignItems="center">
				<Grid item xs>
					<Slider
						value={typeof state.progress === 'number' ? state.progress : 0}
						onChange={handleSliderChange}
						aria-labelledby="input-slider"
					/>
				</Grid>
				<Grid item>
					<Input
						value={state.progress}
						margin="dense"
						onChange={handleInputChange}
						onBlur={handleBlur}
						style={{ color: 'rgba(' + color.x + ',' + color.y + ',' + color.z + ')' }}
						inputProps={{
							step: 10,
							min: 0,
							max: 100,
							type: 'number',
							'aria-labelledby': 'input-slider',
						}}
					/>
				</Grid>
				<Grid item>
					<Button variant="contained" color="primary" onClick={submit}>
						Submit
					</Button>
				</Grid>
			</Grid>
		</div>
	);
}
