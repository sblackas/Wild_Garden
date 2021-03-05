import React, { Component } from 'react'
import { connect } from 'react-redux'
import { usersList, deleteUser } from '../Store/actions/artist';
import './UserList.css'
import bin from '../imagesDashUser/bin.png'
import axios from 'axios'

export class UserList extends Component {
  state = {
    name: '',
    lastname: '',
    pp: '',
    email: '',
    id_user: '',
    successMsg: '',
  }


  editName = event => {
    this.setState({ name: event.target.value })
  };
  editLastName = event => {
    this.setState({ lastname: event.target.value })
  };
  editPicture = event => {
    this.setState({ user_pp: event.target.value })
  };
  editEmail = event => {
    this.setState({ email: event.target.value })
  };


  handleSubmitEditionOfUser = async event => {
    event.preventDefault();

    const editedUser = {
      name: this.state.name,
      lastname: this.state.lastname,
      pp: this.state.pp,
      email: this.state.email,
      id_user: parseInt(this.state.id_user)
    };
    // console.log(editedUser, this.props.id);

    axios.put(`http://localhost:8000/users/${this.state.id_user}`, editedUser, { headers: { authorization: `Bearer ${localStorage.getItem('tokenAdmin')}` } })
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.setState({ successMsg: "Le profil a bien été modifié !" })
      })
      .catch(error => {
        console.log("catch error");
        console.log(error);
      })
  }

  editionFunction = (id_user, u_name, u_lastname, u_pp, u_email) => {
    console.log(id_user, u_name, u_lastname, u_pp, u_email);
    this.setState({
      id_user: id_user,
      name: u_name,
      lastname: u_lastname,
      pp: u_pp,
      email: u_email,
    })
  }

  deleteRow(id_user, e) {
    axios
      .delete(`http://localhost:8000/users/${id_user}`, {
        headers: { authorization: `Bearer ${localStorage.getItem('tokenAdmin')}` }
      })
      .then((res) => {
        if (res.status === 200) {
          this.props.deleteUser(id_user)
          this.setState({ successMsg: 'utilisateur supprimé avec succès' });

        }
      });
  }

  render() {
    return (
      <div id="UserList">
        <div className="artistContainerr">
        <p>{this.state.successMsg}</p>
          {this.props.users.map(elem => {
            return (
              <figure className="fir-image-figure">
                {/* <Link to={`/galerie-of/${elem.id_user}`}> */}
                <div className="fir-author-image fir-clickcircle" style={{ backgroundImage: `url(${elem.u_pp})`, backgroundPositionY: 'center', backgroundPositionX: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}/>
                {/* <img className="fir-author-image fir-clickcircle" src={elem.u_pp} alt="t" /> */}

                {/* </Link> */}
                {/* </a> */}
                <figcaption>
                  <div className="fig-author-figure-title">{elem.u_name}</div>
                  <div className="fig-author-figure-title">{elem.u_lastname}</div>
                  <div className="fig-author-figure-title">Pays</div>
                  <div className="fig-author-figure-title"> {this.props.count} Nombre d'oeuvres</div>
                </figcaption>

                <details>
                  <summary>
                    {/* <div className="pocontent" onClick={() => this.editionFunction(elem.id_user, elem.u_name, elem.u_lastname, elem.u_pp, elem.u_email)}> */}
                      {/* <span className="po">Modifier</span> */}
                    {/* </div> */}
                    <button type="submit" value="Submit" id="table_button" onClick={(e) => this.deleteRow(elem.id_user, e)} ><img src={bin} className="bin_icon" alt="" /><div id="circle-table"></div></button>
                    <div className="details-modall-overlay"></div>
                  </summary>

                  <div className="details-modall">
                    <div className="details-modall-close">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M13.7071 1.70711C14.0976 1.31658 14.0976 0.683417 13.7071 0.292893C13.3166 -0.0976311 12.6834 -0.0976311 12.2929 0.292893L7 5.58579L1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L5.58579 7L0.292893 12.2929C-0.0976311 12.6834 -0.0976311 13.3166 0.292893 13.7071C0.683417 14.0976 1.31658 14.0976 1.70711 13.7071L7 8.41421L12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L8.41421 7L13.7071 1.70711Z" fill="black" />
                      </svg>
                    </div>
                    <div className="details-modall-title">
                      <h1>{elem.u_name}</h1>
                    </div>
                    <div className="details-modall-content">

                      <div className="profileBox1">
                        <h1>&bull; Edition &bull;</h1>
                        <div className="underline"></div>
                        <p>{this.state.successMsg}</p>

                        <form onSubmit={this.handleEditionOfUser} key={this.state.id_user || ""}>
                          <div className="titre">
                            <label htmlFor="titre">Prénom</label>
                            <input type="name" value={this.state.name} onChange={this.editName} />
                          </div>
                          <div className="description">
                            <label htmlFor="description">Nom</label>
                            <input type="name" id="lastname_input" value={this.state.lastname} onChange={this.editLastName} />
                          </div>
                          <div className="pp">
                            <label htmlFor="Picture">Picture</label>
                            <input type="text" id="picture_rt" value={this.state.pp} onChange={this.editPicture} />
                          </div>
                          <div className="email">
                            <label htmlFor="email">Email</label>
                            <input type="text" id="picture_rt" value={this.state.email} onChange={this.editEmail} />
                          </div>
                        </form>
                        <div className="submit">
                          <button type="submit" value="Submit" id="form_button" onClick={this.handleSubmitEditionOfUser} ><span>Submit</span><div id="circle"></div></button>
                        </div>
                      </div>
                    </div>

                  </div>
                </details>
              </figure>
            )
          })}
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    users: state.artistReducer.users,


  }
}

const mapDispatchToProps = { usersList, deleteUser }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);
