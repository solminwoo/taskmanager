import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Axios from 'axios';
import Popup from "reactjs-popup";
import ToDoItem from "./Items/ToDoItem";
import styled from 'styled-components';

const Container = styled.div`
	border: 2px solid #557A95;
	border-radius: 15px;
	width: 30%;
	margin:0 1vw;
	min-height:70vh;
	.title{
		font-family: 'Bebas Neue', cursive;
		font-size: 40px;
		text-decoration:none;
		color:#003E51;
		margin-left:20px;
	}
`;

const ToDo = (props) => {
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
	let [toDoList, setToDoList] = useState([]);
	const getAllTask = () => {
		Axios.get('/api/todolist')
			.then((res) => {
				console.log(res.data);
				const data = res.data;
				setToDoList(data);
			})
			.catch((error) => {
				console.log('Error', error);
			});
	};
	const deleteTask = (event) => {
		const id = Axios({
			url: `/api/delete/${id}`,
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
	useEffect(() => {
		getAllTask();
	}, []);
	return (
		<Container>
			<h1>
				<Link className='title' to="/To_do_detail">To do</Link>
			</h1>
			<hr></hr>
			{toDoList.map((task) => (
			<ToDoItem key={task._id} task={task}></ToDoItem>

			))}
			{/* <div className="tasks">
				{toDoList.map((task) => (
					<div key={task._id} className="single-task">
						<p>{task.title}</p>
						<div className="edit-button">
							<Link to={{ pathname: `/edit/${task._id}` }}>Edit</Link>
							<Popup trigger={<button>trigger</button>} position="right center">
								<div>content</div>
							</Popup>

							<form onSubmit={deleteTask}>
								<input type="hidden" value={task._id} name="id"/>
								<button>Delete</button>
							</form>
						</div>
					</div>
				))}
			</div> */}
		</Container>
	);
};

export default ToDo;
