import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Home.css' 
import copyicon from '../imagesHome/copyicon.png'
import arrowdown from '../imagesHome/arrowdown.png'

// import bghome from '../imagesHome/bghome.png'

// import Ink58 from '../imagesHome/Ink58.mp4'

// import {Link} from "react-router-dom";
// import Nav from 'react-bootstrap/Nav'

class Home extends React.Component{


render() {
  return (
    <div className="Home">
      {/* <Header/> */}
      
      
<div className="section1">
      {/* <img src={ bghome } className="bg" alt=""/> */}
      {/* < classNameeo autoPlay loop muted className="bg className">
      <source src={ Ink58 } type=" classNameeo/mp4"/>
    </ classNameeo> */}
    <h1 className="titlehome">WILD GARDEN</h1>
    <div className="textgroup">
    <p className="maybe">
    Peut-être n’avez-vous jamais osé pousser la porte d’une galerie alors  n’hésitez pas à pousser la nôtre, virtuelle, pour découvrir différents univers artistiques et  visiter à votre guise un catalogue d’œuvres soigneusement sélectionnées.
    </p>
    <div className="scroll-down">
                        <a href="#navbar" ><img src={arrowdown} className="arrowdown" alt=""/></a>
                    </div>
    <p className="copyright"><img src={copyicon} className="cicon"alt="vc"/>2021 Wild Garden v1.1</p>
    </div>
   
</div>

<div className="section2">
<div className="textpurpose">
  <p className="weexistfor">
  Classiques ou innovants, exubérants ou minimalistes  la diversité des oeuvres est époustouflante. 
  
  </p>
  <p className="describeteam">  <div className="ligne"></div>

   Notre ambition ? Permettre une accessibilité aux differents arts visuels à toute personne intéressée par l’art.
  Nous permettons à nombre d'artistes établis et nouveaux talents prometteurs d'exposer leurs oeuvres dans un portfolio sur notre site. We store ideas for typography, colors, shapes, and photography in one place, revise them from time to time, and track how quickly our design approach and design in general evolves.
  </p>
</div>
</div>
<div className="section3">
  <div className="home-s classNameeshow">
    <div className="home-s classNameeshow-inner">
      <div className="home-s classNameeshow_img">
        {/* <img src={bghome} alt="bobbo"/> */}
      </div>
    </div>
  </div>
<div className="categories-list-holder">
  < div className="categories-list">
  <h2 className="heading">
    <a className="category-link" href='/'>
    <span className="catename">Photographie</span>
    </a>
  </h2>
  <h2 className="heading">
    <a className="category-link" href='/'>
    <span className="catename">Peinture</span>
    </a>
  </h2>
  <h2 className="heading">
    <a className="category-link" href='/'>
    <span className="catename">Dessin</span>
    </a>
  </h2>
  <h2 className="heading">
    <a className="category-link" href='/'>
    <span className="catename">Sculpture</span>
    </a>
  </h2>
  </div>

  </div>
  </div>

</div>

    
  );
}
}

export default Home;