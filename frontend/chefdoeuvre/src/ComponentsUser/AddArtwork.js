import React from 'react';
import HeaderUser from '../ComponentsUser/HeaderUser'
import axios from 'axios'
import './AddArtwork.css'

class AddArtwork extends React.Component{
    state = {
        title: "",
        description: "",
        picture: "",
        msgSuccess: ""
    
    };

     
// /!\ Bien écrire les elements exactement comme dans la db
    inputTitle = event => {
        this.setState({title:event.target.value})
    };
 
    inputDesc = event => {
        this.setState({description:event.target.value})
    };
    inputPicture = event => {
        this.setState({picture:event.target.value})
    };
    
    handleSubmit = event => {
        event.preventDefault();
    
        const artwork = {
            title: this.state.title,
            description: this.state.description,
            picture: this.state.picture,

        };
        
        axios.post('http://localhost:8000/artwork/add', artwork)
        //recuperation du token stocké dans le localStorage comme ca y'a plus "no token"
        // {headers: {authorization: localStorage.getItem("token")}}
        .then(res => {
            console.log(res);
            console.log(res.data);

            this.setState({ msgSuccess: "Bien ajouté"})
        })

  }



render() {
  return (
    <div className="AddArtwork">

      

        <HeaderUser/>

        <div className="containerForm">
  <h1>&bull; Ajouter une oeuvre &bull;</h1>
  <div className="underline">
  </div>
  <p>{this.state.msgSuccess}</p>
  <form onSubmit={this.handleSubmit} id="contact_form">
    <div className="title">
      <label for="Titre"></label>
      <input type="text" id="title_input" placeholder="Titre" onChange={this.inputTitle}/>
    </div>
    <div className="picture">
      <label for="Picture"></label>
      <input type="text"  id="picture_input" placeholder="Image" onChange={this.inputPicture}/>
    </div>
    <div className="message">
      <label for="Description"></label>
      <textarea  placeholder="Décrivez votre oeuvre" id="message_input" cols="30" rows="7" onChange={this.inputDesc}></textarea>
    </div>
    <div className="submit">
      <button type="submit" value="Submit" id="form_button" ><span>Submit</span><div id="circle"></div></button>
    </div>
  </form>
</div>
      

      </div>
    );
  }
}

// const mapStateToProps = (state /*, ownProps*/) => {
//   return {
//     product : state.productsReducer.payload,
//     token: state.userReducer.token,
//   }
// }

// const mapDispatchToProps = { newProduct }

export default AddArtwork ;