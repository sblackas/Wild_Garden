import React from 'react';
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
// import Button from 'react-bootstrap/Button'
// import Form from 'react-bootstrap/Form'
// import FormControl from 'react-bootstrap/FormControl'
import Nav from 'react-bootstrap/Nav'
import title from '../imagesHome/title.png'
import './Header.css';





class Header extends React.Component {
    render() {

        return (

            <div className="navbar" variant="dark">
                <Nav className="mr-auto">
                <Nav.Link as={Link} to="/" className="linkheader">Galeries</Nav.Link>
                <Navbar.Brand href="/"><img src={title} className="titleheader" alt="" /> </Navbar.Brand>
                
                    <Nav.Link as={Link} to="/signup"  className="linkheader">Inscription</Nav.Link>
                    <Nav.Link as={Link} to="/signin"  className="linkheader">Connexion</Nav.Link>

                </Nav>
            </div>

        )

    }
}


export default Header;