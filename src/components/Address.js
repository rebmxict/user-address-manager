import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserAddress, registerAddress } from '../actions/address';

class Address extends Component {
	constructor() {
		super();
		this.state = {
			edit: false,
			street: '',
			address1: '',
			address2: '',
			suburb: '',
			town: ''
		}

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleSave = this.handleSave.bind(this);
	}
	
	handleInputChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleEdit() {
		this.setState({ edit: true });
		if(this.props.address) {
			this.setState(this.props.address);
		}
	}

	handleSave() {
		const address = {
			street: this.state.street,
			address1: this.state.address1,
			address2: this.state.address2,
			suburb: this.state.suburb,
			town: this.state.town
		}
		this.props.registerAddress(address);
		this.setState({ edit: false });
	}

	componentDidMount() {
		this.props.getUserAddress();
	}

	render() {
		return (
			<div className="container">
				<h2>Address</h2>

				<h4>Street</h4>
				{this.state.edit ? (<input
					type="text"
					placeholder="Your street"
					className='form-control form-control-lg'
					name="street"
					onChange={ this.handleInputChange }
					value={ this.state.street }
				/>) : (<p>{this.props.address ? this.props.address.street : ""}</p>)}

				<h4>Address1</h4>
				{this.state.edit ? (<input
					type="text"
					placeholder="Your address1"
					className='form-control form-control-lg'
					name="address1"
					onChange={ this.handleInputChange }
					value={ this.state.address1 }
				/>) : (<p>{this.props.address ? this.props.address.address1 : ""}</p>)}

				<h4>Address2</h4>
				{this.state.edit ? (<input
					type="text"
					placeholder="Your address2"
					className='form-control form-control-lg'
					name="address2"
					onChange={ this.handleInputChange }
					value={ this.state.address2 }
				/>) : (<p>{this.props.address ? this.props.address.address2 : ""}</p>)}

				<h4>Suburb</h4>
				{this.state.edit ? (<input
					type="text"
					placeholder="Your suburb"
					className='form-control form-control-lg'
					name="suburb"
					onChange={ this.handleInputChange }
					value={ this.state.suburb }
				/>) : (<p>{this.props.address ? this.props.address.suburb : ""}</p>)}

				<h4>Town</h4>
				{this.state.edit ? (<input
					type="text"
					placeholder="Your town"
					className='form-control form-control-lg'
					name="town"
					onChange={ this.handleInputChange }
					value={ this.state.town }
				/>) : (<p>{this.props.address ? this.props.address.town : ""}</p>)}
				<br />

				<div className="form-group">
					<button className="btn btn-primary" onClick={this.handleEdit}>
						Edit
					</button>&nbsp;&nbsp;&nbsp;
					<button className="btn btn-primary" onClick={this.handleSave}>
						Save
					</button>
				</div>
			</div>
		);
	}
}

Address.propTypes = {
	getUserAddress: PropTypes.func.isRequired,
	registerAddress: PropTypes.func.isRequired,
	address: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	address: state.addr.address,
	errors: state.errors
})

export default connect(mapStateToProps, { getUserAddress, registerAddress })(Address)