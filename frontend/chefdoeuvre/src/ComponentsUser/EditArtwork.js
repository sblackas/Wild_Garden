import React from 'react'
import axios from 'axios';
import { connect } from 'react-redux'




export class EditArtwork extends React.Component {
    state = {
        title: "",
        description: "",
        picture: "",
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
    
      handleEditionOfArtwork = async event => {
        event.preventDefault();
    
        let res = await axios.get(`http://localhost:8000/artwork/${this.props.id_artwork}`)

        const editedArtwork = {
          title: this.state.title || res.data[0]["art_title"],
          description: this.state.description || res.data[0]["art_desc"],
          picture: this.state.picture || res.data[0]["art_picture"],
        };

    axios.put(`http://localhost:8000/update-artwork/${this.props.id_artwork}`, editedArtwork, { headers: {authorization: `Bearer ${this.props.token}` }})
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.setState({ successMsg: "Votre oeuvre a bien été modifié !" })

      })
      .catch(error => {
        console.log("catch error");
        console.log(error);

      }
      )

    }

    render() {
        console.log(this.props.match.params.id_artwork);
        let testtom = this.props.artworks.filter(elem => elem.id_artwork == this.props.match.params.id_artwork)
        console.log(testtom);
        return (
            <div className="EditArtwork">

                <div class="l-container">

  <div class="b-game-card">
    <div class="b-game-card__cover" key={testtom[0].id_artwork} style={{backgroundImage: `url(${testtom[0].art_picture})`}}>
  </div>
</div>

<div className="profileBox1">
          <h1>&bull; Editez votre oeuvre &bull;</h1>
          <div className="underline">
          </div>
          <p>{this.state.msgSuccess}</p>

          <form onSubmit={this.handleEditionOfArtwork}>
            <div className="firsttname">
              <label for="Name"></label>
              <input type="name" placeholder="Titre" onChange={this.editTitle} />
            </div>
            <div className="lastname">
              <label for="Name"></label>
              <input type="name" id="lastname_input" placeholder="Description" onChange={this.editDesc} />
            </div>
            <div className="pp">
              <label for="Picture"></label>
              <input type="text" id="picture_rt" placeholder="Picture " onChange={this.editPicture} />
            </div>


          </form>
          <div className="submit">
            <button type="submit" value="Submit" id="form_button" onClick={this.handleEditionOfArtwork} ><span>Submit</span><div id="circle"></div></button>
          </div>
        </div>

            </div>
            </div>
        )
    }
}

const mapStateToProps = (state /*, ownProps*/) => {
    return {
      id: state.artistReducer.id,
      token: state.artistReducer.token,
      id_artwork: state.artworksReducer.id_artwork,
      artworks: state.artworksReducer.artworks

    }
  }

  const mapDispatchToProps = {}

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditArtwork);
