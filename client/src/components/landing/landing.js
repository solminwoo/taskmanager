import React, { useState, useEffect } from 'react';
import ToDo from './Sections/ToDo';
import InProgress from './Sections/InProgress';
import Completed from './Sections/Completed';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Axios from 'axios';
import All from './Sections/All';
import SortingTable from './Sections/Table/SortingTable';
import styled from 'styled-components';
const Container = styled.div`
	margin-top: 20px;
	justify-content: center;
	width: 100%;
	.body {
		justify-content: center;
		display: flex;
	}
	.create-button {
		position: relative;
		left: 80%;
	}
`;
const Landing = (props) => {
	return (
		<Container>
			<div className="body">
				<ToDo className="sections"></ToDo>
				<InProgress className="sections"></InProgress>
				<Completed className="sections"></Completed>
			</div>
			<div></div>
		</Container>
	);
};

export default Landing;
