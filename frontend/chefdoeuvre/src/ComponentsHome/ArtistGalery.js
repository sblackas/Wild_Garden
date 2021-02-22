import React from 'react'
import axios from 'axios'
import './ArtistGalery.css'
import { connect } from 'react-redux'
import { personalArtworks } from '../Store/actions/artworks';




export class ArtistGalery extends React.Component {
  state = {
    userData: [],
    galeryTab: [],
    name: "",
    lastname: "",
    pp: "",

  }

  componentDidMount(){

    axios.get(`http://localhost:8000/users/${this.props.id}`)
    .then(res => {
      console.log(res.data);
      this.state.userData(res.data)
  })
  .catch(error => {
      console.log("catch error");
      console.log(error);


  }
  );

  axios.get(`http://localhost:8000/get-artwork/${this.props.id}`)
  .then(res => { 
      console.log(res.data);
      this.props.personalArtworks(res.data)
  })
  .catch(error => {
      console.log("catch error");
      console.log(error);


  }
  )
  
  }


    render() {
        return (
            <div className="ArtistGalery">
                {this.state.userData.map(elem => {
                       return (
                <div className="user-bio">

<div className="pictureprofile">
    <img alt=""></img>
    <h2>{elem.u_name}</h2>
    <h2>{elem.u_lastname}</h2>
    <p>hello</p>
</div>

                </div>
                )
            })}

<div id="h-portfolio" >
{this.state.galeryTab.map(elem => {
                            return (
        <div className="tile scale-anm web all" key={elem.id}>
          <img src={elem.art_picture} alt="" />
        </div>
)
})} 

  </div>
            </div>
        )
    }
}

const mapStateToProps = (state /*, ownProps*/) => {
    return {
        myArtworks: state.artworksReducer.myArtworks,
        id: state.artistReducer.id,



    }
}

const mapDispatchToProps = { personalArtworks }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArtistGalery);
