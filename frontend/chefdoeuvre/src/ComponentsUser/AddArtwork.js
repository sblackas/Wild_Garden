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
    msgSuccess: "",
    selectedOption:"",
    categories : []
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

  handleSelect = ({ target }) => {
    this.setState({
        selectedOption: target.value,
    });
}

  handleSubmit = event => {
    event.preventDefault();

    const artwork = {
      title: this.state.title,
      description: this.state.description,
      picture: this.state.picture,
      id_user: this.props.id,
      id_cate: this.state.selectedOption
    };
    console.log(artwork);
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
      if(this.state.categories.length === 0) {
        axios.get('http://localhost:8000/categories')
         .then (res => {
         console.log(res.data);
         this.setState({ categories: res.data })
    })
}
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
            <select id="subject_input" 
            value={this.state.selectedOption}
            onChange={this.handleSelect}
            >
              <option selected >Veuillez selectionnez une categorie</option>
            {this.state.categories.map(({ id_cate, cate_name }) => <option value={id_cate} >{cate_name}</option>)}
            </select>
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