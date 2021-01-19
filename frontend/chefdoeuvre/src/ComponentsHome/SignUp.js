import React from 'react';
import axios from 'axios' // importer tout ce qu'on utiliser dans le component
import Header from './Header'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'



class SignUp extends React.Component{
state = {
    name: "",
    lastname: "",
    email: "",
    password: "",

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
      console.log(res);
      console.log(res.data);
    });
  
}

render() {
  return (
   <div>

<Header/>

<Form onSubmit={this.handleSubmit}> 

<Form.Group controlId="formBasicName" >
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


          </div>
        )
    }
}

export default SignUp;