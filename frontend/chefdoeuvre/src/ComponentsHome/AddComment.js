import React, { Component } from 'react'
import axios from 'axios'
import { connect } from "react-redux";
import { newComment } from '../Store/actions/comments';
import './AddComment.css'

export class AddComment extends Component {
    state = {
        name: "",
        lastname: "",
        comment: "",
        pseudo: "",
        id_user: "",
        msgSuccess: ""
    }


    inputName = event => {
        this.setState({ name: event.target.value })
    };
    inputLastName = event => {
        this.setState({ lastname: event.target.value })
    };
    inputComment = event => {
        this.setState({ comment: event.target.value })
    };

    // componentDidMount() {
    //     let theusercomment = this.props.comments.filter(elem => elem.id == this.props.match.params.id)
    //     console.log("-------------------------")
    //     console.log(theusercomment)
    //     if (!this.state.name.length && theusercomment.length) {
    //      this.setState({
    //         name: theusercomment[0].u_name,
    //         lastname: theusercomment[0].lastname,
    //         id_user: theusercomment[0].id_user
    //       });
    //     }
    //   }

    AddAComment = event => {
        event.preventDefault();
        // if (this.validateForm()) {
        const comment = {
            // name: this.state.name,
            // lastname: this.state.lastname,
            comment: this.state.comment,
            id_user: this.props.id, 
            id_artwork: this.props.id_artwork
        };

        axios.post('http://localhost:8000/feedback/add', comment, { headers: { authorization: `Bearer ${this.props.token}` } })
            .then(res => {
                if (res.status === 200) {
                    console.log(res);
                    console.log(res.data);
                    this.setState({ msgSuccess: "Bien ajouté" })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="AddComment">

<div className="containerForm">
<p>{this.state.msgSuccess}</p>

                <form onSubmit={this.AddAComment}  >           
                 {/* <div className="name">
                    <label for="Titre"></label>
                    <input type="text" id="title_input" placeholder="Name" onChange={this.inputName} />
                </div>
                <div className="lastname">
                    <label for="Titre"></label>
                    <input type="text" id="lastname_input" placeholder="Last Name" onChange={this.inputLastName} />
                </div> */}
                <div className="message">
                    <label htmlFor="com"></label>
                    <textarea placeholder="You can add your comment right here" id="message_input" cols="30" rows="7" onChange={this.inputComment}/>
                    <button type="submit" id="form_button" ><span>Submit</span><div id="circle"></div></button>
                    </div>
                </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state /*, ownProps*/) => {
    return {
        comments: state.commentsReducer.payload,
        token: state.artistReducer.token,
        id: state.artistReducer.id
    }
}

const mapDispatchToProps = { newComment }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddComment);
