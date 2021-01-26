import React from 'react';
import HeaderUser from '../ComponentsUser/HeaderUser'
import axios from 'axios'
import './AddArtwork.css'
// import jwt from 'jsonwebtoken';
import { connect } from "react-redux";
import { newArtwork } from '../Store/actions/artworks';



class AddArtwork extends React.Component {
  state = {
    title: "",
    description: "",
    picture: "",
    id_user: "",
    msgSuccess: ""

  };

  // /!\ Bien écrire les elements exactement comme dans la db
  inputTitle = event => {
    this.setState({ title: event.target.value })
  };

  inputDesc = event => {
    this.setState({ description: event.target.value })
  };
  inputPicture = event => {
    this.setState({ picture: event.target.value })
  };

  handleSubmit = event => {
    event.preventDefault();

    const artwork = {
      title: this.state.title,
      description: this.state.description,
      picture: this.state.picture,
      id_user: this.props.id
    };
    console.log(this.props.token);
    axios.post('http://localhost:8000/artwork/add', artwork, { headers: {authorization: `Bearer ${this.props.token}` }})
      .then(res => {
        if (res.status === 200) {
          console.log(res);
          console.log(res.data);

        
        
        // this.props.newArtwork(addedArtwork)
        this.setState({ msgSuccess: "Bien ajouté" })
        }
        

      })

  }



  render() {
    return (
      <div className="AddArtwork">



        <HeaderUser />

        <div className="containerForm">
          <h1>&bull; Ajouter une oeuvre &bull;</h1>
          <div className="underline">
          </div>
          <p>{this.state.msgSuccess}</p>
          <form onSubmit={this.handleSubmit} id="contact_form">
            <div className="title">
              <label for="Titre"></label>
              <input type="text" id="title_input" placeholder="Titre" onChange={this.inputTitle} />
            </div>
            <div className="picture">
              <label for="Picture"></label>
              <input type="text" id="picture_input" placeholder="Image" onChange={this.inputPicture} />
            </div>
            <div className="message">
              <label for="Description"></label>
              <textarea placeholder="Décrivez votre oeuvre" id="message_input" cols="30" rows="7" onChange={this.inputDesc}></textarea>
            </div>
            <div className="submit">
              <button type="submit" value="Submit" id="form_button" ><span>Submit</span><div id="circle"></div></button>
            </div>
          </form>
        </div>


      </div>
    );
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    artwork: state.artworksReducer.payload,
    token: state.artistReducer.token,
    id: state.artistReducer.id
  }
}

const mapDispatchToProps = { newArtwork }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddArtwork);