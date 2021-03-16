import React from 'react'
import './OurArtists.css'
// import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { listCate } from '../Store/actions/categories';
import { usersList } from '../Store/actions/artist';
import { personalArtworks } from '../Store/actions/artworks'


export class OurArtists extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

countArtwork(id_user){
 const count = this.props.artworks.filter(elem => elem.id_user === id_user).length
 return count
}




    render() {
      // console.log(this.countArtwork(3));
        return (
            <div className="OurArtists">
              <div className="popo">
              <p className="titleOurartists">Nos Artistes</p>
              <p className="bg-text">ARTWORKS</p>
              </div>
                <div className="o-text">
    <p>Les artistes que vous allez découvrir sont avant tout des "coups de cœur" humain avec l’artiste. Ils ont été choisi pour leur travail mais aussi pour ce qu’il sont. Des artistes au talent reconnu ou méconnu représentant la diversité de la création contemporaine à travers la peinture, le dessin, l'edition, ...
.</p>
  </div>
                <div className="line">
                </div>
                <div className="content-wrapper">
                {this.props.categories.map(elem => {
                       return (

     <div className="news-card">
          <Link to={`/oeuvres-of/${elem.id_cate}`} className="news-card__card-link" >
          <img src={elem.cate_picture} alt={elem.cate_name} className="news-card__image" />
          <div className="news-card__text-wrapper">
            <h2 className="news-card__title">{elem.cate_name}</h2>
            {/* <div className="news-card__post-date">Jan 29, 2018</div> */}
            <div className="news-card__details-wrapper">
 <div className="news-card__read-more">Voir les oeuvres <i className="fas fa-long-arrow-alt-right" /></div>
            </div>
          </div>
         </Link>
        </div>
             )
            })}
      </div>

<div className="artistContainer">
{this.props.users.map(elem => {
                       return (
      <div className="fir-image-figure">
        {/* <a className="fir-imageover" rel="noopener" target="_blank" href="#"> */}
        <Link to={`/galerie-of/${elem.id_user}`}>
          <div className="fir-author-image fir-clickcircle" style={{ backgroundImage: `url("http://localhost:8000/uploads/${elem.u_pp}")`, backgroundPositionY: 'center', backgroundPositionX: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} />
          </Link>
        {/* </a> */}
        <figcaption>
          <div className="fig-author-figure-title">{elem.u_name}</div> 
          <div className="fig-author-figure-title">{elem.u_lastname}</div>
          <div className="fig-author-figure-title">Pays</div>
          <div className="fig-author-figure-title"> {this.countArtwork(elem.id_user)} oeuvres</div>
        </figcaption>
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
            categories: state.cateReducer.categories,
            users: state.artistReducer.users,
            myArtworks: state.artworksReducer.myArtworks,
            id: state.cateReducer.id,
            artworks: state.artworksReducer.artworks

    
        }
    }
    
    const mapDispatchToProps = { listCate, usersList, personalArtworks }
    
    export default connect(
        mapStateToProps,
        mapDispatchToProps
    )(OurArtists);
