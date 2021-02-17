import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Home.css' 
import copyicon from '../imagesHome/copyicon.png'
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
    <p>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit.<br></br> Molestias aut, repellat ipsum facere voluptate dicta obcaecati <br></br> deserunt nobis suscipit eaque?
    </p>
    <p><img src={copyicon} className="cicon"alt="vc"/>2020</p>
    </div>
    <div className="scroll-down"></div>
</div>

<div className="section2">
<div className="textpurpose">
  <p className="weexistfor">
  Chez Wild Garden, classiques ou innovants, exubérants ou minimalistes  la diversité des oeuvres est époustouflante. <br></br>
  L’art est fait pour tous. 
  </p>
  <p className="describeteam">
    Notre équipe interne dirigée par Eren Jaeger, web designer <br></br> Notre ambition ? Permettre une accessibilité aux differents arts visuels à toute personne intéressée par l’art.
  Nous permettons à nombre d'artistes établis et nouveaux talents prometteurs d'exposer leurs oeuvres dans un portfolio sur notre site.
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

  <div className="sectiontest">
  <div className="scene">
        <div className="left-zone">
            <ul className="list">
                <li className="item"><input type="radio" className="radio_The garden strawberry (or simply strawberry /ˈstrɔːbᵊri/; Fragaria × ananassa) is a  widely grown hyb className species of the genus Fragaria (collectively known as the strawberries)" name="basic_carousel" defaultValue="The garden strawberry (or simply strawberry /ˈstrɔːbᵊri/; Fragaria × ananassa) is a  widely grown hyb  species of the genus Fragaria (collectively known as the strawberries)" defaultChecked="checked" /><label className="label_strawberry" htmlFor="radio_The garden strawberry (or simply strawberry /ˈstrɔːbᵊri/; Fragaria × ananassa) is a  eely grown hyb className species of the genus Fragaria (collectively known as the strawberries)">strawberry</label>
                    <div className="content content_strawberry"><span className="picto"></span>
                        <h1>strawberry</h1>
                        <p>The garden strawberry is a  classNameely grown hyb className species of the genus Fragaria (collectively known as the strawberries)</p>
                    </div>
                </li>
                <li className="item"><input type="radio" className="radio_A banana is an edible fruit, botanically a berry, produced by several kinds of large herbaceous flowering plants in the genus Musa." name="basic_carousel" defaultValue="A banana is an edible fruit, botanically a berry, produced by several kinds of large herbaceous flowering plants in the genus Musa." /><label className="label_banana" htmlFor="radio_A banana is an edible fruit, botanically a berry, produced by several kinds of large herbaceous flowering plants in the genus Musa.">banana</label>
                    <div className="content content_banana"><span className="picto"></span>
                        <h1>banana</h1>
                        <p>A banana is an edible fruit, botanically a berry, produced by several kinds of large herbaceous flowering plants in the genus Musa.</p>
                    </div>
                </li>
                <li className="item"><input type="radio" className="radio_The apple tree (Malus domestica) is a de ameuous tree in the rose family best known for its sweet, pomaceous fruit, the apple. It is cultivated world classNamee as a fruit tree, and is the most  ameely grown species in the genus Malus." name="basic_carousel" defaultValue="The apple tree (Malus domestica) is a de ameuous tree in the rose family best known for its sweet, pomaceous fruit, the apple. It is cultivated world amee as a fruit tree, and is the most  ameely grown species in the genus Malus." /><label className="label_apple" htmlFor="radio_The apple tree (Malus domestica) is a de classNameuous tree in the rose family best known for its sweet, pomaceous fruit, the apple. It is cultivated world classNamee as a fruit tree, and is the most  ameely grown species in the genus Malus.">apple</label>
                    <div className="content content_apple"><span className="picto"></span>
                        <h1>apple</h1>
                        <p>The apple tree (Malus domestica) is a de classNameuous tree in the rose family best known for its sweet, pomaceous fruit, the apple. It is cultivated world classNamee as a fruit tree, and is the most  classNameely grown species in the genus Malus.</p>
                    </div>
                </li>
                <li className="item"><input type="radio" className="radio_The orange (specifically, the sweet orange) is the fruit of the citrus species Citrus × sinensis in the family Rutaceae." name="basic_carousel" defaultValue="The orange (specifically, the sweet orange) is the fruit of the citrus species Citrus × sinensis in the family Rutaceae." /><label className="label_orange" htmlFor="radio_The orange (specifically, the sweet orange) is the fruit of the citrus species Citrus × sinensis in the family Rutaceae.">orange</label>
                    <div className="content content_orange"><span className="picto"></span>
                        <h1>orange</h1>
                        <p>The orange (specifically, the sweet orange) is the fruit of the citrus species Citrus × sinensis in the family Rutaceae.</p>
                    </div>
                </li>
            </ul>
        </div>
        <div className="middle-border"></div>
        <div className="right-zone"></div>
    </div>
  </div>
</div>

    
  );
}
}

export default Home;