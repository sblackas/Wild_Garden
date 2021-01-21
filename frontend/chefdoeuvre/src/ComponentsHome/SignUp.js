import React from 'react';
import axios from 'axios' // importer tout ce qu'on utiliser dans le component
import Header from './Header'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Tab from 'react-bootstrap/Tabs'
import Tabs from 'react-bootstrap/Tabs'

// import './SignUp.css'



class SignUp extends React.Component{
state = {
    name: "",
    lastname: "",
    email: "",
    password: "",
    msgSuccess: ""

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

handleSubmitAdmin = event => {
  event.preventDefault();

  const admin = {
    name: this.state.name,
    lastname : this.state.lastname,
    email: this.state.email,
    password: this.state.password
};

axios.post('http://localhost:8000/admin/sign-up', admin)
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
  <Tab eventKey="signUpUser" title="Simple User">
  <Form onSubmit={this.handleSubmit}> 
  <p>{this.state.msgSuccess}</p>

<Form.Group controlId="formBasicFirstName" >
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
</Tabs>






          </div>
        )
    }
}

export default SignUp;