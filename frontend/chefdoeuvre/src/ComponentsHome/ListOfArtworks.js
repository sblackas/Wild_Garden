import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { listArtworks } from '../Store/actions/artworks';
import './ListOfArtworks.css'
import Filter from './Filter'
import { Link } from 'react-router-dom';


export class ListOfArtworks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            artworks: [],
            categorie: null,
            filteredArtworks: []
        }
    }

    filterArtworks = async (e) => {
        console.log(e.target.value)
        if (e.target.value) {
            if (e.target.value === 'Categorie') {
                this.setState({ filteredArtworks: [] })
                return
            }
            console.log(e)
            try {
                let result = await axios.get(`http://localhost:8000/artworks/filter/${e.target.value}`)
                let artworks_filtered = result.data
                this.setState({ filteredArtworks: artworks_filtered })
            } catch (err) {
                console.log(err)
            }
        } else {
            this.setState({ filteredArtworks: null })
        }
    }

    render() {
        const artworksLo = this.state.filteredArtworks.length ? this.state.filteredArtworks : this.props.artworks
        //si la premiere condition n'estpas rempli (?) est un operateur de condition alors tu fais le deuxieme (tu me mets le tab de toutes les oeuvres)
        console.log(artworksLo)
        return (
            <div className="ListOfArtworks">

{/* <div className="titlepage">
    <h1>All of the <br></br><span>Artworks</span></h1>
</div> */}

                <Filter count={artworksLo.length}
                    categorie={this.state.categorie}
                    filterArtworks={this.filterArtworks}></Filter>


                <div id="portfolio" >
                    {artworksLo && artworksLo.map(elem => {
                        return (
                            
                            <div  className="tile scale-anm web all" key={elem.id}>
                                <Link to={`/the-artwork/${elem.id_artwork}`} >
                                <img src={elem.art_picture} alt="" />
                                </Link>
                            </div>
                        )
                    })}
                </div>

                {/* <div className="pour" style="text-align: center">
  <h1>Carousel without JavaScript</h1>
<input id="satu" type="checkbox" class="carouselFullScreen" />
    <ul class="carousel-container">
        <li>
            <input type="checkbox" checked="checked" class="carousel-toggle" />
            <ul class="carousel-content">
                <li><img src="//lorempixel.com/400/200/nature/" /></li>
            </ul>
        </li>
        <label for="satu" class="carousel-fullscreen"></label>
</ul>

<input id="dua" type="checkbox" class="carouselFullScreen" />
    <ul class="carousel-container">
        <li>
            <input type="checkbox" checked="checked" class="carousel-toggle" />
            <ul class="carousel-content">
                <li><img src="//lorempixel.com/200/400/abstract/" /></li>
            </ul>
        </li>
        <label for="dua" class="carousel-fullscreen"></label>
</ul>

<input id="tiga" type="checkbox" class="carouselFullScreen" />
    <ul class="carousel-container">
        <li>
            <input type="checkbox" checked="checked" class="carousel-toggle" />
            <ul class="carousel-content">
                <li><img src="//lorempixel.com/400/200/sports/" /></li>
            </ul>
        </li>
        <label for="tiga" class="carousel-fullscreen"></label>
</ul>
</div>   */}

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    artworks: state.artworksReducer.artworks,
})

const mapDispatchToProps = {
    listArtworks
}

export default connect(mapStateToProps, mapDispatchToProps)(ListOfArtworks)
