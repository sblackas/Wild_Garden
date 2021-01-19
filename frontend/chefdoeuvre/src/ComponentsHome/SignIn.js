import React from 'react';
// import {Button, Alert, Form} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import {Alert} from 'react-bootstrap'
import axios from 'axios'
import Header from './Header'
import jwt from 'jsonwebtoken';
import './SignIn.css';

class SignIn extends React.Component{
    state = {
        email: "",
        password: "",
        message: "",
        redirection: false
    
    };
    
    // Chaque input necessite sa fonction
    inputEmail = event => {
        this.setState({email:event.target.value})
    };
    inputPassword = event => {
        this.setState({password:event.target.value})
    };
    
    // fonction pour notre Submit
    handleSubmit = event => {
        event.preventDefault();
    
        const user = {
            email: this.state.email,
            password: this.state.password
        };
    
        axios.post('http://localhost:8000/users/sign-in', user)
        .then(res => {
            this.setState({ redirection: true})
            console.log(res);                   // -----> ces lignes étaient là avant qu'on fasse le store
            console.log(res.data);
            if(res.status === 200) {
              console.log(res);
              let decoded = jwt.decode(res.data.token);
              let loggedUser = {
                token: res.data.token,
                email: decoded.email,
                id: decoded.id
              };
              
              this.props.loginUser(loggedUser)
              this.props.history.push('/dashboard');
            } 
            localStorage.setItem("token", res.data.token) //Une fois que ca donne un token il faut le stocker, je le recupere dans addProduct
        })
        .catch(err => {
          console.log(err.response.data);
          this.setState({ message: err.response.data })
          console.log(this.state.message);
        })
    }
render() {
    const { redirection } = this.state;
    if (redirection){
        return <Redirect to='/dashboard/'/>
    }

  return (
      <div>

<Header/>
{/* <img src={ salon } alt="" />
<video autoPlay loop muted id="bgvid">
      <source src={ decosalon } type="video/mp4"/>
    </video> */}
{/* <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
{ this.state.message ?  <Alert variant="danger" > {this.state.message} </Alert> : null }
             <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={this.inputEmail} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={this.inputPassword}/>
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form> */}
<div className="login-box" >
<h2>Welcome Back !</h2>
<p>To keep enjoy our content please login with your personal info</p>
<br></br>
  <form onSubmit={this.handleSubmit}>
  { this.state.message ?  <Alert variant="danger" > {this.state.message} </Alert> : null }
    <div className="user-box">
      <input type="email" onChange={this.inputEmail}/>
      <label>Email</label>
    </div>
    <div className="user-box">
      <input type="password"  onChange={this.inputPassword} />
      <label>Password</label>
    </div>
    <link href="https://fonts.googleapis.com/css2?family=Cookie&display=swap" rel="stylesheet"></link>
    {/* <div id="btn" type="submit"><span className="noselect">Submit</span><div id="circle"></div></div> */}
    <button id="btn" type="submit"><span className="noselect">Submit</span><div id="circle"></div></button>

  </form>
</div>
          </div>
  );
}
}


export default SignIn ;
