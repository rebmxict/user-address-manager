import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllUsers } from '../actions/authentication';

class Home extends Component {
	componentDidMount() {
		this.props.getAllUsers();
	}

	render() {
		const mapUsers = (users) => {
			if(users) {
				return users.map((user, i) => {
					return (
						<tr key={i}>
							<td>{user._id}</td>
							<td>{user.name}</td>
							<td>{user.email}</td>
							<td>{user.isAdmin ? "Yes" : "No"}</td>
						</tr>
					);
				});
			}
		}
		
		return (
			<div className="container">
				<h2>Users</h2>

				<table>
					<tr>
						<th>Id</th>
						<th>Name</th>
						<th>Email</th>
						<th>Is Admin</th>
					</tr>
					{mapUsers(this.props.allusers)}
				</table>
			</div>
		);
	}
}

Home.propTypes = {
	getAllUsers: PropTypes.func.isRequired,
	allusers: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	allusers: state.auth.allusers,
	errors: state.errors
})

export default connect(mapStateToProps, { getAllUsers })(Home)