import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import CompletedItem from './Items/CompletedItem'
const Container = styled.div`
	border: 2px solid #557A95;
	border-radius: 15px;
	width: 30%;
	min-height:70vh;
	margin:0 1vw;
	.title{
		font-family: 'Bebas Neue', cursive;
		font-size: 40px;
		text-decoration:none;
		color:#003E51;
		margin-left:20px;
	}
`;

const Completed = (props) => {
	let [state, setState] = useState({
		_id: '',
		title: '',
		description: '',
		progress: 0,
		createdDate: '',
		deadline: '',
		status: '',
		allList: [],
		initiated:"",

	});
    let [completedList, setCompletedList] = useState([]);
    
	const getAllTask = () => {
		Axios.get('/api/completedlist')
			.then((res) => {
				console.log('Data have been received');
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
	return (
		<Container>
			<h1>
				<Link className='title' to="completed_detail">Completed</Link>
			</h1>
			<hr></hr>
            {completedList.map((task) => (
			<CompletedItem  task={task}></CompletedItem>

			))}
				{/* {completedList.map(task => <li key={task._id}>{task.title}</li>)} */}
				{/* {props.list.map(task => (
					<li><h5>{task.title}</h5></li>
					<li>{task.description}</li>
					<li>{task.deadline}</li>
				))} */}
		</Container>
	);
};

export default Completed;
