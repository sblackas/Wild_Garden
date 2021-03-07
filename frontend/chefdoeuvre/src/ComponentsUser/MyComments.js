import React, { Component } from 'react'
import './MyComments.css'
import { connect } from 'react-redux'
import { listOfMyComments, deleteComment, editComment } from '../Store/actions/comments'
import { loginArtist } from '../Store/actions/artist';
import axios from 'axios'
import jwt from 'jsonwebtoken'
import bin from '../imagesDashUser/bin.png'




export class MyComments extends Component {
    state = {
        // idUser: "",
        commentary:'',
        id_feedback:'',
        msgSuccess: "",

    }

    editComment = event => {
        this.setState({ commentary: event.target.value })
      };

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

    handleSubmitEditionOfComment = async (id_feedback, event) => {
        event.preventDefault();
    
        const editedCommentary = {
          commentary: this.state.commentary ,
          id_feedback: id_feedback
        };
    console.log(editedCommentary);
        axios.put(`http://localhost:8000/feedback/${this.state.id_feedback}`, editedCommentary, { headers: { authorization: `Bearer ${localStorage.getItem('tokenUser')}` } })
          .then(res => {
            if (res.status === 200) {
              console.log(res);
              console.log(res.data);
              this.setState({ msgSuccess: " Le commentaire a bien été modifié !" })
              this.props.editComment(editedCommentary)
            }
          })
          .catch(error => {
            console.log("catch error");
            console.log(error);
          })
    
      }

    deleteRow(id_feedback, e) {
        axios
            .delete(`http://localhost:8000/feedback/${id_feedback}`, {
                headers: { authorization: `Bearer ${localStorage.getItem('tokenUser')}` }
            })
            .then((res) => {
                if (res.status === 200) {
                    this.props.deleteComment(id_feedback)
                    this.setState({ msgSuccess: 'Commentaire supprimé avec succès' });

                }
            });
    }

    handleChange = (e) => {
        console.log(e.target.id, e.target.value)
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    editionFunction = (id_feedback, commentary) => {
        // console.log(id_feedback, commentary);
        this.setState({
            id_feedback: id_feedback,
          commentary: commentary
        })
      }


    render() {
        return (
            <div className="MyComments">
                <section className="section-com">
                    {this.props.myComments.map(elem =>{
                        return (
                            <div className="comment-container">
                            <div className="com-profile-img" alt="mypic" style={{ backgroundImage: `url("http://localhost:8000/uploads/${elem.u_pp}")`, backgroundPositionY: 'center', backgroundPositionX: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}  />
                            <div className="good">
                                <h1>{elem.u_name}</h1>
                                <h1>{elem.u_lastname}</h1>
                                <div className="com-description">
                                   {elem.commentary}
                                </div>
                                <details>
                    <summary>
                      <div className="pocontent" onClick={() => this.editionFunction(elem.id_feedback, elem.commentary)}><span className="po">Modifier</span></div>
                      <button type="submit" value="Submit" id="table_button" onClick={(e) => this.deleteRow(elem.id_feedback, e)} ><img src={bin} className="bin_icon" alt="" /><div id="circle-table"></div></button>
                      <div className="details-modal-overlay"></div>
                    </summary>

                    <div className="details-modal">
                      <div className="details-modal-close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path fillRule="evenodd" clipRule="evenodd" d="M13.7071 1.70711C14.0976 1.31658 14.0976 0.683417 13.7071 0.292893C13.3166 -0.0976311 12.6834 -0.0976311 12.2929 0.292893L7 5.58579L1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L5.58579 7L0.292893 12.2929C-0.0976311 12.6834 -0.0976311 13.3166 0.292893 13.7071C0.683417 14.0976 1.31658 14.0976 1.70711 13.7071L7 8.41421L12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L8.41421 7L13.7071 1.70711Z" fill="black" />
                        </svg>
                      </div>
                      <div className="details-modal-title">
                        <h1>{elem.art_title}</h1>
                      </div>
                      <div className="details-modal-content">

                        <div className="profileBox1">
                          <h1>&bull; Edition &bull;</h1>
                          <div className="underline"></div>
                          <p>{this.state.msgSuccess}</p>

                          <form onSubmit={(event) => this.handleSubmitEditionOfComment(elem.id_feedback || '', event)} key={this.state.id_feedback || ""}>
                            <div className="titre">
                              <label htmlFor="titre">Commentaire</label>
                              <input type="name" value={this.state.commentary} onChange={this.editComment} />
                            </div>
                          <div className="submit">
                            <button type="submit" value="Submit" id="form_button" ><span>Submit</span><div id="circle"></div></button>
                          </div>
                          </form>
                        </div>
                      </div>

                    </div>
                  </details>
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

const mapDispatchToProps = { listOfMyComments, loginArtist, deleteComment, editComment }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyComments);
