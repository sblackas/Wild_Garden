import React, { Component } from 'react'
import { connect } from 'react-redux'
import { listCate } from '../Store/actions/categories';
import axios from 'axios';


export class Filter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8000/categories')
            .then((res) => {
                console.log(this.props)
                console.log(res.data)
                this.props.listCate(res.data)
                this.setState({ categories: res.data })

            })
            .catch(error => {
                console.error(error)
            })
    } 


    render() {
        const categories = this.state.categories
        return (
            <div className="filter">
                
                    <div className="filter-order"> Filtre {''} 
                    <select value={this.state.value} onChange={this.props.filterArtworks}>
                        <option>Categorie</option>
                        {categories && categories.map(elem => {
                            console.log(categories);
                            return (
                                <option value={elem.id_cate} key={elem.id_cate}>{elem.cate_name}</option>
                            )
                        })}
                    </select></div>
                    <div className="filter-result">Il y a {this.props.count} oeuvres</div>

            
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    categories: state.cateReducer.categories
})

const mapDispatchToProps = {
    listCate
}


export default connect(mapStateToProps, mapDispatchToProps)(Filter)