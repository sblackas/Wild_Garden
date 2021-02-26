import React, { Component } from 'react'
import axios from 'axios'
import './DisplayComments.css'
import { connect } from 'react-redux'
// import { personalArtworks } from '../Store/actions/artworks'
import { listCommentsOnArtwork } from '../Store/actions/comments'




export class DisplayComments extends Component {
   

    componentDidMount() {
  
        axios.get(`http://localhost:8000/get-feedback-artwork/${this.props.idArtwork}`)
        .then(resp => {
            console.log(resp.data);
            this.props.listCommentsOnArtwork(resp.data)
        })
        .catch(error => {
            console.log('catch error');
            console.log(error);
        })
    }
    render() {
        console.log(this.props.commentsOnArtwork);
        return (
            <div className="DisplayComments">
                                <section id="section-com">
                    {this.props.commentsOnArtwork.map(elem =>{
                        return (
                            <div id="comment-container">
                            <div className="com-profile-img"></div>
                            <div className="good">
                                <h1>{elem.u_name}</h1>
                                <h1>{elem.u_lastname}</h1>
                                <div class="com-description">
                                   {elem.commentary} 
      </div>
                            </div>
                        </div>
                         )
                 })}  
                   
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state /*, ownProps*/) => {
    return {
        id: state.artistReducer.id,
        id_artwork: state.artworksReducer.id_artwork,
        artworks: state.artworksReducer.artworks,
        commentsOnArtwork: state.commentsReducer.commentsOnArtwork


    }
}

const mapDispatchToProps = { listCommentsOnArtwork }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DisplayComments);

