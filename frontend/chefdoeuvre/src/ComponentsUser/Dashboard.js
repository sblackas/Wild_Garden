import React from 'react';
import './Dashboard.css';
import axios from 'axios'
import { connect } from 'react-redux'
import TableTest from './Table'
// import { userData } from '../Store/actions/artist';






class Dashboard extends React.Component {
  state = {
    name: "",
    lastname: "",
    pp: "",
    email: "",
    successMsg: "",

  };

  editName = event => {
    this.setState({ name: event.target.value })
  };
  editLastName = event => {
    this.setState({ lastname: event.target.value })
  };
  editPicture = event => {
    this.setState({ user_pp: event.target.value })
  };
  editEmail = event => {
    this.setState({ email: event.target.value })
  };


  handleSubmitEdition = async event => {
    // async parce que la requete doit attendre sinon elle passera dans else
    event.preventDefault();

    let resp = await axios.get(`http://localhost:8000/users/${this.props.id}`)
    // une requete axios GET et DELETE n'envoient jamais de req.body, elle ne le liront
    console.log(resp);
    console.log(resp.data);

    const editedUser = {
      //ce qui est avant les deux points est le req.body dans le back /!\
      name: this.state.name || resp.data[0]["u_name"], // soit tu me mets ce qu'il y a dans l'input OU ce qu'il y a 
      lastname: this.state.lastname || resp.data[0]["u_lastname"],
      pp: this.state.pp || resp.data[0]["u_pp"],
      email: this.state.email || resp.data[0]["u_email"],
    };
    console.log(editedUser, this.props.id);

    axios.put(`http://localhost:8000/users/${this.props.id}`, editedUser, { headers: {authorization: `Bearer ${this.props.token}` }})
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


        {/* <p>{this.props.token}</p> */}
        <p>{this.props.editedUser}</p>

        <div className="profileBox1">
          <h1>&bull; Editez votre profil &bull;</h1>
          <div className="underline">
          </div>
          <p>{this.state.successMsg}</p>

          <form onSubmit={this.handleSubmitEdition}>
            <div className="firsttname">
              <label for="Name"></label>
              <input type="name" placeholder="Prénom" onChange={this.editName} />
            </div>
            <div className="lastname">
              <label for="Name"></label>
              <input type="name" id="lastname_input" placeholder="Nom" onChange={this.editLastName} />
            </div>
            <div className="email">
              <label for="email"></label>
              <input type="text" id="email_input" placeholder="Adresse Email" onChange={this.editEmail} />
            </div>


            <div className="pp">
              <label for="Picture"></label>
              <input type="text" id="picture_profile" placeholder="Picture Profile" onChange={this.editPicture} />
            </div>


          </form>
          <div className="submit">
            <button type="submit" value="Submit" id="form_button" onClick={this.handleSubmitEdition} ><span>Submit</span><div id="circle"></div></button>
          </div>
        </div>
        <h1>&bull; Editez vos oeuvres &bull;</h1>


<TableTest/>

      </div>
    );
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    id: state.artistReducer.id,
    token: state.artistReducer.token
  }
}

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);