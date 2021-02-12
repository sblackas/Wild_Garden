import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Home.css' 
import bghome from '../imagesHome/bghome.png'
// import Ink58 from '../imagesHome/Ink58.mp4'

// import {Link} from "react-router-dom";
// import Nav from 'react-bootstrap/Nav'

class Home extends React.Component{


render() {
  return (
    <div className="Home">
      {/* <Header/> */}
      
      

      <img src={ bghome } className="bg" alt=""/>
      {/* <video autoPlay loop muted id="bgvid">
      <source src={ Ink58 } type="video/mp4"/>
    </video> */}


    </div>
  );
}
}

export default Home;