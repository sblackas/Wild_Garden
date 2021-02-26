import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { personalArtworks } from '../Store/actions/artworks'
// import { listComments } from '../Store/actions/comments'
import AddComment from './AddComment'
import './Oeuvre.css'
import DisplayComments from './DisplayComments'


export class Oeuvre extends Component {
    state = {
        title: "",
        description: "",
        picture: "",
        id_artwork: this.props.match.params.id_artwork,
        commentOnArtwork: this.props.comments
    };

    componentDidMount() {

        axios.get(`http://localhost:8000/artwork/${this.props.match.params.id_artwork}`)
            .then(res => {
                console.log(res.data);
                console.log(this.props.match.params.id_artwork);
                this.props.personalArtworks(res.data);
                this.setState({ title: res.data[0].art_title, description: res.data[0].art_desc, picture: res.data[0].art_picture })
                console.log(this.state);

                // console.log(this.props.personalArtworks);
            })
            .catch(error => {
                console.log("catch error");
                console.log(error);
            })

    }

    render() {
        // console.log(this.state.picture);
        return (
            <div className="Oeuvre">
                <div className="ll-container">
                    <div className="b-game-card">
                        <div className="b-game-card__cover" >
                            <img src={this.state.picture} alt="" />
                            <h2>{this.state.title}</h2>
                            <p>{this.state.description}</p>
                        </div>
                    </div>
                </div>
                <DisplayComments idArtwork={this.props.match.params.id_artwork} />
                <AddComment id_artwork={this.state.id_artwork} />
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
        comments: state.commentsReducer.comments
    }
}

const mapDispatchToProps = { personalArtworks }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Oeuvre);
