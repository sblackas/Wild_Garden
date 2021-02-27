import React, { Component } from 'react'
import axios from 'axios';
import jwt from 'jsonwebtoken'
import { connect } from 'react-redux'
import { listCate } from '../Store/actions/categories';
import { editionCategory } from '../Store/actions/categories';
import './EditCategory.css'

export class EditCategory extends Component {
    state = {
        name: "",
        picture: "",
        // id_cate: "",
        msgSuccess: "",
      };

      editName = event => {
        this.setState({ name: event.target.value })
      };
      editPicture = event => {
        this.setState({ picture: event.target.value })
      };

      componentDidMount () {
        let catetochange = this.props.categories.filter(elem => elem.id_cate == this.props.match.params.id_cate)
        console.log("-------------------------")
        console.log(catetochange)
        console.log(this.props.match.params.id_cate);

        if (!this.state.name.length && catetochange.length) {
          this.setState({
            name: catetochange[0].cate_name,
            picture: catetochange[0].cate_picture,
            // id_cate: testtom[0].id_cate
          });
        }
    }

changeCategory = async event => {
    event.preventDefault();
    let resp = await axios.get(`http://localhost:8000/category/${this.props.match.params.id_cate}`)
let decode = localStorage.getItem('tokenAdmin')
decode = jwt.decode(decode)

const editedCate = {
    name : this.state.name || resp.data[0]['cate_name'],
    picture: this.state.picture || resp.data[0]["cate_picture"],
    id_admin: parseInt(decode.id),
}

axios.put(`http://localhost:8000/category/${this.props.match.params.id_cate}`, editedCate, { headers: { authorization: `Bearer ${localStorage.getItem('tokenAdmin')}`}})
.then(res => {
    if(res.status === 200) {
        console.log(res.data);
        this.setState({ msgSuccess: "Votre oeuvre a bien été modifié !" })
this.props.editionCategory(editedCate)
    }
})
.catch(error => {
    console.log('catch error');
    console.log(error);
})
}

    render() {
        return (
            <div className="EditCategory">
                 {this.state.name.length && (
          <div className="l-container">
            <div className="b-game-card">
              <div className="b-game-card__cover" key={this.state.id_cate || ""} >
                <img src={this.state.picture || ""} alt="" />
              </div>
            </div>

            <div className="profileBox1">
              <h1>&bull; Editez la catégorie &bull;</h1>
              <div className="underline"></div>
              <p>{this.state.msgSuccess}</p>
              <form onSubmit={this.changeCategory}>
                <div className="titre">
                  <label htmlFor="titre">Nom</label>
                  <input type="name" value={this.state.name} onChange={this.editName} />
                </div>

                <div className="pp">
                  <label htmlFor="Picture">Picture</label>
                  <input type="text" id="picture_rt" value={this.state.picture} onChange={this.editPicture} />
                </div>
                
              </form>
              <div className="submit">
                <button type="submit" value="Submit" id="form_button" onClick={this.changeCategory} ><span>Submit</span><div id="circle"></div></button>
              </div>
            </div>
          </div>
        )}
            </div>
        )
    }
}

const mapStateToProps = (state /*, ownProps*/) => {
    return {
        token: state.adminReducer.token,
      categories: state.cateReducer.categories,
    }
  }
  
  const mapDispatchToProps = { listCate, editionCategory}
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditCategory);
