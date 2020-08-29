import React from 'react';
import Landing from './components/landing/landing';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import CompletedDetail from './components/Detail/CompletedDetail';
import ToDoDetail from './components/Detail/ToDoDetail';
import InProgressDetail from './components/Detail/InProgressDetail';
import Create from './components/CRUD/Create';
import Edit from './components/CRUD/Edit';

import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import SrotingTable from './components/landing/Sections/Table/SortingTable';

const Container = styled.div`
	.body {
		justify-content: center;
		display: flex;
	}
`;

function App() {
	return (
		<Container>
			<Router>
				<Navbar></Navbar>
				<div className="body">
					<Sidebar></Sidebar>
					<Switch>
						<Route path="/" exact component={SrotingTable} />
						<Route path="/split" exact component={Landing} />
						<Route path="/To_do_detail" exact component={ToDoDetail} />
						<Route path="/In_progress_detail" exact component={InProgressDetail} />
						<Route path="/completed_detail" exact component={CompletedDetail} />

						<Route className="center" path="/create" exact component={Create} />

						<Route path="/edit/:id" exact component={Edit} />
					</Switch>
				</div>
			</Router>
		</Container>
	);
}

export default App;
