import React from 'react';
import './Dashboard.css';
import axios from 'axios'
import { connect } from 'react-redux'
import TableTest from './Table'
import jwt from 'jsonwebtoken'

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
    name: "",
    lastname: "",
    pp: "",
    email: "",
    successMsg: "",
    file: "",
    id_user:""
  };
  this.fileUploader = this.fileUploader.bind(this);
        this.onChange = this.onChange.bind(this);
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

  componentDidMount () {
    // console.log(this.props.match.params.edit);
    let token= jwt.decode(localStorage.getItem('tokenUser'))
  
    axios.get(`http://localhost:8000/users/${token.id}`)
    .then(res => {
      this.setState({
        name: res.data[0].u_name,
         lastname: res.data[0].u_lastname,
         pp: res.data[0].u_pp,
         email: res.data[0].u_email
       }
       );
    })

    // let profiletoedit = this.props.users.filter(elem => elem.id == this.props.match.params.edit)
    // console.log(profiletoedit);

    
  }

  handleSubmitEdition = async event => {
    // async parce que la requete doit attendre sinon elle passera dans else
    event.preventDefault();

    let resp = await axios.get(`http://localhost:8000/users/${this.props.id}`)
    // une requete axios GET et DELETE n'envoient jamais de req.body, elle ne le liront
    console.log(resp);
    console.log(resp.data);

    const editedUser = {
      //ce qui est avant les deux points est le req.body dans le back /!\
      name: this.state.name || resp.data[0]["u_name"], // soit tu me mets ce qu'il y a dans l'input OU ce qu'il y a 
      lastname: this.state.lastname || resp.data[0]["u_lastname"],
      pp: this.state.pp || resp.data[0]["u_pp"],
      email: this.state.email || resp.data[0]["u_email"],
    };
    console.log(editedUser, this.props.id);

    axios.put(`http://localhost:8000/users/${this.props.id}`, editedUser, { headers: { authorization: `Bearer ${this.props.token}` } })
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.setState({ successMsg: "Votre profil a bien été modifié !" })
      })
      .catch(error => {
        console.log("catch error");
        console.log(error);
      })
  }

  fileUploader = event => {
    event.preventDefault();

      const formData = new FormData();
      formData.append("profile", this.state.file);
      // console.log(this.state.file);
      // // formData.append('id_user', this.state.id_user)
      // console.log(formData);
      const config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
      };
      // const toSend = {
      //   profile: formData, 
      //   id_user: this.state.id_user,
      // }
    axios.post(`http://localhost:8000/single/${this.props.id}`, formData, config)
      .then(res => {
        console.log('HERE');
        if (res.status === 200) {
          console.log(res);
          console.log(res.data);
        }
      })
      .catch(error => {
        console.log("catch error");
        console.log(error);
      })
  }
  onChange(e) {
    this.setState({file:e.target.files[0]});
    console.log();
  }

 getImagePath = (newFileName) => {
    return `C:/Users/vivia/OneDrive/Documents/Code SIIMPLON NANTERRE/Wild_Garden_Project/backend/uploads/${newFileName}`
    // return `@/Wild_Garden_Project/backend/uploads/${newFileName}`

    // return `http://localhost:8000/uploads/${newFileName}`

  }

  render() {
    return (
      <div className="Dashboard">

        {/* <p>{this.props.token}</p> */}
        <p>{this.props.editedUser}</p>

        <div className="profileBox1">
          <h1>&bull; Editez votre profil &bull;</h1>
          <div className="underline">
          </div>
          <div className="messageSS">
            <p>{this.state.successMsg}</p>
          </div>

          <div className="rondPP">
          <img className="rondPPimg" src={this.getImagePath(this.state.pp)} alt='pp' />
          </div>

          <form onSubmit={this.handleSubmitEdition}>
            <div className="firsttname">
              <label htmlFor="Name">Prénom</label>
              <input type="name" placeholder="Prénom" value={this.state.name} onChange={this.editName} />
            </div>

            <div className="lastname">
              <label htmlFor="Name">Nom</label>
              <input type="name" id="lastname_input" placeholder="Nom" value={this.state.lastname} onChange={this.editLastName} />
            </div>

            <div className="email">
              <label htmlFor="email">Email</label>
              <input type="text" id="email_input" placeholder="Adresse Email" value={this.state.email} onChange={this.editEmail} />
            </div>

            <div className="pp">
              <label htmlFor="Picture">Photo de Profil</label>
              <input type="text" id="picture_profile" placeholder="Picture Profile" value={this.state.pp} onChange={this.editPicture} />
            </div>

          </form>
          <div className="submit">
            <button type="submit" value="Submit" id="form_button" onClick={this.handleSubmitEdition} ><span>Submit</span><div id="circle"></div></button>
          </div>
        </div>

        <div className="multer">
          <form >
            <input type="file"  onChange= {this.onChange} />
            <button onClick={this.fileUploader}>Upload</button>
          </form>
        </div>
        <h1>&bull; Editez vos oeuvres &bull;</h1>

        <TableTest />

      </div>
    );
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    id: state.artistReducer.id,
    token: state.artistReducer.token
  }
}

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);