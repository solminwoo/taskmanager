import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ToDoDetailItem from './DetailItem/ToDoDetailItem';
import Axios from 'axios';

const Container = styled.div`
	padding-top: 20px;
	.home-button {
		position: relative;
		left: 80%;
	}
	justify-content: center;
	width: 100%;
`;

const ToDoDetail = (props) => {
	let [toDoList, setToDoList] = useState([]);

	const getAllTask = () => {
		Axios.get('/api/todolist')
			.then((res) => {
				console.log('Data have been received');
				const data = res.data;
				setToDoList(data);
				console.log(data);
				console.log(toDoList);
			})
			.catch((error) => {
				console.log('Error', error);
			});
	};
	useEffect(() => {
		getAllTask();
	}, []);

	if (Boolean(toDoList.length === 0)) {
		return (
			<Container>
				<h1>There is no task is "To do"!</h1>
			</Container>
		);
	} else {
		return (
			<Container>
				{toDoList.map((task) => (
					<ToDoDetailItem task={task}></ToDoDetailItem>
				))}
			</Container>
		);
	}
};

export default ToDoDetail;
