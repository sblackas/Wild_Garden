// import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { personalArtworks } from '../Store/actions/artworks';
import './ArtworksList.css'


class ArtworksList extends React.Component {
    state = {
        myArtworks: [],
    }

    render() {
        // console.log("ID => ", this.props.id)
        // if (this.props.id && !this.state.myArtworks.length) {
        //     axios.get(`http://localhost:8000/get-artwork/${this.props.id}` )
        //     .then(res => {
        //         console.log("test", res.data);
        //         // this.setState({ myArtworks: res.data })
        //         // console.log(this.state.myArtworks);
        //         this.props.personalArtworks(res.data)
        //     })
        // }

        // j'ai mis cette condition dans le render au lieu du componentDimount. Si y'a un id et qu'il y a le tableau vide alors tu me fais le axios
        // quand c'est fait alors il render mes oeuvres et recommence à render mais cette fois ci le tableau n'est plus vide a cause du render d'avant ca ne se refait pas

        return (
            <div>
                <div className="ArtworksListPage">

                    <div className="title"><h1>&bull; Artworks List &bull;</h1></div>
                    {/* {console.log(this.state.myArtworks)} */}
                    <div className="cards-container">
                        {this.props.myArtworks.map(elem => {
                            return (

                                <div className="container" key={elem.id} style={{ backgroundImage: `url(${elem.art_picture})`, backgroundPositionY: 'center', backgroundPositionX: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}>
                                    <div className="overlay" >
                                        <div className="items"></div>
                                        <div className="items head">
                                            <p>{elem.art_title}</p>
                                            <p>{elem.art_desc}</p>
                                            <hr />
                                        </div>
                                        <div className="items price">
                                            {/* <p className="new">{elem.price}€</p> */}
                                        </div>
                                        <div className="items cart">
                                            <i className="fa fa-shopping-cart"></i>
                                            <Link to={`/user/edition-artwork/${elem.id_artwork}`} ><span>DETAILS</span></Link>
                                        </div>
                                    </div>
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
        id: state.artistReducer.id,
        id_artwork: state.artworksReducer.id_artwork,


    }
}

const mapDispatchToProps = { personalArtworks }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArtworksList);














