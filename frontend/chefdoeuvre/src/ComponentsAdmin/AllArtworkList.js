import React from 'react'
import axios from 'axios'
import './AllArtworkList.css'
import { connect } from 'react-redux'
import { listArtworks, deleteArtwork } from '../Store/actions/artworks';
import { listCate } from '../Store/actions/categories';
import bin from '../imagesDashUser/bin.png'



export class AllArtworkList extends React.Component {
  state = {
    title: "",
    description: "",
    picture: "",
    id_artwork:"",
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



  handleSubmitEdition = async event => {
    event.preventDefault();
    // let res = await axios.get(`http://localhost:8000/artwork/${this.props.match.params.id_artwork}`)

    // let decodedToken = localStorage.getItem('tokenAdmin')
    // decodedToken = jwt.decode(decodedToken)

    const editedArtwork = {
      title: this.state.title ,
      description: this.state.description,
      picture: this.state.picture,
      // id_admin: parseInt(decodedToken.id),
      id_cate: parseInt(this.state.id_cate)
    };

    axios.put(`http://localhost:8000/update-artwork/${this.state.id_artwork}`, editedArtwork, { headers: { authorization: `Bearer ${localStorage.getItem('tokenAdmin')}` } })
      .then(res => {
        if (res.status === 200) {
          console.log(res);
          console.log(res.data);
          this.setState({ msgSuccess: " L'oeuvre a bien été modifié !" })
          this.props.editArtwork(editedArtwork)
        }
      })
      .catch(error => {
        console.log("catch error");
        console.log(error);
      })

  }

  deleteRow(id_artwork, e) {
    axios
      .delete(`http://localhost:8000/delete-artwork/${id_artwork}`, {
        headers: { authorization: `Bearer ${localStorage.getItem('tokenAdmin')}` }
      })
      .then((res) => {
        if (res.status === 200) {
          this.props.deleteArtwork(id_artwork)
          this.setState({ msgSuccess: 'Oeuvre supprimé avec succès' });

        }
      });
  }

  handleChange = (e) => {
    console.log(e.target.id, e.target.value)
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  editionFunction = (id_artwork, art_title, art_desc, art_picture, id_cate) => {
    console.log(id_artwork, art_title, art_desc, art_picture);
    this.setState({
      id_artwork: id_artwork,
      title: art_title,
      description: art_desc,
      picture: art_picture,
      id_cate: id_cate
    })
  }


  render() {
    if (this.props.artworks.length === 0) {
      axios.get('http://localhost:8000/all-of-artworks')
        .then(res => {
          console.log(res);
          // console.log(this.props.artworks);
          this.props.listArtworks(res.data)

        })
    }

    return (
      <div>
        <div className="AllArtworkList">

          <div className="title"><h1>&bull; All of Artworks List &bull;</h1></div>

          {/* {console.log(this.props.artworks)} */}
          <div className="cards-container">
            {this.props.artworks.map(elem => {
              return (

                <div className="container" key={elem.id} style={{ backgroundImage: `url(${elem.art_picture})`, backgroundPositionY: 'center', backgroundPositionX: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}>
                  <div className="overlay" >
                    <div className="items"></div>
                    <div className="items head">
                      <p>{elem.art_title}</p>
                      <p>{elem.art_desc}</p>
                      <hr />
                    </div>
                    <div className="items price">

                      {/* <p className="new">{elem.price}€</p> */}
                    </div>
                    <div className="items cart">
                      <i className="fa fa-shopping-cart"></i>
                      {/* <Link to={`/artwortk-details/ ${elem.id_artwork}`} ><span className="po">DETAILS</span></Link> */}
                    </div>
                  </div>
                  <details>
                    <summary>
                      {/* <div className="pocontent" onClick={() => this.editionFunction(elem.id_artwork, elem.art_title, elem.art_desc, elem.art_picture, elem.id_cate)}><span className="po">Modifier</span></div> */}
                      <button type="submit" value="Submit" id="table_button" onClick={(e) => this.deleteRow(elem.id_artwork, e)} ><img src={bin} className="bin_icon" alt="" /><div id="circle-table"></div></button>
                      <div class="details-modal-overlay"></div>
                    </summary>

                    <div class="details-modal">
                      <div class="details-modal-close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M13.7071 1.70711C14.0976 1.31658 14.0976 0.683417 13.7071 0.292893C13.3166 -0.0976311 12.6834 -0.0976311 12.2929 0.292893L7 5.58579L1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L5.58579 7L0.292893 12.2929C-0.0976311 12.6834 -0.0976311 13.3166 0.292893 13.7071C0.683417 14.0976 1.31658 14.0976 1.70711 13.7071L7 8.41421L12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L8.41421 7L13.7071 1.70711Z" fill="black" />
                        </svg>
                      </div>
                      <div class="details-modal-title">
                        <h1>{elem.art_title}</h1>
                      </div>
                      <div class="details-modal-content">

                        <div className="profileBox1">
                          <h1>&bull; Edition &bull;</h1>
                          <div className="underline"></div>
                          <p>{this.state.msgSuccess}</p>

                          <form onSubmit={this.handleEditionOfArtwork} key={this.state.id_artwork || ""}>
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

                    </div>
                  </details>

                </div>
              )
            })}
          </div>



        </div>
      </div>
    )
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    artworks: state.artworksReducer.artworks,
    id: state.artistReducer.id,
    id_artwork: state.artworksReducer.id_artwork,
    categories: state.cateReducer.categories,


  }
}

const mapDispatchToProps = { listArtworks, listCate, deleteArtwork }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllArtworkList);
