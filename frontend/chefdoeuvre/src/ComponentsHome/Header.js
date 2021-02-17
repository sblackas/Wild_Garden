import React from 'react';
import { Link, withRouter } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import wglogo from '../imagesHome/wglogo.png'
import './Header.css';
import axios from 'axios'
import { connect } from 'react-redux'
import { listArtworks, personalArtworks } from '../Store/actions/artworks';
import { listCate } from '../Store/actions/categories';
import { logoutArtist, loginArtist, usersList } from '../Store/actions/artist';
import { logoutAdmin, loginAdmin } from '../Store/actions/admin';


class Header extends React.Component {

    logOutSubmitAdmin = () => {
        localStorage.clear();
        this.props.logoutAdmin()
        this.props.history.push('/');
    }

    logOutSubmitUser = () => {
        localStorage.clear();
        this.props.logoutArtist()
        this.props.history.push('/');
    }

    componentDidMount() {
        axios.get('http://localhost:8000/all-of-artworks')
            .then(res => {
                this.props.listArtworks(res.data)
            })
            .catch(error => {
                console.log("catch error");
                console.log(error);

            }
            )
        axios.get(`http://localhost:8000/get-artwork/${this.props.id}`)
            .then(res => {
                this.props.personalArtworks(res.data)
            })
            .catch(error => {
                console.log("catch error");
                console.log(error);

            }
            )
        axios.get('http://localhost:8000/categories')
            .then(res => {
                console.log(res.data);
                this.props.listCate(res.data)
            })
            .catch(error => {
                console.log("catch error");
                console.log(error);

            }
            )
        axios.get(`http://localhost:8000/artwork/${this.props.id_artwork}`)
            .then(res => {
                this.props.listArtworks(res.data)
            })
            .catch(error => {
                console.log("catch error");
                console.log(error);
            })
            axios.get('http://localhost:8000/users')
            .then(res => {
                this.props.usersList(res.data)
            })
            .catch(error => {
                console.log("catch error");
                console.log(error);
            })
    }

    render() {
        if (this.props.location.pathname.includes('admin')) {
            if (localStorage.getItem("tokenAdmin")) {
                return (
                    <Navbar variant="dark">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/admin/add-category">Ajouter une catégorie</Nav.Link>
                            <Nav.Link as={Link} to="/admin/category-list">Toutes les categories</Nav.Link>
                            <Nav.Link as={Link} to="/admin/users-list">Utilisateurs</Nav.Link>
                            <Nav.Link as={Link} to="/admin/all-artwork-list">Toutes les oeuvres</Nav.Link>
                            <Nav.Link as={Link} to="/admin/dashboard">Mon espace</Nav.Link>
                        </Nav>

                        <Navbar.Brand href="/" onClick={this.logOutSubmitAdmin} >Deconnexion</Navbar.Brand>

                    </Navbar>

                );
            } else {
                return (
                    <Nav variant="pills">
                        <Nav.Item>
                            <Nav.Link as={Link} to="/admin/signup">
                                Inscription
                </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/admin/signin">
                                Me connecter
                </Nav.Link>
                        </Nav.Item>
                    </Nav>

                )
            }

        } else if (localStorage.getItem("tokenUser")) {
            return (
                <Navbar className="userNavbar" variant="dark">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/add-artwork">Ajouter une oeuvre</Nav.Link>
                        <Nav.Link as={Link} to="/artworks-list">Toutes vos oeuvres</Nav.Link>
                        <Nav.Link as={Link} to="/dashboard">Mon espace</Nav.Link>
                    </Nav>

                    <Navbar.Brand href="/" onClick={this.logOutSubmitUser} >Deconnexion</Navbar.Brand>

                </Navbar>
            )
        } else {
            return (

                <div className="Header">
                    <div className="navbar"  variant="dark">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/galeries" className="linkheader">Galeries</Nav.Link>
                            <Navbar.Brand href="/"><img src={wglogo} className="titleheader" alt="" /> </Navbar.Brand>

                            <Nav.Link as={Link} to="/signup" className="linkheader">Inscription</Nav.Link>
                            <Nav.Link as={Link} to="/signin" className="linkheader">Connexion</Nav.Link>

                        </Nav>
                    </div>
                </div>

            )
        }

    }
}


const mapStateToProps = (state /*, ownProps*/) => {
    return {
        artworks: state.artworksReducer.artworks,
        personalArtworks: state.artworksReducer.persosnalArtworks,
        id: state.artistReducer.id,
        id_artwork: state.artworksReducer.id_artwork,
        categories: state.cateReducer.categories,

        // token: state.artistReducer.token,


    }
}

const mapDispatchToProps = { logoutArtist, loginArtist, listArtworks, logoutAdmin, loginAdmin, listCate, personalArtworks, usersList }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));