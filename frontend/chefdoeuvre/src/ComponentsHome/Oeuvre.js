import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { personalArtworks } from '../Store/actions/artworks'
import AddComment from './AddComment'
import './Oeuvre.css'
import DisplayComments from './DisplayComments'
import { addToFav } from '../Store/actions/artworks';
import iconheart from '../imagesHome/iconheart.png'


export class Oeuvre extends Component {
    state = {
        title: "",
        description: "",
        picture: "",
        msgSuccess: "",
        id_artwork: this.props.match.params.id_artwork,
    };

    componentDidMount() {

        const {id_artwork} = this.props.match.params

        axios.get(`http://localhost:8000/artwork/${id_artwork}`)
            .then(res => {
                console.log(res.data);
                console.log(this.props.match.params.id_artwork);
                this.props.personalArtworks(res.data[0]);
                // this.setState({ title: res.data[0].art_title, description: res.data[0].art_desc, picture: res.data[0].art_picture })
                console.log(this.state);

                // console.log(this.props.personalArtworks);
            })
            .catch(error => {
                console.log("catch error");
                console.log(error);
            })

    }

    handleSubmit = (id_artwork) => {
        // event.preventDefault();
        const fav = {
            id_artwork: id_artwork
        };
        console.log(fav);

    axios.post('http://localhost:8000/artwork/add-to-fav', fav, { headers: {authorization: `Bearer ${this.props.token}` }})
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    console.log(res.data);
                    this.setState({ msgSuccess: 'Bien ajouté à vos favoris' });
                    this.props.addToFav(fav);
                }
                console.log(fav);
            })
            .catch((error) => {
                // this.setState({ error : res.data });
                console.log(error);
            });
    };




    render() {
        // console.log(this.state.picture);
        const details = this.props.myArtworks ? (
            <div className="Oeuvre">
                <div className="ll-container">
                    <div className="b-game-card">
                        <div className="b-game-card__cover" >
                            <img src={this.props.myArtworks.art_picture} alt="" />
                        </div>
                            <h2>{this.props.myArtworks.art_title}</h2>
                            <h3>Description</h3>
                            <p>{this.props.myArtworks.art_desc}</p>
                            <div className="favsucess">
                            <button onClick={() => this.handleSubmit(this.props.myArtworks.id_artwork)} id="buttonheart"><img src={iconheart} className="iconheart" alt=""/><div id="circle-table"></div></button>
                            <p>{this.state.msgSuccess}</p>
                            </div>
                    </div>
                </div>
                    <h2>Les avis sur cette oeuvre</h2>
                <DisplayComments idArtwork={this.props.match.params.id_artwork} />
                <AddComment id_artwork={this.state.id_artwork} />
            </div>
        ) : (
            <div className="attente">Loading product...</div>
        )
        return (
            <div className="containertest">{details}</div>
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
        comments: state.commentsReducer.comments,
        myFavs: state.artworksReducer.myFavs,
    }
}

const mapDispatchToProps = { personalArtworks, addToFav }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Oeuvre);
