import React from 'react';
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

class HeaderUser extends React.Component {

    state = {
        email: "",
        password: "",

    };

    logOutSubmit = () => {
        this.props.logoutUser()
        this.props.history.push('/');
    }

    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/dashboard">Ajouter une oeuvre</Nav.Link>
                    <Nav.Link as={Link} to="/dashboard">Toutes vos oeuvres</Nav.Link>
                    <Nav.Link as={Link} to="/dashboard">Mon espace</Nav.Link>
                </Nav>

                <Navbar.Brand href="/" onClick={this.logOutSubmit} >Deconnexion</Navbar.Brand>

            </Navbar>
        )
    }
}



export default HeaderUser;
