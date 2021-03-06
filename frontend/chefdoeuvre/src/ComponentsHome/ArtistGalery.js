import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import './ArtistGalery.css'
import { connect } from 'react-redux'
import { personalArtworks } from '../Store/actions/artworks';
// import jwt from 'jsonwebtoken'


export class ArtistGalery extends React.Component {
  state = {
    userData: [],
    name: "",
    lastname: "",
    pp: "",

  }

  componentDidMount() {
    
    axios.get(`http://localhost:8000/users/${this.props.match.params.id_user}`)
      .then(res => {
        console.log(res.data);
        this.setState({userData: res.data})
      })
      .catch(error => {
        console.log("catch error");
        console.log(error);
      });

    axios.get(`http://localhost:8000/get-artwork/${this.props.match.params.id_user}`)
      .then(res => {
        console.log(res.data);
        this.props.personalArtworks(res.data);
  // console.log(this.props.personalArtworks);
      })
      .catch(error => {
        console.log("catch error");
        console.log(error);
      })

  }


  render() {
    return (
      <div className="ArtistGalery">
        <div className="m-container">
        {this.state.userData.map(elem => {
          return (
            <div className="user-bio">
              
              <div className="rond" style={{ backgroundImage: `url(${elem.u_pp})`, backgroundPositionY: 'center', backgroundPositionX: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}>
          {/* <img src={elem.u_pp} alt='pp' /> */}
          </div>
          <div className="user-info">
                <h2>{elem.u_name}</h2>
                <h2>{elem.u_lastname}</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
              </div>
          )
        })}

        <div id="h-portfolio" >
          {this.props.myArtworks && this.props.myArtworks.map(elem => {
            return (
              <div className="tilee scale-anm web all" key={elem.id}>
               <Link to={`/the-artwork/${elem.id_artwork}`} > <img src={elem.art_picture} alt="" /></Link>
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
    myArtworks: state.artworksReducer.myArtworks,
    id: state.artistReducer.id
  }
}

const mapDispatchToProps = { personalArtworks }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtistGalery);
