import axios from 'axios';
import React from 'react';
import './CateList.css'
import { connect } from 'react-redux'
import { listCate, deleteCate, editionCategory } from '../Store/actions/categories';
// import { Link } from 'react-router-dom';
import bin from '../imagesDashUser/bin.png'




class CateList extends React.Component {
    state = {
        categories: [],
        msgSuccess: "",
        id_cate: "",
        name: "",
        picture: "",
    }

    editName = event => {
        this.setState({ name: event.target.value })
    };
    editPicture = event => {
        this.setState({ picture: event.target.value })
    };


    //Function for Edit

    handleSubmitEditionOfCate = async event => {
        event.preventDefault();

        const editedCate = {
            name: this.state.name,
            picture: this.state.picture,
            id_cate: parseInt(this.state.id_cate)
        };

        axios.put(`http://localhost:8000/category/${this.state.id_cate}`, editedCate, { headers: { authorization: `Bearer ${localStorage.getItem('tokenAdmin')}` } })
            .then(res => {
                if (res.status === 200) {
                    console.log(res);
                    console.log(res.data);
                    this.setState({ msgSuccess: " Le catégorie a bien été modifié !" })
                    this.props.editionCategory(editedCate)
                }
            })
            .catch(error => {
                console.log("catch error");
                console.log(error);
            })

    }

    // Function for Delete

    deleteCategory(id_cate, e) {
        axios
            .delete(`http://localhost:8000/category/${id_cate}`, {
                headers: { authorization: `Bearer ${localStorage.getItem('tokenAdmin')}` }
            })
            .then((res) => {
                if (res.status === 200) {
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

    // OnClick edit
    editionFunction = (id_cate, cate_name, cate_picture) => {
        console.log(id_cate, cate_name, cate_picture);
        this.setState({
            id_cate: id_cate,
            name: cate_name,
            picture: cate_picture
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
                                            
                                            {/* <div onClick={() => this.editionFunction(elem.id_cate, elem.cate_name, elem.cate_picture)}><span>MODIFIER</span></div> */}
                                            {/* <button type="submit" value="Submit" id="table_button" onClick={(e) => this.deleteCategory(elem.id_cate, e)} ><img src={bin} className="bin_icon" alt="" /><div id="circle-table"></div></button> */}
                                        </div>
                                    </div>

                                    <details>
                    
                      <summary>
                      <div className="pocontent" onClick={() => this.editionFunction(elem.id_cate, elem.cate_name, elem.cate_picture)}><span className="po">Modifier</span></div>
                      <button type="submit" value="Submit" id="table_button" onClick={(e) => this.deleteCategory(elem.id_cate, e)} ><img src={bin} className="bin_icon" alt="" /><div id="circle-table"></div></button>
                      <div className="details-modal-overlay"></div>
                    </summary>

                    <div id="details-modalll">
                      <div className="details-modalll-close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path fillRule="evenodd" clipRule="evenodd" d="M13.7071 1.70711C14.0976 1.31658 14.0976 0.683417 13.7071 0.292893C13.3166 -0.0976311 12.6834 -0.0976311 12.2929 0.292893L7 5.58579L1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L5.58579 7L0.292893 12.2929C-0.0976311 12.6834 -0.0976311 13.3166 0.292893 13.7071C0.683417 14.0976 1.31658 14.0976 1.70711 13.7071L7 8.41421L12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L8.41421 7L13.7071 1.70711Z" fill="black" />
                        </svg>
                      </div>
                      <div className="details-modalll-title">
                        <h1>{elem.cate_name}</h1>
                      </div>
                      <div className="details-modalll-content">

                        <div className="profileBox1">
                          <h1>&bull; Edition &bull;</h1>
                          <div className="underline"></div>
                          <p>{this.state.msgSuccess}</p>

                          <form onSubmit={this.handleSubmitEditionOfCate} key={this.state.id_cate || ""}>
                            <div className="titre">
                              <label htmlFor="titre">Nom</label>
                              <input type="name" value={this.state.name} onChange={this.editName} />
                            </div>
                            <div className="titre">
                              <label htmlFor="titre">Picture</label>
                              <input type="name" value={this.state.picture} onChange={this.editPicture} />
                            </div>
                          </form>
                          <div className="submit">
                            <button type="submit" value="Submit" id="form_button" onClick={this.handleSubmitEditionOfCate} ><span>Submit</span><div id="circle"></div></button>
                          </div>
                        </div>
                      </div>

                    </div>
                  </details>

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

const mapDispatchToProps = { listCate, deleteCate, editionCategory }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CateList);














