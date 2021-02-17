import React from 'react'
import './OurArtists.css'
import axios from 'axios';
import { connect } from 'react-redux'
import { listCate } from '../Store/actions/categories';
import { usersList } from '../Store/actions/artist';


export class OurArtists extends React.Component {


    render() {

        return (
            <div className="OurArtists">
                <div className="line">
                </div>
                
                <div className="content-wrapper">
                {this.props.categories.map(elem => {
                       return (

     <div className="news-card">
          <a href="#" className="news-card__card-link" />
          <img src={elem.cate_picture} alt={elem.cate_name} className="news-card__image" />
          <div className="news-card__text-wrapper">
            <h2 className="news-card__title">{elem.cate_name}</h2>
            {/* <div className="news-card__post-date">Jan 29, 2018</div> */}
            <div className="news-card__details-wrapper">
              <a href="#" className="news-card__read-more">Voir les oeuvres <i className="fas fa-long-arrow-alt-right" /></a>
            </div>
          </div>
         
        </div>
             )
            })}
      </div>

<div className="artistContainer">
{this.props.users.map(elem => {
                       return (
      <figure className="fir-image-figure">
        <a className="fir-imageover" rel="noopener" target="_blank" href="#">
          <img className="fir-author-image fir-clickcircle" src="https://fir-rollup.firebaseapp.com/de-sm.jpg" alt="David East - Author" />
        </a>
        <figcaption>
          <div className="fig-author-figure-title">{elem.u_name} {elem.u_lastname}</div>
          <div className="fig-author-figure-title">Engineer</div>
          <div className="fig-author-figure-title">Jan. 16th, 2017 </div>
        </figcaption>
      </figure>
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
            users: state.artistReducer.users
    
        }
    }
    
    const mapDispatchToProps = { listCate, usersList }
    
    export default connect(
        mapStateToProps,
        mapDispatchToProps
    )(OurArtists);
