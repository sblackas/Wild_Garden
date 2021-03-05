import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { listFavs, deleteFromFav } from '../Store/actions/artworks'

export class MyFavs extends Component {

componentDidMount() {
    axios.get('http://localhost:8000/get-favs/', { headers: { authorization: `Bearer ${localStorage.getItem('tokenUser')}` } })
    .then(res => {
      console.log(res);
      console.log(res.data);
      this.props.listFavs(res.data)
    })
    .catch(error => {
      console.log("catch error");
      console.log(error);
    })
}

deleteFavori(id_artwork) {
    axios
        .delete(`http://localhost:8000/my-favs/${id_artwork}`, {
            headers: { authorization: `Bearer ${localStorage.getItem('tokenUser')}` }
        })
        .then((res) => {
            if(res.status === 200) {
                this.props.deleteFromFav(id_artwork)
                this.setState({ msgSuccess: 'Oeuvre supprimé avec succès' });

            } 
        });
}

    render() {
        return (
            <div className="MyFavs">
                {this.props.myFavs.map(elem => {
                    return (
                        <div className="listfav" key={elem.id_artwork}>
                            <div className="imagenya">
                                <img className="imgstyle" src={elem.art_picture} alt={elem.art_title} />
                            </div>
                            <div className="descnya">
                                <h3>{elem.art_title}</h3>
                                <p>
                                    <br />
                                    <button onClick={() => this.deleteFavori(elem.id_artwork)}>
                                        Delete from Favorite
                                    </button>
                                </p>
                            </div>

                        </div>
                    )
                })}
            </div>

        )
    }
}

const mapStateToProps = (state /*, ownProps*/) => {
    return {
        id: state.artistReducer.id,
        id_artwork: state.artworksReducer.id_artwork,
        artworks: state.artworksReducer.artworks,
        myFavs: state.artworksReducer.myFavs,
        token: state.artistReducer.token
    }
}

const mapDispatchToProps = { listFavs, deleteFromFav }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyFavs);