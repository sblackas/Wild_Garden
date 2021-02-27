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


    AddAComment = event => {
        event.preventDefault();

        const comment = {
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
