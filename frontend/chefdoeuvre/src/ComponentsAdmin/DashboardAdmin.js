import React from 'react';
import HeaderAdmin from './HeaderAdmin';
import './DashboardAdmin.css';
import axios from 'axios' 




class DashboardAdmin extends React.Component{
  state = {
    name: "",
    lastname: "",
    email: "",
    password: ""

};

editName = event => {
  this.setState({name:event.target.value})
};
editLastName = event => {
    this.setState({lastname:event.target.value})
  };
editEmail = event => {
  this.setState({email:event.target.value})
};
editPassword = event => {
  this.setState({password:event.target.value})
};

handleSubmit = event => {
  event.preventDefault();

 const editedAdmin = {
      name: this.state.name,
    lastname: this.state.lastname,
       email: this.state.email,
       password: this.state.password
  };

  axios.put('http://localhost:8000/admin/:edit', editedAdmin)
  .then(res => {
      console.log(res);
      console.log(res.data);
  })

}

render() {
  return (
    <div className="Dashboard">
      <HeaderAdmin/>


{/* <p>{this.props.token}</p> */}
{/* <p>{this.props.user}</p> */}
<p>This is the dashboard </p>

<div className="profileBox1">
  <h1>&bull; Editer votre profil &bull;</h1>
  <div className="underline">
  </div>
  <form onSubmit={this.handleSubmit}>
    <div className="firsttname">
      <label for="Name"></label>
      <input type="name" placeholder="Prénom" onChange={this.editName}/>
    </div>
    <div className="lastname">
      <label for="Name"></label>
      <input type="name" id="lastname_input" placeholder="Nom" onChange={this.editLastName}/>
    </div>
    <div className="email">
      <label for="email"></label>
      <input type="text" id="email_input" placeholder="Adresse Email" onChange={this.editEmail}/>
    </div>

    <div className="password">
      <label for="password"></label>
      <input type="text" placeholder="Mot de passe" onChange={this.editPassword}></input>
    </div>
    
    {/* <div className="pp">
      <label for="Picture"></label>
      <input type="text"  id="picture_profile" placeholder="Picture Profile" onChange={this.editPicture}/>
    </div> */}


  </form>
  <div className="submit">
      <button type="submit" value="Submit" id="form_button" ><span>Submit</span><div id="circle"></div></button>
    </div>
</div>


{/* <div className="profileBox2">
  <h1>&bull; Your Products List &bull;</h1>

</div> */}

    </div>
  );
}
}



export default DashboardAdmin;