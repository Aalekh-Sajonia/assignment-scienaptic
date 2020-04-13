import React from 'react';
import ChartWrapper from '../ChartWrapper';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

export default function Chart(props) {
     // console.log(props);
     let cat = props.location.pathname.split('/');
     return (
          <div>
          <Navbar bg="light">
          <Navbar.Brand>Chart</Navbar.Brand>
               </Navbar>
          <Container>
               <ChartWrapper temp = {cat[cat.length - 1]}/>
          </Container>
          </div>
     ) 
}