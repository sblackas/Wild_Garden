import React from 'react'
import HeaderAdmin from '../ComponentsAdmin/HeaderAdmin';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { listArtworks } from '../Store/actions/artworks';


export class AllArtworkList extends React.Component {
    state = {
        allOfartworks: [],
    }


    render() {
        if (this.state.allOfartworks.length === 0) {
            axios.get('http://localhost:8000/all-of-artworks')
                .then(res => {
                    console.log(res);
                    this.setState({ allOfartworks: res.data })
                    console.log(this.state.allOfartworks);
                    this.props.listArtworks(res.data)

                })
        }

        return (
            <div>
                <div className="Head"><HeaderAdmin /></div>
                <div className="ArtworksListPage">

                    <div className="title"><h1>&bull; All of Artworks List &bull;</h1></div>

                    {console.log(this.state.allOfartworks)}
                    <div className="cards-container">
                        {this.props.allOfartworks.map(elem => {
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
                                            <Link to={`/artwortk-details/ ${elem.id}`} ><span>DETAILS</span></Link>
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
        // id: state.artistReducer.id

    }
}

const mapDispatchToProps = { listArtworks }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AllArtworkList);
