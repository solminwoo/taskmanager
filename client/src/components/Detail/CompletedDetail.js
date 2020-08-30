import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CompletedDetailItem from './DetailItem/CompletedDetailItem';
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

const CompletedDetail = (props) => {
	let [completedList, setCompletedList] = useState([]);

	const getAllTask = () => {
		Axios.get('/api/completedlist')
			.then((res) => {
				const data = res.data;
				setCompletedList(data);
			})
			.catch((error) => {
				console.log('Error', error);
			});
	};
	useEffect(() => {
		getAllTask();
	}, []);
	if (Boolean(completedList.length === 0)) {
		return (
			<Container>
				<h1>There is no task is "Completed"!</h1>
			</Container>
		);
	} else {
		return (
			<Container>
				{completedList.map((task) => (
					<CompletedDetailItem task={task}></CompletedDetailItem>
				))}
			</Container>
		);
	}
};

export default CompletedDetail;
