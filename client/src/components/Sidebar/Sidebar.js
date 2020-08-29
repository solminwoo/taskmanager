import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';


const Container = styled.div`
    
    border-right:2px solid #557A95;
    display:flex;
    width:20%;
    min-height:70vh;
    ul{
        style:none
    }
    li{
        font-size:2vw;
        list-style:none
    }
`


const Sidebar = (props)=>{
    return(
        <Container>
            <ul>
                <li><Link  to="/" style={{ color: '#7395AE', textDecoration: 'inherit'}}>Home</Link></li>
                <li><Link  to="/split" style={{ color: '#7395AE', textDecoration: 'inherit'}}>Split View</Link></li>
                <li><Link  to="/create" style={{ color: '#7395AE', textDecoration: 'inherit'}}>Create</Link></li>
                <li><Link  to="/To_do_detail" style={{ color: '#7395AE', textDecoration: 'inherit'}}>To do</Link></li>
                <li><Link to="/In_progress_detail" style={{ color: '#7395AE', textDecoration: 'inherit'}}>In progress</Link></li>
                <li><Link to="/completed_detail"style={{ color: '#7395AE', textDecoration: 'inherit'}}>Completed</Link></li>
            </ul>
        </Container>
    )
}

export default Sidebar
