import React from 'react'
import './RegisterForm.css'
import axios from 'axios'
// import jwt from 'jsonwebtoken'
// import SignUpAdmin from '../ComponentsAdmin/SignUpAdmin'
// import SignInAdmin from '../ComponentsAdmin/SignInAdmin'

export class RegisterForm extends React.Component {
  state = {
    name: "",
    lastname: "",
    email: "",
    password: "",
    errors: {},

  };

  // Chaque input necessite sa fonction
  inputName = event => {
    this.setState({ name: event.target.value })
  };
  inputLastName = event => {
    this.setState({ lastname: event.target.value })
  };
  inputEmail = event => {
    this.setState({ email: event.target.value })
  };
  inputPassword = event => {
    this.setState({ password: event.target.value })
  };

  // fonction pour notre Submit
  handleSubmitAdmin = event => {
    event.preventDefault();
    if (this.validateForm()) {
      const admin = {
        name: this.state.name,
        lastname: this.state.lastname,
        email: this.state.email,
        password: this.state.password
      };

      axios.post('http://localhost:8000/admin/sign-up', admin)
        .then(res => {
          if (res.status === 403) {
            this.setState({ msgSuccess: "Vous avez bien été enregistré !" })
          }
          console.log(res);
          console.log(res.data);
        }).catch(function (error) {
          console.log(error);
        });

    }

  }

  handleSubmitUser = event => {
    event.preventDefault();
    if (this.validateForm()) {
      const user = {
        name: this.state.name,
        lastname: this.state.lastname,
        email: this.state.email,
        password: this.state.password
      };

      axios.post('http://localhost:8000/users/sign-up', user)
        .then(res => {
          if (res.status === 403) {
            this.setState({ msgSuccess: "Vous avez bien été enregistré !" })
          }
          console.log(res);
          console.log(res.data);
        }).catch(function (error) {
          console.log(error);
        });

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
        errors["password"] = "*Please enter secure and strong password. Must be at least 8 characters, 1 special characteh (@#$%&), 1 number, 1 lowercase, 1 uppercase letter";
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
          Inscrivez vous !
</p>

        <div class="tabs">
          <div class="tab-2">
            <label for="tab2-1">Vous etes un admin ?</label>
            <input id="tab2-1" name="tabs-two" type="radio" checked="checked" />
            <div>
              {/* <h4>Tab One</h4> */}
              {/* <p>loremmm</p> */}
              <div className="login-box" >
                <h2>Hello there !</h2>
                <p>To keep enjoy our content please login with your personal info</p>
                <br></br>
                <form onSubmit={this.handleSubmitAdmin}>
                  {/* { this.state.message && <p> {this.state.message} </p> } */}
                  <div className="user-box">
                    <input type="name" onChange={this.inputName} />
                    <div className="errorMsg">{this.state.errors.name}</div>

                    <label>Nom</label>
                  </div>
                  <div className="user-box">
                    <input type="name" onChange={this.inputLastName} />
                    <div className="errorMsg">{this.state.errors.lastname}</div>

                    <label>Prénom</label>
                  </div>
                  <div className="user-box">
                    <input type="email" onChange={this.inputEmail} />
                    <div className="errorMsg">{this.state.errors.email}</div>

                    <label>Email</label>
                  </div>    <div className="user-box">
                    <input type="password" onChange={this.inputPassword} />
                    <div className="errorMsg">{this.state.errors.password}</div>

                    <label>Password</label>
                  </div>
                  <link href="https://fonts.googleapis.com/css2?family=Cookie&display=swap" rel="stylesheet"></link>
                  <button id="btn" type="submit"><span className="noselect">Submit</span><div id="circle"></div></button>

                </form>
              </div>
            </div>
          </div>
          <div class="tab-2">
            <label for="tab2-2">Vous etes un artiste ?</label>
            <input id="tab2-2" name="tabs-two" type="radio" />
            <div>
              <div className="login-box2" >
                <h2>Welcome Back !</h2>
                <p>To keep enjoy our content please login with your personal info</p>
                <br></br>
                <form onSubmit={this.handleSubmitUser}>
                <div className="user-box">
                    <input type="name" onChange={this.inputName} />
                    <div className="errorMsg">{this.state.errors.name}</div>

                    <label>Prénom</label>
                  </div>
                  <div className="user-box">
                    <input type="name" onChange={this.inputLastName} />
                    <div className="errorMsg">{this.state.errors.lastname}</div>

                    <label>Nom</label>
                  </div>
                  <div className="user-box">
                    <input type="email" onChange={this.inputEmail} />
                    <div className="errorMsg">{this.state.errors.email}</div>

                    <label>Email</label>
                  </div>    <div className="user-box">
                    <input type="password" onChange={this.inputPassword} />
                    <div className="errorMsg">{this.state.errors.password}</div>

                    <label>Password</label>
                  </div>
                  <link href="https://fonts.googleapis.com/css2?family=Cookie&display=swap" rel="stylesheet"></link>
                  <button id="btn" type="submit"><span className="noselect">Submit</span><div id="circle"></div></button>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RegisterForm
