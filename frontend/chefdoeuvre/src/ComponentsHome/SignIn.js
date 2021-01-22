import React from 'react';
// import {Button,Form} from 'react-bootstrap'
// import {Redirect} from 'react-router-dom'
// import {Alert} from 'react-bootstrap'
import axios from 'axios'
import Header from './Header'
import jwt from 'jsonwebtoken';
import './SignIn.css';
import Tab from 'react-bootstrap/Tabs'
import Tabs from 'react-bootstrap/Tabs'

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
              
              // this.props.loginUser(loggedUser)
              console.log(loggedUser);
              this.props.history.push('/dashboard');
              localStorage.setItem("token", res.data.token) //Une fois que ca donne un token il faut le stocker, je le recupere dans addProduct

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
    // const { redirection } = this.state;
    // if (redirection){
    //     return <Redirect to='/dashboard/'/>
    // } 

  return (
      <div>

<Header/>

<Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
  <Tab eventKey="home" title="Admin">
  <div className="login-box" >
<h2>Welcome Back !</h2>
<p>To keep enjoy our content please login with your personal info</p>
<br></br>
  <form onSubmit={this.handleSubmit}>
  {/* { this.state.message ?  <Alert variant="danger" > {this.state.message} </Alert> : null } */}
  { this.state.message && <p> {this.state.message} </p> }
    <div className="user-box">
      <input type="email" onChange={this.inputEmailSignIn}/>
      <label>Email</label>
    </div>
    <div className="user-box">
      <input type="password"  onChange={this.inputPasswordSignIn} />
      <label>Password</label>
    </div>
    <link href="https://fonts.googleapis.com/css2?family=Cookie&display=swap" rel="stylesheet"></link>
    <button id="btn1" type="submit"><span className="noselect">Submit</span><div id="circle"></div></button>

  </form>
</div>
  </Tab>
  <Tab eventKey="profile" title="Artist">
  <div className="login-box" >
<h2>Welcome Back !</h2>
<p>To keep enjoy our content please login with your personal info</p>
<br></br>
  <form onSubmit={this.handleSubmit}>
  {/* { this.state.message ?  <Alert variant="danger" > {this.state.message} </Alert> : null } */}
    <div className="user-box">
      <input type="email" onChange={this.inputEmailSignIn}/>
      <label>Email</label>
    </div>
    <div className="user-box">
      <input type="password"  onChange={this.inputPasswordSignIn} />
      <label>Password</label>
    </div>
    <link href="https://fonts.googleapis.com/css2?family=Cookie&display=swap" rel="stylesheet"></link>
    <button id="btn2" type="submit"><span className="noselect">Submit</span><div id="circle"></div></button>

  </form>
</div>
  </Tab>
  <Tab eventKey="contact" title="Simple User">
  <div className="login-box" >
<h2>Welcome Back !</h2>
<p>To keep enjoy our content please login with your personal info</p>
<br></br>
  <form onSubmit={this.handleSubmit}>
  {/* { this.state.message ?  <Alert variant="danger" > {this.state.message} </Alert> : null } */}
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
  </Tab>
</Tabs>

          </div>
  );
}
}


export default SignIn ;
