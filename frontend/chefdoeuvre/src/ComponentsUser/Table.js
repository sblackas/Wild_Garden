import React from 'react'
import './Table.css'
import bin from '../imagesDashUser/bin.png'
import edit_icon from '../imagesDashUser/edit_icon.png'
import axios from 'axios';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { personalArtworks, deleteArtwork } from '../Store/actions/artworks';



export class TableTest extends React.Component {
	constructor(props) {
        super(props)
	this.state = {
		msgSuccess: "",

	};

	
	}



	deleteRow(id_artwork, e) {
        axios
            .delete(`http://localhost:8000/delete-artwork/${id_artwork}`, {
                headers: { authorization: `Bearer ${localStorage.getItem('tokenUser')}` }
            })
            .then((res) => {
                if(res.status === 200) {
                    this.props.deleteArtwork(id_artwork)
                    this.setState({ msgSuccess: 'Oeuvre supprimé avec succès' });

                } 
            });
    }

	// componentDidMount(){
	
	// 	if (this.props.id && !this.state.artworks.length) {
    //         axios.get(`http://localhost:8000/get-artwork/${this.props.id}` )
    //         .then(res => {
    //             console.log(res);
    //             this.setState({ artworks: res.data })
    //             console.log(this.state.artworks);
    //             this.props.listArtworks(res.data)
                
    //         })
    //     }
		
	// }

	handleChange = (e) => {
        console.log(e.target.id, e.target.value)
        this.setState({
            [e.target.id]: e.target.value
        })
    }


	render() {
		// if (this.props.id && !this.props.myArtworks.length) {
        //     axios.get(`http://localhost:8000/get-artwork/${this.props.id}` )
        //     .then(res => {
        //         console.log(res);
        //         // this.setState({ artworksTab: res.data })
        //         console.log(this.props.personalArtworks); //tableau vide qui se remplit
        //         this.personalArtworks(res.data)
                
		// 	})
		// 	.catch(err => {
		// 	console.log(err);
		//   });
		// };
		// if(!this.state.show){
		// 	return null;
		// }
		

		return (
			<div className="TablePage">
<div className="messageS">
<p>{this.state.msgSuccess}</p>
</div>
				<div className="containerTable">
<div className="for-resp-table">
					<table>

						<thead>
							<tr>
								<th>ID </th>
								<th>Catégorie</th>
								<th>Titre</th>
								<th>Description</th>
								<th>Image</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody >
							{this.props.myArtworks.map((elem) => {
								return (
									<tr key={elem.id}>
										<td>{elem.id_artwork}</td>
										<td>{elem.id_cate}</td>
										<td>{elem.art_title}</td>
										<td>{elem.art_desc}</td>
										<td><img src={elem.art_picture} alt="" className="thumbnail-table"/></td>
										<td>
											<div className="icon-container">
												<button type="submit" value="Submit" id="table_button" onClick={(e) => this.deleteRow(elem.id_artwork, e)} ><img src={bin} className="bin_icon" alt="" /><div id="circle-table"></div></button>
												<Link to={`/user/edition-artwork/${elem.id_artwork}`} ><button type="submit" value="Submit" id="table_button_edition" onClick={this.handleSubmitEdition} ><img src={edit_icon} className="bin_icon" alt="" /><div id="circle-table"></div></button></Link>

											</div>
										</td>
									</tr>
								)
							}
							)}



						</tbody>
					</table>
					</div>
				</div>
			</div>
		)
	}
}


const mapStateToProps = (state /*, ownProps*/) => {
	return {
		// artworks: state.artworksReducer.artworks,
		myArtworks: state.artworksReducer.myArtworks,
		id: state.artistReducer.id,
		id_artwork: state.artworksReducer.id_artwork

	}
}


const mapDispatchToProps = { personalArtworks, deleteArtwork }

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TableTest);
