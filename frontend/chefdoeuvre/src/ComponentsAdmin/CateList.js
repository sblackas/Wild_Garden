import axios from 'axios';
import React from 'react';
import './CateList.css'
import { connect } from 'react-redux'
import { listCate, deleteCate } from '../Store/actions/categories';
import { Link } from 'react-router-dom';
import bin from '../imagesDashUser/bin.png'




class CateList extends React.Component {
    state = {
        categories: [],
        msgSuccess: ""
    }

	deleteCategory(id_cate, e) {
        axios
            .delete(`http://localhost:8000/category/${id_cate}`, {
                headers: { authorization: `Bearer ${localStorage.getItem('tokenAdmin')}` }
            })
            .then((res) => {
                if(res.status === 200) {
                    this.props.deleteCate(id_cate)
                    this.setState({ msgSuccess: 'Catégorie supprimée avec succès' });
                    console.log('have been removed');
                } 
            });
    }

    handleChange = (e) => {
        console.log(e.target.id, e.target.value)
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        // console.log("ID => ", this.props.id)
        if (this.state.categories.length === 0) {
            axios.get('http://localhost:8000/categories')
                .then(res => {
                    console.log(res);
                    this.setState({ categories: res.data })
                    console.log(this.state.categories);
                    this.props.listCate(res.data)

                })
        }

        // j'ai mis cette condition dans le render au lieu du componentDimount. Si y'a un id et qu'il y a le tableau vide alors tu me fais le axios
        // quand c'est fait alors il render mes oeuvres et recommence à render mais cette fois ci le tableau n'est plus vide a cause du render d'avant ca ne se refait pas

        return (
            <div className="CateList">
                <div className="CateListPage">

                    <div className="title"><h1>&bull; Category List &bull;</h1></div>
                    <p>{this.state.msgSuccess}</p>

                    {/* {console.log(this.state.categories)} */}
                    <div className="cards-container">
                        {this.props.categories.map(elem => {
                            return (
                                <div className="container" key={elem.id} style={{ backgroundImage: `url(${elem.cate_picture})`, backgroundPositionY: 'center', backgroundPositionX: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}>
                                    <div className="overlay" >
                                        <div className="items"></div>
                                        <div className="items head">
                                            <p>{elem.cate_name}</p>
                                            <hr />
                                        </div>
                                        <div className="items price">

                                            {/* <p className="new">{elem.price}€</p> */}
                                        </div>
                                        <div className="items cart">
                                            <i className="fa fa-shopping-cart"></i>
                                            <Link to={`/admin/edit-category/${elem.id_cate}`} ><span>MODIFIER</span></Link>
                                            <button type="submit" value="Submit" id="table_button" onClick={(e) => this.deleteCategory(elem.id_cate, e)} ><img src={bin} className="bin_icon" alt="" /><div id="circle-table"></div></button>
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
        categories: state.cateReducer.categories,
        id: state.adminReducer.id,
        id_cate: state.cateReducer.id_cate

    }
}

const mapDispatchToProps = { listCate, deleteCate }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CateList);














