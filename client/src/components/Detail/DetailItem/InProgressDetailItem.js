import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import moment from 'moment';
const Container = styled.div`
	display: block;
	justify-content: center;
	width: 70%;
	.card {
		position: relative;
		left: 20%;
		margin: 20px;
		-webkit-box-shadow: 4px 2px rgba(0, 0, 0, 0.3), -6px 0 rgba(0, 0, 0, 0.3);
		-moz-box-shadow: 4px 0 2px rgba(0, 0, 0, 0.3), -6px 0 rgba(0, 0, 0, 0.3);
		box-shadow: 4px 0 2px rgba(0, 0, 0, 0.3), -6px 0 2px rgba(0, 0, 0, 0.3);
        margin:0;
        display:flex;
        justify-content: space-around;
        align-content:center;
    }
    .card-title{
        margin:0;
    }
    .card-divider{
        
    }
    .card-progress{
        display:flex;
        align-content:center;
        font-family: 'Bebas Neue', cursive;
        font-size:5vh;
    }
`;

const ToDoDetailItem = (props) => {
    let [color, setColor] = useState({
		x: 246 - 2 * props.task.progress,
		y: 54 + 1.5 * props.task.progress,
		z: 53 + 0.6 * props.task.progress,
	});
	return (
		<Container>
			<div className="card">
                <div>
				<h2 className="card-title">{props.task.title}</h2>
				<hr></hr>
				<p>{props.task.description}</p>
				<p>{moment(props.task.deadline).format('MM-DD-YYYY')}</p>
                </div>
                <div className="card-progress">

				<p style={{ color: 'rgba(' + color.x + ',' + color.y + ',' + color.z + ')' }}>{props.task.progress}</p>
                </div>
				{/* <hr className="card-divider"></hr> */}
			</div>
		</Container>
	);
};

export default ToDoDetailItem;
