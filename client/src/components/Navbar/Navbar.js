import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";


const Container = styled.div`
    
    border-bottom:2px solid #557A95;
    display:flex;
    color:#7395AE
    ul{
        style:none
    }
    li{
        font-size:2vw;
        list-style:none
    }
    h1 .title{
        font-family: 'Dancing Script', cursive;
		font-size: 40px;
		text-decoration:none;
		color:#003E51;
		margin-left:20px;
    }
`

const Navbar = (props) => {
	return (
		<Container>
            
			<h1> <Link className='title' to="/">Task Manager</Link></h1>
            
		</Container>
	);
};

export default Navbar;
