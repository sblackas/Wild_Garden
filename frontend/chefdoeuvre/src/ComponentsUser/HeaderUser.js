import React from 'react';
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { connect } from 'react-redux'
import { logoutArtist, loginArtist } from '../Store/actions/artist';
import { listArtworks } from '../Store/actions/artworks';

import jwt from 'jsonwebtoken'

class HeaderUser extends React.Component {

    state = {
        email: "",
        password: "",

    };

    logOutSubmit = () => {
        this.props.logoutArtist()
        this.props.history.push('/');
    }

    componentDidMount() {
        
    if (localStorage.getItem("tokenUser")) {
        let decoded = jwt.decode(localStorage.getItem("tokenUser"))
        this.props.loginArtist({id: decoded.id, email: decoded.email, token: localStorage.getItem("tokenUser")})
    }

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

const mapStateToProps = (state /*, ownProps*/) => {
    return {
        artworks: state.artworksReducer.artworks,

    }
  }
  
  const mapDispatchToProps = { logoutArtist, loginArtist, listArtworks }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(HeaderUser) ;
