import React from 'react'
import axios from 'axios';
import jwt from 'jsonwebtoken'
import { connect } from 'react-redux'
import { listCate } from '../Store/actions/categories';
import { personalArtworks } from '../Store/actions/artworks'
import { editArtwork } from '../Store/actions/artworks'
import './EditArtwork.css'

export class EditArtwork extends React.Component {
  state = {
    title: "",
    description: "",
    picture: "",
    id_cate: "",
    msgSuccess: "",
    artworks: [],
  };

  editTitle = event => {
    this.setState({ title: event.target.value })
  };
  editDesc = event => {
    this.setState({ description: event.target.value })
  };
  editPicture = event => {
    this.setState({ picture: event.target.value })
  };
  editCate = event => {
    this.setState({ id_cate: event.target.value })
  };

  componentDidUpdate() {
    // console.log(this.props.match.params.id_artwork);
    // let theartworktoedit = this.props.myArtworks.filter(elem => elem.id_artwork == this.props.match.params.id_artwork)
    // console.log(theartworktoedit);
    // au départ, filter dans componentDidMount mais marchait pas alors componentDidUpdate qui changera en fonction de ce qui a été modifier
    let testtom = this.props.myArtworks.filter(elem => elem.id_artwork == this.props.match.params.id_artwork)
    console.log("-------------------------")
    console.log(testtom)
    if (!this.state.title.length && testtom.length) {
      //si la longueur du tableau et le tableau testtom tu change mes states. 
      // pourquoi this.state.title ? pcq title ou description ou peu importe sont des des chaines de caractère de leur propre tab 
      // dans le front il y a un 0 qui apparait avant le testtom c'est title.lenght comme il est vide
      this.setState({
        title: testtom[0].art_title,
        description: testtom[0].art_desc,
        picture: testtom[0].art_picture,
        id_cate: testtom[0].id_cate
      });
    }
  }

  handleSubmitEdition = async event => {
    event.preventDefault();
    // fonction asynchrone -> doit attendre d'avoir le token pour executer la fonction
    let res = await axios.get(`http://localhost:8000/artwork/${this.props.match.params.id_artwork}`)
   // penser à mettre this.props.match etc dans une variable si je veux
    let decodedToken = localStorage.getItem('tokenUser')
    decodedToken = jwt.decode(decodedToken)

    const editedArtwork = {
      title: this.state.title || res.data[0]["art_title"],
      description: this.state.description || res.data[0]["art_desc"],
      picture: this.state.picture || res.data[0]["art_picture"],
      id_user: parseInt(decodedToken.id),
      id_cate: parseInt(this.state.id_cate || res.data[0]["id_cate"])
    };

    axios.put(`http://localhost:8000/update-artwork/${this.props.match.params.id_artwork}`, editedArtwork, { headers: { authorization: `Bearer ${localStorage.getItem('tokenUser')}` } })
      .then(res => {
        if (res.status === 200) {
          console.log(res);
          console.log(res.data);
          this.setState({ msgSuccess: "Votre oeuvre a bien été modifié !" })
          this.props.editArtwork(editedArtwork)
        }
      })
      .catch(error => {
        // this.setState({ error : res.data });
        console.log("catch error");
        console.log(error);
      })

  }

  render() {

    return (
      <div className="EditArtwork">
        {this.state.title.length && (
// this state title lenght pour regler que je puisse modifier les input
          <div className="l-container">
            <div className="b-game-card">
              <div className="b-game-card__cover" key={this.state.id_artwork || ""} >
                <img src={this.state.picture || ""} alt="" />
              </div>
            </div>

            <div className="profileBox1">
              <h1>&bull; Editez votre oeuvre &bull;</h1>
              <div className="underline"></div>
              <p>{this.state.msgSuccess}</p>
              <form onSubmit={this.handleEditionOfArtwork}>
                <div className="titre">
                  <label htmlFor="titre">Titre</label>
                  <input type="name" value={this.state.title} onChange={this.editTitle} />
                </div>
                <div className="description">
                  <label htmlFor="description">Description</label>
                  <input type="name" id="lastname_input" value={this.state.description} onChange={this.editDesc} />
                </div>
                <div className="pp">
                  <label htmlFor="Picture">Picture</label>
                  <input type="text" id="picture_rt" value={this.state.picture} onChange={this.editPicture} />
                </div>
                <select id="subject_input" onChange={this.editCate}>
                  <option selected >Veuillez selectionnez une categorie</option>
                  {this.props.categories.map(({ id_cate, cate_name }) => <option value={id_cate} >{cate_name}</option>)}
                </select>
              </form>
              <div className="submit">
                <button type="submit" value="Submit" id="form_button" onClick={this.handleSubmitEdition} ><span>Submit</span><div id="circle"></div></button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    id: state.artistReducer.id,
    token: state.artistReducer.token,
    id_artwork: state.artworksReducer.id_artwork,
    artworks: state.artworksReducer.artworks,
    myArtworks: state.artworksReducer.myArtworks,
    categories: state.cateReducer.categories,
  }
}

const mapDispatchToProps = { personalArtworks, editArtwork, listCate }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditArtwork);
