import React from 'react'
import './Table.css'
import bin from '../imagesDashUser/bin.png'
import edit_icon from '../imagesDashUser/edit_icon.png'
import axios from 'axios';
import { connect } from 'react-redux'
import { listArtworks } from '../Store/actions/artworks';


export class TableTest extends React.Component {
	state = {
		artworks: []
	};

	// handleSubmitEdition = event => {
	// 	event.preventDefault();
	// 	this.props.history.push('/admin/modifyproduct/' + id_product);
	// }

	componentDidMount(){
	
		if (this.props.id && !this.state.artworks.length) {
            axios.get(`http://localhost:8000/get-artwork/${this.props.id}` )
            .then(res => {
                console.log(res);
                this.setState({ artworks: res.data })
                console.log(this.state.artworks);
                this.props.listArtworks(res.data)
                
            })
        }
		
	}



	render() {

		return (
			<div className="TablePage">


				<div class="containerTable">

					<table>
						{console.log(this.state.artworks)}

						<thead>
							<tr>
								<th>ID </th>
								<th>Titre</th>
								<th>Description</th>
								<th>Image</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody >
							{this.state.artworks.map((elem) => {
								return (
									<tr key={elem.id}>
										<td>{elem.id}</td>
										<td>{elem.art_title}</td>
										<td>{elem.art_desc}</td>
										<td src={elem.art_picture} thumbnail className="thumbnail-table"></td>
										<td>
											<div className="icon-container">
												<button type="submit" value="Submit" id="table_button" onClick={this.handleSubmitDelete} ><img src={bin} className="bin_icon" alt="" /><div id="circle-table"></div></button>
												<button type="submit" value="Submit" id="table_button" onClick={this.handleSubmitEdition} ><img src={edit_icon} className="bin_icon" alt="" /><div id="circle-table"></div></button>
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
		)
	}
}


const mapStateToProps = (state /*, ownProps*/) => {
	return {
		artworks: state.artworksReducer.artworks,
		id: state.artistReducer.id

	}
}


const mapDispatchToProps = { listArtworks }

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TableTest);
