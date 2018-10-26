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
			.then( res => {
				this.setState({
					nickname: res.data[0].username
				})
			})
			.catch( err => {
				console.log(err);
			})
	}

	setUser = ({user, isUser})=>{
		if (isUser) {
			this.setError("User name taken")
		} else {
			this.setError("")
			this.props.setUser(user)
		}
	}

	handleSubmit = (e)=>{
		e.preventDefault()
		const { socket } = this.props
		const { nickname } = this.state
		socket.emit(VERIFY_USER, nickname, this.setUser)
	}

	// handleChange = (e)=>{
	// 	this.setState({nickname:e.target.value})
	// }

	setError = (error)=>{
		this.setState({error})
	}

	render() {
		const { nickname, error } = this.state
		if (nickname) {
			return (
				<div className="login">
					<form onSubmit={this.handleSubmit} className="login-form" >
						<label htmlFor="nickname">
							<h2>Ғийчатга хуш келибсиз!!!</h2>
						</label>
						<input
							ref={(input)=>{ this.textInput = input }}
							type="text"
							id="nickname"
							value={nickname}
							readOnly
							placeholder={'...'}
							/>
							<div className="error">{error ? error:null}</div>
						<button>чатга кираман</button>
					</form>
				</div>
			);
		} else {
			return (
				<div>
					<h1>Илтимос аккаўнтингизга киринг</h1>
				</div>
			)
		}
	}
}
