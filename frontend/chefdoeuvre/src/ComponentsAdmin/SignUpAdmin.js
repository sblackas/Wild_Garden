import React from 'react'
import axios from 'axios'


export class SignUpAdmin extends React.Component {
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
handleSubmitAdmin = event => {
    event.preventDefault();
  if (this.validateForm()) {
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

  if (typeof this.state["password"] !== "undefined") {
    if (!this.state["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
      formIsValid = false;
      errors["password"] = "*Please enter secure and strong password.";
    }
  }

  this.setState({
    errors: errors
  });
  return formIsValid;


}
 



    render() {
        return (
            <div>

<p>
    Vous êtes un administrateur ?
</p>

         <div class="tabs" onSubmit={this.handleSubmitAdmin}>
  <div class="tab-2">
    <label for="tab2-1">Inscrivez-vous</label>
    <input id="tab2-1" name="tabs-two" type="radio" checked="checked"/>
    <div>
      <h4>Tab One</h4>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas consequat id velit quis vestibulum. Nam id orci eu urna mollis porttitor. Nunc nisi ante, gravida at velit eu, aliquet sodales dui. Sed laoreet condimentum nisi a egestas.</p><p>Donec interdum ante ut enim consequat, quis varius nulla dapibus. Vivamus mollis fermentum augue a varius. Vestibulum in sapien at lectus gravida lobortis vulputate sed metus. Duis scelerisque justo et maximus efficitur. Donec eu eleifend quam. Curabitur aliquet commodo sapien eget vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vestibulum vel aliquet nunc, finibus posuere lorem. Suspendisse consectetur volutpat est ut ornare.</p>
    </div>
  </div>
  <div class="tab-2">
    <label for="tab2-2">Two</label>
    <input id="tab2-2" name="tabs-two" type="radio"/>
    <div>
      <h4>Tab Two</h4>
      <p>Quisque sit amet turpis leo. Maecenas sed dolor mi. Pellentesque varius elit in neque ornare commodo ac non tellus. Mauris id iaculis quam. Donec eu felis quam. Morbi tristique lorem eget iaculis consectetur. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean at tellus eget risus tempus ultrices. Nam condimentum nisi enim, scelerisque faucibus lectus sodales at.</p>
    </div>
  </div>
  </div>

            </div>
        )
    }
}

export default SignUpAdmin
