import React, { Component } from 'react'
import './MyComments.css'
import { connect } from 'react-redux'
import { listOfMyComments } from '../Store/actions/comments'
import { loginArtist } from '../Store/actions/artist';
import axios from 'axios'
import jwt from 'jsonwebtoken'



export class MyComments extends Component {
    state = {
        idUser: "",
    }

    componentDidMount() {
  
        // premiere etape voir si je recupere bien l'id
        // console.log(this.state.id);
        if (localStorage.getItem("tokenUser")) {
            let decoded = jwt.decode(localStorage.getItem("tokenUser"))
            let loggedUser = {
                token: localStorage.getItem("tokenUser"),
                email: decoded.email,
                id: decoded.id
            };
            this.props.loginArtist(loggedUser)
            // console.log(decoded);
        axios.get(`http://localhost:8000/get-feedback-user/${decoded.id}`)
        .then(resp => {
            console.log(resp.data);
            this.props.listOfMyComments(resp.data)
        })
        .catch(error => {
            console.log('catch error');
            console.log(error);
        })
    }
    }

    render() {
        return (
            <div className="MyComments">
                <section id="section-com">
                    {this.props.myComments.map(elem =>{
                        return (
                            <div id="comment-container">
                            <div className="com-profile-img" alt="mypic">{elem.u_pp}</div>
                            <div className="good">
                                <h1>{elem.u_name}</h1>
                                <h1>{elem.u_lastname}</h1>
                                <div className="com-description">
                                   {elem.commentary}
                                </div>
                            </div>
                        </div>
                         )
                     })}   
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state /*, ownProps*/) => {
    return {
        id: state.artistReducer.id,
        id_artwork: state.artworksReducer.id_artwork,
        myComments: state.commentsReducer.myComments


    }
}

const mapDispatchToProps = { listOfMyComments, loginArtist }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyComments);
