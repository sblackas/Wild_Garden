import React from 'react'
import './ArtistGalery.css'
import { connect } from 'react-redux'
import { personalArtworks } from '../Store/actions/artworks';
import { userData } from '../Store/actions/artist';



export class ArtistGalery extends React.Component {
    render() {
        return (
            <div className="ArtistGalery">
                {this.props.userData.map(elem => {
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

                <section className="gallery" >
                {this.props.myArtworks.map(elem => {
                            return (
          <div className="galleryList"
            key={elem.id}>
            <img src={elem.art_picture} alt={elem.art_title} />
            <div className='flex-center' >
              <div className="bbox"
                color='white'
                style={{
                  position: 'absolute',
                  top: '50%'
                }}
              >
                
              </div>
            </div>
          </div>
        );
      })}
    </section>

            </div>
        )
    }
}

const mapStateToProps = (state /*, ownProps*/) => {
    return {
        myArtworks: state.artworksReducer.myArtworks,
        id: state.artistReducer.id,
        userData: state.artistReducer.userData,



    }
}

const mapDispatchToProps = { personalArtworks, userData }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArtistGalery);
