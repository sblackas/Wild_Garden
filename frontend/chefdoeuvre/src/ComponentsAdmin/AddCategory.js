import React from 'react'
import axios from 'axios'
import HeaderAdmin from './HeaderAdmin';
import './AddCategory.css';
import { connect } from "react-redux";
import { newCategory } from '../Store/actions/categories';


export class AddCategory extends React.Component {
    state = {
        name: "",
        picture: "",
        msgSuccess: ""

    }

    inputNameCate = event => {
        this.setState({ name: event.target.value })
      };
    
     inputPictureCate = event => {
        this.setState({ picture: event.target.value })
      };


      handleSubmit = event => {
        event.preventDefault();
    
        const category = {
          name: this.state.name,
          picture: this.state.picture,
          id_cate: this.props.id
        };
        console.log(this.props.token);
        axios.post('http://localhost:8000/category/add', category, { headers: {authorization: `Bearer ${this.props.token}` }})
      .then(res => {
        if (res.status === 200) {
          console.log(res.data);
        this.setState({ msgSuccess: "Bien ajouté" })
        }
      })
    }

    render() {
        return (
            <div className="AddCategory">
                <HeaderAdmin/>

                <div className="containerForm">
          <h1>&bull; Ajouter une catégorie &bull;</h1>
          <div className="underline">
          </div>
          <p>{this.state.msgSuccess}</p>
          <form onSubmit={this.handleSubmit} id="contact_form">
            <div className="name">
              <label for="Nom"></label>
              <input type="text" id="title_input" placeholder="Nom" onChange={this.inputNameCate} />
            </div>
            <div className="picture">
              <label for="Picture"></label>
              <input type="text" id="picture_input" placeholder="Image" onChange={this.inputPictureCate} />
            </div>
            <div className="submit">
              <button type="submit" value="Submit" id="form_button" ><span>Submit</span><div id="circle"></div></button>
            </div>
          </form>
        </div>


            </div>
        )
    }
}

const mapStateToProps = (state /*, ownProps*/) => {
    return {
      categories: state.cateReducer.payload,
      token: state.adminReducer.token,
      id: state.adminReducer.id
    }
  }

  const mapDispatchToProps = { newCategory }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddCategory);
