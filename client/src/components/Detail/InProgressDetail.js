import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ToDoDetailItem from './DetailItem/ToDoDetailItem';
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
	return (
		<Container>
			{inProgressList.map((task) => (
				<ToDoDetailItem task={task}></ToDoDetailItem>
			))}
		</Container>
	);
};

export default ToDoDetail;
