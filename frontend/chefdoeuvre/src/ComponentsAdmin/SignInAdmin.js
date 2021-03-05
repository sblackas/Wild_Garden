import React from 'react';
import axios from 'axios'
import { connect } from 'react-redux'
import { loginAdmin } from '../Store/actions/admin';
import './SignInAdmin.css'
import jwt from 'jsonwebtoken';



export class SignInAdmin extends React.Component {
    state = {

        email: "",
        password: "",
        message: null,
        redirection: false,
        msgSuccess: "",
        errors: {},
    
    };



        inputEmailAdmin = event => {
            this.setState({email:event.target.value})
        };
        inputPasswordAdmin = event => {
            this.setState({password:event.target.value})
        };



      handleSubmitSignInAdmin = event => {
        event.preventDefault();
        // if (this.validateForm()) {
        const adminLogged = {
            email: this.state.email,
            password: this.state.password
        };
    
        axios.post('http://localhost:8000/admin/sign-in', adminLogged)
        .then(res => {
            this.setState({ redirection: true})
            if(res.status === 200) {
              console.log(res);
              let decoded = jwt.decode(res.data.token);
              // alert(decoded.email);
              let loggedAdmin = {
                token: res.data.token,
                email: decoded.email,
                id: decoded.id
              };
              localStorage.setItem("tokenAdmin", res.data.token)
              localStorage.setItem('email', decoded.email)
              this.props.loginAdmin(loggedAdmin)
              console.log(loggedAdmin);
              this.props.history.push('/admin/dashboard');
  
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


    // }

  }

    // validateForm = () => {

    //   let errors = {};
    //   let formIsValid = true;
    
    
    //   //______Email validation
    //   if (!this.state["email"]) {
    //     formIsValid = false;
    //     errors["email"] = "*Please enter your email.";
    //   }
    
    //   if (typeof this.state["email"] !== "undefined") {
    //     //regular expression for email validation
    //     var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    //     if (!pattern.test(this.state["email"])) {
    //       formIsValid = false;
    //       errors["email"] = "*Please enter valid email.";
    //     }
    //   }
    
    // //_______Password
    //   if (!this.state["password"]) {
    //     formIsValid = false;
    //     errors["password"] = "*Please enter your password.";
    //   }
    
    //   if (typeof this.state["password"] !== "undefined") {
    //     if (!this.state["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
    //       formIsValid = false;
    //       errors["password"] = "*Please the correct password. Must be at least 8 characters, 1 special character (@#$%&), 1 number, 1 lowercase, 1 uppercase letter";
    //     }
    //   }
    
    //   this.setState({
    //     errors: errors
    //   });
    //   return formIsValid;
    
    
    // }


    render() {
        return (
            <div id="SignInAdmin">
                <h1>
           Administrateur
</h1>
<div className="login-box-admin" >
                 <h2>Hello there !</h2>
                 <p>Veuillez vous connectez</p>
                 <br></br>
                 <form onSubmit={this.handleSubmitSignInAdmin}>
                   {/* { this.state.message && <p> {this.state.message} </p> } */}
                   
                   <div className="user-box">
                     <input type="email" onChange={this.inputEmailAdmin} />
                     <div className="errorMsg">{this.state.errors.email}</div>

                     <label>Email</label>
                   </div>    <div className="user-box">
                     <input type="password" onChange={this.inputPasswordAdmin} />
                     <div className="errorMsg">{this.state.errors.password}</div>

                     <label>Password</label>
                   </div>
                   <link href="https://fonts.googleapis.com/css2?family=Cookie&display=swap" rel="stylesheet"></link>
                   <button id="btn" type="submit"><span className="noselect">Submit</span><div id="circle"></div></button>

                 </form>
               </div>

            </div>
        )
    }
}

const mapStateToProps = (state /*, ownProps*/) => {
    return { }
  }
  
  const mapDispatchToProps = { loginAdmin }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignInAdmin) ;
