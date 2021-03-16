import React from 'react';
import axios from 'axios'
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux'
import { loginArtist } from '../Store/actions/artist';
// import Footer from './Footer'

import './SignIn.css';

class SignIn extends React.Component{
    state = {
        email: "",
        password: "",
        message: null,
        redirection: false
    
    };
    
    // Chaque input necessite sa fonction
    inputEmailSignIn = event => {
        this.setState({email:event.target.value})
    };
    inputPasswordSignIn = event => {
        this.setState({password:event.target.value})
    };
    
    // fonction pour notre Submit
    handleSubmit = event => {
        event.preventDefault();
        console.log('handleSubmit');
    
        const user = {
            email: this.state.email,
            password: this.state.password
        };
    
        axios.post('http://localhost:8000/users/sign-in', user)
        .then(res => {
            this.setState({ redirection: true})
            if(res.status === 200) {
              console.log(res);
              let decoded = jwt.decode(res.data.token);
              let loggedUser = {
                token: res.data.token,
                email: decoded.email,
                id: decoded.id
              };
              localStorage.setItem("tokenUser", res.data.token)
              console.log(res.data.token);
              this.props.loginArtist(loggedUser)
              console.log(loggedUser);
              this.props.history.push('/dashboard');

            } else if (res.status === 203) {
              console.log("else if 203");
              this.setState({message: res.data})
              console.log(res.data);
            }
        
          })
        .catch(error => {
          console.log("catch error");
          this.setState({redirection: false})
          console.log(error);
        })
    }


render() {

  return (
      <div className="SignIn">


  { this.state.message && <p> {this.state.message} </p> }

 
  <div className="login-box" >
<h2>Ravi de vous revoir !</h2>
<p>Connectez-vous avec vos informations personnelles</p>
<br></br>
  <form onSubmit={this.handleSubmit}>
    <div className="user-box">
      <input type="email" onChange={this.inputEmailSignIn}/>
      <label>Email</label>
    </div>
    <div className="user-box">
      <input type="password"  onChange={this.inputPasswordSignIn} />
      <label>Password</label>
    </div>
    <link href="https://fonts.googleapis.com/css2?family=Cookie&display=swap" rel="stylesheet"></link>
    <button id="btn" type="submit"><span className="noselect">Submit</span><div id="circle"></div></button>

  </form>
</div>
 
</div>
       
  );
}
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {}
}

const mapDispatchToProps = { loginArtist }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn) ;

