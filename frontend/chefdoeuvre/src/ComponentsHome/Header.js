import React from 'react';
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
// import Button from 'react-bootstrap/Button'
// import Form from 'react-bootstrap/Form'
// import FormControl from 'react-bootstrap/FormControl'
import Nav from 'react-bootstrap/Nav'
import title from '../imagesHome/title.jpg'
import './Header.css';





class Header extends React.Component {
    render() {

        return (

            <Navbar className="navbar" variant="dark">
                <Nav className="mr-auto">
                <Nav.Link as={Link} to="/">Galeries</Nav.Link>
                <Navbar.Brand href="/"><img src={title} className="titleheader" alt="" /> </Navbar.Brand>
                
                    <Nav.Link as={Link} to="/signup">Inscription</Nav.Link>
                    <Nav.Link as={Link} to="/signin">Connexion</Nav.Link>

                </Nav>
                {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
                {/* <Button variant="outline-primary">Search</Button> */}
            </Navbar>

        )

    }
}


export default Header;