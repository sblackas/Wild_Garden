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
            <Navbar className="userNavbar" variant="dark">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/add-artwork">Ajouter une oeuvre</Nav.Link>
                    <Nav.Link as={Link} to="/artworks-list">Toutes vos oeuvres</Nav.Link>
                    <Nav.Link as={Link} to="/dashboard">Mon espace</Nav.Link>
                </Nav>

                <Navbar.Brand href="/" onClick={this.logOutSubmit} >Deconnexion</Navbar.Brand>

            </Navbar>
        )
    }
}



export default HeaderUser;
