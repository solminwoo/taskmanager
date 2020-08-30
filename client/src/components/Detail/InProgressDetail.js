import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import InProgressDetailItem from './DetailItem/InProgressDetailItem';
import Axios from 'axios';

const Container = styled.div`
padding-top:20px;

	.home-button {
		position: relative;
		left: 80%;
	}
	justify-content: center;
	width: 100%;
`;

const ToDoDetail = (props) => {
	let [inProgressList, setInProgressList] = useState([]);

	const getAllTask = () => {
		Axios.get('/api/inprogresslist')
			.then((res) => {
				console.log('Data have been received');
				const data = res.data;
				setInProgressList(data);
			})
			.catch((error) => {
				console.log('Error', error);
			});
	};
	useEffect(() => {
		getAllTask();
	}, []);
	if (Boolean(inProgressList.length === 0)) {
		return (
			<Container>
				<h1>There is no task is "In progress"!</h1>
			</Container>
		);
	} else {
		return (
			<Container>
				{inProgressList.map((task) => (
					<InProgressDetailItem task={task}></InProgressDetailItem>
				))}
			</Container>
		);
	}
};

export default ToDoDetail;
