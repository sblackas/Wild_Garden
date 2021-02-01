import axios from 'axios';
import React from 'react';
import HeaderAdmin from './HeaderAdmin';
import './CateList.css'
import { connect } from 'react-redux'
import { listCate } from '../Store/actions/categories';
import { Link } from 'react-router-dom';



class CateList extends React.Component {
    state = {
        categories: [],
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
                <HeaderAdmin/>
                <div className="CateListPage">

                    <div className="title"><h1>&bull; Category List &bull;</h1></div>

                    {console.log(this.state.categories)}
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
        categories: state.cateReducer.categories,
        id: state.adminReducer.id

    }
}

const mapDispatchToProps = { listCate }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CateList);














