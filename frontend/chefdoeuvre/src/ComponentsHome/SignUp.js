import React from 'react';
import axios from 'axios' // importer tout ce qu'on utiliser dans le component
import Header from './Header'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Tab from 'react-bootstrap/Tabs'
import Tabs from 'react-bootstrap/Tabs'

import './SignUp.css'



class SignUp extends React.Component{
state = {
    name: "",
    lastname: "",
    email: "",
    password: "",
    msgSuccess: "",
    errors: {},

};

// Chaque input necessite sa fonction
inputName = event => {
    this.setState({name:event.target.value})
};
inputLastName = event => {
    this.setState({lastname:event.target.value})
};
inputEmail = event => {
    this.setState({email:event.target.value})
};
inputPassword = event => {
    this.setState({password:event.target.value})
};


// fonction pour notre Submit
handleSubmit = event => {
    event.preventDefault();
    if (this.validateForm()) {
      const user = {
        name: this.state.name,
        lastname : this.state.lastname,
        email: this.state.email,
        password: this.state.password
    };

    axios.post('http://localhost:8000/users/sign-up', user)
    .then(res => {
      if(res.status === 403) {
        this.setState({msgSuccess: "Vous avez bien été enregistré !"})
      }
      console.log(res);
      console.log(res.data);
    }).catch (function (error){
        console.log(error);
    }) ;


  
  }

}


validateForm = () => {

  let errors = {};
  let formIsValid = true;

  //_______Name
  if (!this.state.name) {
    formIsValid = false;
    errors["name"] = "*Please enter your name.";
  }

  if (typeof this.state["name"] !== "undefined") {
    if (!this.state["name"].match(/^[a-zA-Z ]*$/)) {
      formIsValid = false;
      errors["name"] = "*Please enter alphabet characters only.";
    }
  }

    //_______Last Name
    if (!this.state.lastname) {
      formIsValid = false;
      errors["lastname"] = "*Please enter your lastname.";
    }
  
    if (typeof this.state["lastname"] !== "undefined") {
      if (!this.state["lastname"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["lastname"] = "*Please enter alphabet characters only.";
      }
    }

  //______Email validation
  if (!this.state["email"]) {
    formIsValid = false;
    errors["email"] = "*Please enter your email.";
  }

  if (typeof this.state["email"] !== "undefined") {
    //regular expression for email validation
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (!pattern.test(this.state["email"])) {
      formIsValid = false;
      errors["email"] = "*Please enter valid email.";
    }
  }

//_______Password
  if (!this.state["password"]) {
    formIsValid = false;
    errors["password"] = "*Please enter your password.";
  }

// Must be at least 8 characters
// At least 1 special character from @#$%&
// At least 1 number, 1 lowercase, 1 uppercase lette
  if (typeof this.state["password"] !== "undefined") {
    if (!this.state["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
      formIsValid = false;
      errors["password"] = "*Please enter secure and strong password. Must be at least 8 characters, 1 special characteh (@#$%&), 1 number, 1 lowercase, 1 uppercase letter";
    }
  }

  this.setState({
    errors: errors
  });
  return formIsValid;


}





  
  

// handleSubmitAdmin = event => {
//   event.preventDefault();

//   const admin = {
//     name: this.state.name,
//     lastname : this.state.lastname,
//     email: this.state.email,
//     password: this.state.password
// };

// axios.post('http://localhost:8000/admin/sign-up', admin)
//   .then(res => {
//     if(res.status === 403) {
//       this.setState({msgSuccess: "Vous avez bien été enregistré !"})

//     }
//     console.log(res);
//     console.log(res.data);
//   }).catch (function (error){
//       console.log(error);
//   }) ;

// };
 


render() {
  return (
   <div>

<Header/>

<Tabs defaultActiveKey="signUpAdmin" id="uncontrolled-tab-example">
  <Tab eventKey="" title="Admin">
  <Form onSubmit={this.handleSubmitAdmin}> 
<p>{this.state.msgSuccess}</p>
<Form.Group controlId="formBasicAdmin" >
              <Form.Label>Prénom</Form.Label>
              <Form.Control type="name" placeholder="Entrer votre prénom" onChange={this.inputName} />
            </Form.Group>

            <Form.Group controlId="formBasicName">
              <Form.Label>Nom</Form.Label>
              <Form.Control type="name" placeholder="Entrer votre nom" onChange={this.inputLastName} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Adresse Email </Form.Label>
              <Form.Control type="email" placeholder="Entrer votre adresse email" onChange={this.inputEmail} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control type="password" placeholder="Entrer votre mot de passe" onChange={this.inputPassword} />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
  </Form>
  </Tab>
  <Tab eventKey="signUpArtist" title="Artist">
  <Form onSubmit={this.handleSubmit}> 
  <p>{this.state.msgSuccess}</p>

<Form.Group controlId="formBasicArtist" >
              <Form.Label>Prénom</Form.Label>
              <Form.Control type="name" placeholder="Entrer votre prénom" onChange={this.inputName} />
              <div className="errorMsg">{this.state.errors.name}</div>
            </Form.Group>

            <Form.Group controlId="formBasicName">
              <Form.Label>Nom</Form.Label>
              <Form.Control type="name" placeholder="Entrer votre nom" onChange={this.inputLastName} />
              <div className="errorMsg">{this.state.errors.lastname}</div>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Adresse Email </Form.Label>
              <Form.Control type="email" placeholder="Entrer votre adresse email" onChange={this.inputEmail} />
              <div className="errorMsg">{this.state.errors.email}</div>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control type="password" placeholder="Entrer votre mot de passe" onChange={this.inputPassword} />
              <div className="errorMsg">{this.state.errors.password}</div>
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
  </Form>
  </Tab>
</Tabs>
          </div>
        )
    }

  };

export default SignUp;