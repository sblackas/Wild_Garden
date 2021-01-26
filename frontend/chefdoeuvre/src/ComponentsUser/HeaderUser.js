import React from 'react';
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { connect } from 'react-redux'
import { logoutArtist, loggedArtist, loginArtist } from '../Store/actions/artist';
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
        
    if (localStorage.getItem("token")) {
        let decoded = jwt.decode(localStorage.getItem("token"))
        this.props.loginArtist({id: decoded.id, email: decoded.email, token: localStorage.getItem("token")})
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
    return {}
  }
  
  const mapDispatchToProps = { logoutArtist, loggedArtist, loginArtist }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(HeaderUser) ;
