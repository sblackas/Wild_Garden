import React, { Component } from 'react'
import { connect } from 'react-redux'
import { listComments, deleteComment, editComment } from '../Store/actions/comments'
import { loginAdmin } from '../Store/actions/admin';
import axios from 'axios'
import bin from '../imagesDashUser/bin.png'
import './AllComments.css'




export class AllComments extends Component {
    state = {
        commentary:'',
        id_feedback:'',
        comments: [],
        msgSuccess: "",
    }

    // editComment = event => {
    //     this.setState({ commentary: event.target.value })
    //   };

    //   handleSubmitEditionOfComment = async event => {
    //     event.preventDefault();
    
    //     const editedCommentary = {
    //       commentary: this.state.commentary ,
    //       id_feedback: parseInt(this.state.id_feedback)
    //     };
    
    //     axios.put(`http://localhost:8000/feedback/${this.state.id_feedback}`, editedCommentary, { headers: { authorization: `Bearer ${localStorage.getItem('tokenAdmin')}` } })
    //       .then(res => {
    //         if (res.status === 200) {
    //           console.log(res);
    //           console.log(res.data);
    //           this.setState({ msgSuccess: " Le commentaire a bien été modifié !" })
    //           this.props.editComment(editedCommentary)
    //         }
    //       })
    //       .catch(error => {
    //         console.log("catch error");
    //         console.log(error);
    //       })
    
    //   }

    deleteRow(id_feedback, e) {
        axios
            .delete(`http://localhost:8000/feedback/${id_feedback}`, {
                headers: { authorization: `Bearer ${localStorage.getItem('tokenAdmin')}` }
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
        if (this.state.comments.length === 0) {
            axios.get('http://localhost:8000/feedbacks')
                .then(res => {
                    console.log(res);
                    this.setState({ comments: res.data })
                    console.log(this.state.comments);
                    this.props.listComments(res.data)

                })
        }
        return (
            <div id="AllComments">
                <section className="section-com">
                    <p className="succ">{this.state.msgSuccess}</p>

                    {this.props.comments.map(elem => {
                        return (
                            <div id="comment-container" key={elem.id_feedback}>
                                {/* <div className="com-profile-img" alt="mypic" style={{ backgroundImage: `url("http://localhost:8000/uploads/${elem.u_pp}")`, backgroundPositionY: 'center', backgroundPositionX: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} /> */}
                                <div className="good">
                                    <h1>{elem.u_name}</h1>
                                    <h1>{elem.u_lastname}</h1>
                                    <div className="com-description">
                                        {elem.commentary}
                                    </div>
                                </div>
                                <details>
                    <summary>
                      {/* <div className="pocontent" onClick={() => this.editionFunction(elem.id_feedback, elem.commentary)}><span className="po">Modifier</span></div> */}
                      <button type="submit" value="Submit" id="table_button" onClick={(e) => this.deleteRow(elem.id_feedback, e)} ><img src={bin} className="bin_icon" alt="" /><div id="circle-table"></div></button>
                      <div class="details-modal-overlay"></div>
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

                          <form onSubmit={this.handleSubmitEditionOfComment} key={this.state.id_feedback || ""}>
                            <div className="titre">
                              <label htmlFor="titre">Commentaire</label>
                              <input type="name" value={this.state.commentary} onChange={this.editComment} />
                            </div>
                          </form>
                          <div className="submit">
                            <button type="submit" value="Submit" id="form_button" onClick={this.handleSubmitEditionOfComment} ><span>Submit</span><div id="circle"></div></button>
                          </div>
                        </div>
                      </div>

                    </div>
                  </details>

                            </div>
                            
                        )
                    })}
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    comments: state.commentsReducer.comments

})

const mapDispatchToProps = {
    listComments,
    loginAdmin,
    deleteComment,
    editComment,
}

export default connect(mapStateToProps, mapDispatchToProps)(AllComments)
