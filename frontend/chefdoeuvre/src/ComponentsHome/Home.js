import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './Header'
import './Home.css' 

// import {Link} from "react-router-dom";
// import Nav from 'react-bootstrap/Nav'

class Home extends React.Component{


render() {
  return (
    <div className="Home">
      <Header/>
    <p>Welcome here this is the homa page </p>
    </div>
  );
}
}

export default Home;