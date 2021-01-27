import React from 'react';
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { connect } from 'react-redux'
import { logoutAdmin, loginAdmin } from '../Store/actions/admin';
import jwt from 'jsonwebtoken'

class HeaderAdmin extends React.Component {

    state = {
        email: "",
        password: "",

    };

    logOutSubmit = () => {
        this.props.logoutAdmin()
        this.props.history.push('/');
    }

    componentDidMount() {
        
    if (localStorage.getItem("token")) {
        let decoded = jwt.decode(localStorage.getItem("token"))
        this.props.loginAdmin({id: decoded.id, email: decoded.email, token: localStorage.getItem("token")})
    }

    }

    render() {
        return (
            <Navbar className="userNavbar" variant="dark">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/add-category">Ajouter une catégorie</Nav.Link>
                    <Nav.Link as={Link} to="/category-list">Toutes les categories</Nav.Link>
                    <Nav.Link as={Link} to="/users-list">Utilisateurs</Nav.Link>
                    <Nav.Link as={Link} to="/all-artwork-list">Toutes les oeuvres</Nav.Link>
                    <Nav.Link as={Link} to="/dashboard-admin">Mon espace</Nav.Link>
                </Nav>

                <Navbar.Brand href="/" onClick={this.logOutSubmit} >Deconnexion</Navbar.Brand>

            </Navbar>
        )
    }
}

const mapStateToProps = (state /*, ownProps*/) => {
    return {}
  }
  
  const mapDispatchToProps = { logoutAdmin, loginAdmin }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(HeaderAdmin) ;