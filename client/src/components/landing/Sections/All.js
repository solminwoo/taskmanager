import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Axios from 'axios';
import Popup from 'reactjs-popup';
import AllItem from './Items/AllItem';

const Container = styled.div`
	border: 2px solid black;
	width: 30%;
	margin: 0 1vw;
`;

const All = (props) => {
	let [state, setState] = useState({
		_id: '',
		title: '',
		description: '',
		progress: 0,
		createdDate: '',
		deadline: '',
		status: '',
		allList: [],
		initiated: '',
	});
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
	const deleteTask = (event) => {
		const id = Axios({
			url: `/api/delete/${id}`,
			method: 'DELETE',
		})
			.then((res) => {
				console.log('Data have been deleted');
				const data = res.data;
				setAllList(data);
			})
			.catch((error) => {
				console.log('Error', error);
			});
    };
    const sortList=()=>{
        Axios.get('/api/sortedList')
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
			<h1>
				<Link to="/all_detail">All</Link>
                <button onClick={sortList}>Sort</button>
			</h1>
			<hr></hr>
			{allList.map((task) => (
				<AllItem task={task}></AllItem>
			))}
			{/* <div className="tasks">
				{AllList.map((task) => (
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
			<hr></hr>

			<p>something</p>
		</Container>
	);
};

export default All;
