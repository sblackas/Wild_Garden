import axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';


export class FilteredArtworks extends Component {
    state = {
        oeuvres: []
    }

    componentDidMount() {
        axios.get(`http://localhost:8000/artworks/filter/${this.props.match.params.id_cate}`)
        .then(res => {
            console.log(res.data);
            this.setState({oeuvres: res.data})
          })
          .catch(error => {
            console.log("catch error");
            console.log(error);
          });
    }

    render() {
        return (
            <div>
                <div id="portfolio" >
                {this.state.oeuvres.map(elem => {
                        return (        
                            <div  className="tile scale-anm web all" key={elem.id}>
                                <Link to={`/the-artwork/${elem.id_artwork}`} >
                                <img src={elem.art_picture} alt="" />
                                </Link>
                            </div>
                     )
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    artworks: state.artworksReducer.artworks,
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(FilteredArtworks)
