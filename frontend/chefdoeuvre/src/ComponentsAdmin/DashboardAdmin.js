import React from 'react';
// import HeaderAdmin from './HeaderAdmin';
import './DashboardAdmin.css';
import axios from 'axios' 
import { connect } from 'react-redux'





class DashboardAdmin extends React.Component{
  state = {
    name: "",
    lastname: "",
    email: "",
    password: "",
    successMsg: ""

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

EditProfileData = async event => {
  event.preventDefault();

  let res = await axios.get(`http://localhost:8000/admin/${this.props.id}`)
  console.log(res);
  console.log(res.data);

 const editedAdmin = {
  name: this.state.name || res.data[0]["a_name"], // soit tu me mets ce qu'il y a dans l'input OU ce qu'il y a 
  lastname: this.state.lastname || res.data[0]["a_lastname"],
  email: this.state.email || res.data[0]["a_email"],
  };
  console.log(editedAdmin, this.props.id);

  axios.put(`http://localhost:8000/admin/${this.props.id}`, editedAdmin, { headers: {authorization: `Bearer ${this.props.token}` }})
  .then(res => {
      console.log(res);
      console.log(res.data);
      this.setState({ successMsg: "Votre profil a bien été modifié !" })

  })
  .catch(error => {
    console.log("catch error");
    console.log(error);

  }
  )
}

render() {
  return (
    <div className="Dashboard">
      {/* <HeaderAdmin/> */}


{/* <p>{this.props.token}</p> */}
{/* <p>{this.props.user}</p> */}
<p>{this.props.editedAdmin}</p>

<p>This is the dashboard </p>

<div className="profileBox1">
  <h1>&bull; Editer votre profil &bull;</h1>
  <div className="underline">
  </div>
  <p>{this.state.successMsg}</p>
  <form onSubmit={this.EditProfileData}>
    <div className="firsttname">
      <label htmlFor="Name"></label>
      <input type="name" placeholder="Prénom" onChange={this.editName}/>
    </div>
    <div className="lastname">
      <label htmlFor="Name"></label>
      <input type="name" id="lastname_input" placeholder="Nom" onChange={this.editLastName}/>
    </div>
    <div className="email">
      <label htmlFor="email"></label>
      <input type="text" id="email_input" placeholder="Adresse Email" onChange={this.editEmail}/>
    </div>

    <div className="password">
      <label htmlFor="password"></label>
      <input type="text" placeholder="Mot de passe" onChange={this.editPassword}></input>
    </div>
    
    {/* <div className="pp">
      <label for="Picture"></label>
      <input type="text"  id="picture_profile" placeholder="Picture Profile" onChange={this.editPicture}/>
    </div> */}


  </form>
  <div className="submit">
      <button type="submit" value="Submit" id="form_button" onClick={this.EditProfileData} ><span>Submit</span><div id="circle"></div></button>
    </div>
</div>


    </div>
  );
}
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    id: state.adminReducer.id,
    token: state.adminReducer.token
  }
}

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardAdmin);

