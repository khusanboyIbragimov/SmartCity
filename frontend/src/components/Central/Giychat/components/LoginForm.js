import React, { Component } from 'react';
import { VERIFY_USER } from '../Events';
import axios from "axios";

export default class LoginForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			nickname: false,
			error: "",
		};
	}

	componentWillMount() {
		axios
			.get("/users/userInfo")
			.then(res => {
				this.setState({
					nickname: res.data[0].username
				})
			})
			.catch(err => {
				console.log(err);
			})
	}

	setUser = ({ user, isUser }) => {
		if (isUser) {
			this.setError("User name taken")
		} else {
			this.setError("")
			this.props.setUser(user)
		}
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const { socket } = this.props
		const { nickname } = this.state
		socket.emit(VERIFY_USER, nickname, this.setUser)
	}

	// handleChange = (e)=>{
	// 	this.setState({nickname:e.target.value})
	// }

	setError = (error) => {
		this.setState({ error })
	}

	render() {
		const { nickname, error } = this.state
		if (nickname) {
			return (
				<div className="login">
					<form onSubmit={this.handleSubmit} className="login-form" >
						<label htmlFor="nickname">
							<h4>Салом <span style={{ color: '#0093d3' }}>{nickname}</span> Ғийчатга мархамат.</h4>
						</label>
						{/* <input
							ref={(input)=>{ this.textInput = input }}
							type="text"
							id="nickname"
							value={nickname}
							readOnly
							placeholder={'...'}
							/> */}
						<div className="error">{error ? error : null}</div>
						<button className='btn btn-success'><i className="fa fa-sign-in" aria-hidden="true"></i>
							&nbsp;чатга кириш</button>
						<div className='footer-away'></div>
					</form>
				</div>
			);
		} else {
			return (
				<div>
					<h4 style={{ color: 'red' }}>Илтимос аккаунтингизга киринг!</h4>
					<div className='footer-away'></div>
				</div>
			)
		}
	}
}
