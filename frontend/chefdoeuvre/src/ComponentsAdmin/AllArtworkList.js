import React from 'react'
import axios from 'axios'
import './AllArtworkList.css'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { listArtworks } from '../Store/actions/artworks';


export class AllArtworkList extends React.Component {



    render() {
        if (this.props.artworks.length === 0) {
            axios.get('http://localhost:8000/all-of-artworks')
                .then(res => {
                    console.log(res);
                    // console.log(this.props.artworks);
                    this.props.listArtworks(res.data)

                })
        }

        return (
            <div>
                <div className="AllArtworkList">

                    <div className="title"><h1>&bull; All of Artworks List &bull;</h1></div>

                    {/* {console.log(this.props.artworks)} */}
                    <div className="cards-container">
                        {this.props.artworks.map(elem => {
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
                                            <Link to={`/artwortk-details/ ${elem.id_artwork}`} ><span>DETAILS</span></Link>
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
        artworks: state.artworksReducer.artworks,
        id: state.artistReducer.id,
        id_artwork: state.artworksReducer.id_artwork,


    }
}

const mapDispatchToProps = { listArtworks }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AllArtworkList);
