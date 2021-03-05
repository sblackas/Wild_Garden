import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Home.css' 
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav'
import copyicon from '../imagesHome/copyicon.png'
import arrowdown from '../imagesHome/arrowdown.png'
import goldenbrush from '../imagesHome/goldenbrush.png'
import goldenfoil from '../imagesHome/goldenfoil.png'



class Home extends React.Component{


render() {
  return (
    <div id="Home">
      {/* <Header/> */}
      
      
<div className="section1">
      {/* <img src={ bghome } className="bg" alt=""/> */}
      {/* < classNameeo autoPlay loop muted className="bg className">
      <source src={ Ink58 } type=" classNameeo/mp4"/>
    </ classNameeo> */}
    	<link rel="stylesheet" href="stylesheet.css" type="text/css" charSet="utf-8" />
<style type="text/css">
      font-family: 'neue_worldcondensed_regular';
  </style>
  
    <h1 className="titlehome">WILD GARDEN</h1>
    <div className="textgroup">
    <p className="maybe">
    Peut-être n’avez-vous jamais osé pousser la porte d’une galerie alors  n’hésitez pas à pousser la nôtre, virtuelle, pour découvrir différents univers artistiques et  visiter à votre guise un catalogue d’œuvres soigneusement sélectionnées.
    </p>
    <div className="scroll-down">
                        <a href="#navbar" ><img src={arrowdown} className="arrowdown" alt=""/></a>
                    </div>
    <p className="copyright"><img src={copyicon} className="cicon"alt="vc"/>2021 WILDGARDEN </p>
    <div className="rules"></div>
    </div>
   
</div>

<div className="section2">
<div className="textpurpose">
  <p className="weexistfor">
  Classiques ou innovants, exubérants ou minimalistes  la diversité des oeuvres est époustouflante. 
  
  </p>
  <div className="describeteam">  <div className="ligne"></div>
<p>
   Notre ambition ? Permettre une accessibilité aux differents arts visuels à toute personne intéressée par l’art.
  Nous permettons à nombre d'artistes établis et nouveaux talents prometteurs d'exposer leurs oeuvres dans un portfolio sur notre site. We store ideas for typography, colors, shapes, and photography in one place, revise them from time to time, and track how quickly our design approach and design in general evolves.<br></br></p>
  <Nav.Link as={Link} to="/les-oeuvres" className="view" >
    view all artworks
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 28"> <defs></defs> <path fill="#1d1d1d" d="M49.1,15.7l-11-11c0,0-0.1,0-0.1,0L35.7,7c-0.1,0.1-0.1,0.1,0,0.2l7.1,7.1c0.1,0.1,0,0.2-0.1,0.2H6.2c-1.1,0-2-0.9-2-2V1c0-0.1-0.1-0.3-0.3-0.3H1C0.9,0.7,0.8,0.8,0.8,1v12.5c0,2.5,2,4.5,4.5,4.5h37.1c0.1,0,0.2,0.1,0.1,0.2l-6.7,6.7c-0.1,0.1-0.1,0.2,0,0.3l2.1,2.1c0.1,0.1,0.2,0.1,0.3,0l10.9-10.9C49.2,16.2,49.2,15.9,49.1,15.7z"></path></svg>
    </Nav.Link>
  </div>
  
</div>

</div>
<div className="section3">
  <div className="goldenbrush"><img src={goldenbrush} className="goldimg" alt=""/></div>

  < div className="onus">
    <p>A propos de nous</p><span>et de notre travail</span>
  </div>
  <div className="onus-text">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </div>
  </div>
<section className="section4">
< div className="onuss">
    <p>Nos</p><span>collaborateurs</span>
  </div>

<div className="fever-container">
  <div className="blog-card spring-fever">
        {/* <div className="title-content">
          <h3><a>10 inspiring photos</a></h3>
          <div className="intro"> <a >Inspiration</a> </div>
        </div> */}
        <div className="card-info">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim... 
        </div>

        <div className="gradient-overlay" />
        <div className="color-overlay" />
      </div>

      <div className="blog-card spring-fever">
        {/* <div className="title-content">
          <h3><a>10 inspiring photos</a></h3>
          <div className="intro"> <a >Inspiration</a> </div>
        </div> */}
        <div className="card-info">
          <h3>Pellikola</h3>
          <p>
        Pellikola est une société de production cinématographique dynamique reconnue comme un acteur majeur des services de production audiovisuelle à Malte. Leur équipe, dirigée par Oliver Mallia, a des années d'expérience au service de projets internationaux, des grandes productions hollywoodiennes aux petites publicités.  
        </p>
        </div>

        <div className="gradient-overlay" />
        <div className="color-overlay" />
      </div>
      </div>
</section>
<section className="section5">
< div className="onuss">
    <p>Contactez</p><span>nous</span>
  </div>
  <div className="talkus">
  <div className="goldenfoil"><img src={goldenfoil} className="gold" alt="gold"/></div>

    <p>
    Vous avez un projet à discuter? [Ne soyez pas timide]<br></br>

Collaborons et créons ensemble des trucs merveilleux. Nous sommes là pour vous aider à trouver des réponses à tous vos doutes et à résoudre les défis qui pourraient vous déranger. Nous pensons que les défis mènent à la réalisation de quelque chose de nouveau. Quelque chose de nouveau élargit nos horizons et nous apprenons ensemble. Envoyez-nous un message en écrivant à notre adresse e-mail . <br></br> <br></br><span>projects@wildgarden.co</span><br></br><br></br>Nous reviendrons vers vous avant notre café du matin. 
    </p>
  </div>
</section>

</div>

    
  );
}
}

export default Home;