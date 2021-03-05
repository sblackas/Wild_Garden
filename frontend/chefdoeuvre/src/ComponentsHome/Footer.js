import React from 'react';
import './Footer.css'
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import arrowup from '../imagesHome/arrowup.png'


export class Footer extends React.Component {
    render() {


    
        return (
            <div id="Footer">
             
                <div className="f-wrap">
                <div className="sitemap-left">
                    <h2>SITEMAP</h2>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/nos-artistes">Artistes</Nav.Link>
                    <Nav.Link as={Link} to="/les-oeuvres">Oeuvres</Nav.Link>

                </div>
                <div className="f-wrap-center">
                <h2>SOCIAL</h2>
                <Nav.Link as={Link} to="/">Instagram</Nav.Link>
                    <Nav.Link as={Link} to="/artistes">Facebook</Nav.Link>
                    <Nav.Link as={Link} to="/artistes">Linkedin</Nav.Link>

                </div>
                <div className="f-wrap-right">
                    <h2>Top</h2>
                    <div className="scroll-top">
                        <a href="#Header" ><img src={arrowup} className="arrowup" alt=""/></a>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default Footer
