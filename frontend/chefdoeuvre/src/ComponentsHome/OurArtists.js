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

    render() {

        return (
            <div className="OurArtists">
              <div className="popo">
              <p className="titleOurartists">Nos Artistes</p>
              <p className="bg-text">ARTWORKS</p>
              </div>
                <div className="o-text">
    <p>Lorem ipsum dolor sit amet,  ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </div>
                <div className="line">
                </div>
                <div className="content-wrapper">
                {this.props.categories.map(elem => {
                       return (

     <div className="news-card">
          <Link to="/" className="news-card__card-link" />
          <img src={elem.cate_picture} alt={elem.cate_name} className="news-card__image" />
          <div className="news-card__text-wrapper">
            <h2 className="news-card__title">{elem.cate_name}</h2>
            {/* <div className="news-card__post-date">Jan 29, 2018</div> */}
            <div className="news-card__details-wrapper">
              <a href="/" className="news-card__read-more">Voir les oeuvres <i className="fas fa-long-arrow-alt-right" /></a>
            </div>
          </div>
         
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
          <div className="fir-author-image fir-clickcircle" style={{ backgroundImage: `url(${elem.u_pp})`, backgroundPositionY: 'center', backgroundPositionX: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} />
          </Link>
        {/* </a> */}
        <figcaption>
          <div className="fig-author-figure-title">{elem.u_name}</div> 
          <div className="fig-author-figure-title">{elem.u_lastname}</div>
          <div className="fig-author-figure-title">Pays</div>
          <div className="fig-author-figure-title"> {this.props.myArtworks.length} Nombre d'oeuvres</div>
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
            // id: state.artistReducer.id,
            myArtworks: state.artworksReducer.myArtworks

    
        }
    }
    
    const mapDispatchToProps = { listCate, usersList, personalArtworks }
    
    export default connect(
        mapStateToProps,
        mapDispatchToProps
    )(OurArtists);
