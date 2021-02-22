import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { listArtworks } from '../Store/actions/artworks';
import './ListOfArtworks.css'
import Filter from './Filter'

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
            // console.log(this.state.categorie) 
            console.log(e)
            try {
                let result = await axios.get(`http://localhost:8000/artworks/filter/${e.target.value}`)

               let artworks_filtered = result.data 
               this.setState({  filteredArtworks: artworks_filtered})

            } catch (err) {
                console.log(err)
            }

        } else {
            this.setState({ filteredArtworks: null})
        } 
    }

    render() {
        const artworksLo = this.state.filteredArtworks.length? this.state.filteredArtworks: this.props.artworks
            //si la premiere condition n'estpas rempli (?) est un operateur de condition alors tu fais le deuxieme 
        console.log(artworksLo)
        return (
            <div className="ListOfArtworks">
  <Filter count={artworksLo.length}
                        categorie={this.state.categorie}
                        filterArtworks={this.filterArtworks}></Filter>


<div id="portfolio" >
{artworksLo && artworksLo.map(elem => {
                            return (
        <div className="tile scale-anm web all" key={elem.id}>
          <img src={elem.art_picture} alt="" />
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
    listArtworks
}

export default connect(mapStateToProps, mapDispatchToProps)(ListOfArtworks)
