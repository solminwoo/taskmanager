import React, { useState, useMemo, useEffect } from 'react';
import Axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';
import useSortableData from './useSortableData'
import TaskTable from './TaskTable'
import styled from 'styled-components';

const Container = styled.div`
	width: 100%;
	min-height:70vh;
	.title{
		font-family: 'Bebas Neue', cursive;
		font-size: 40px;
		text-decoration:none;
		color:#003E51;
		margin-left:20px;
	}
`;
export default function SrotingTable() {
    let [allList, setAllList] = useState([]);
	const getAllTask = () => {
		Axios.get('/api/all')
			.then((res) => {
				const data = res.data;
				setAllList(data);
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
			<TaskTable tasks={allList} />
		</Container>
	);
}
