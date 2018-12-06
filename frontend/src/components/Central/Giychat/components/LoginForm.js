import React, { Component } from 'react';
import { VERIFY_USER } from '../Events';
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal } from 'react-bootstrap';
const photo = require('../../../logo3.png');

export default class LoginForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
            password: "",
			nickname: false,
			error: "",
			isLogged: false,
			loginMessage: false
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
			this.setError("юзернэйм банд")
		} else {
			this.setError("")
			this.props.setUser(user)
		}
	}

	handleSubmit_socket = (e) => {
		e.preventDefault()
		const { socket } = this.props
		const { nickname } = this.state
		socket.emit(VERIFY_USER, nickname, this.setUser)
	}
	handleLogin = () => {
        this.setState({
            isLogin: !this.state.isLogin
		})
    }

    handleLoginMessage = () => {
        this.setState({
            loginMessage: false
        })
    }


    handleFormInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleLogout = () => {
        this.logout();
        axios
            .get("/users/logoutUser")
            .then((res) => {
                this.setState({
                    isLogged: false
                })
            })
            .then(() => {
                window.location.reload();
            }).then( (res) => {
                this.setState({
                    redirect: true
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }


    handleSubmit = (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        axios
            .post("/users/login", {
                username: username,
                password: password
            })
            .then(() => {
                window.location.reload();
            })
            .then((res) => {
                this.setState({
                    isLogged: "loggedIn",
                    fullname: res.data.fullname
                })
            })
            .catch((err) => {
                if (err.response.data === "wrong_password") {
                    this.setState({
                        loginMessage: true
                    })
                }
                console.log(err.response.data);
            })
    }
	// handleChange = (e)=>{
	// 	this.setState({nickname:e.target.value})
	// }

	setError = (error) => {
		this.setState({ error })
	}

	render() {
		const { nickname, error, isLogged } = this.state

		if (nickname) {
			return (
				<div className="login">
					<form onSubmit={this.handleSubmit_socket} className="login-form" >
						<label htmlFor="nickname">
							<h4>Hi <span style={{ color: '#0093d3' }}>{nickname}</span> Welcome to chat.</h4>
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
							&nbsp;enter to chat</button>
						<div className='footer-away'></div>
					</form>
				</div>
			);
		} else {
			return (
				<div>
					<h5 style={{ color: 'red' }}>Please login <span style={{color: 'black'}}><i className="fa fa-weixin" aria-hidden="true"></i> Ғийчатга</span> кириш учун    {!isLogged ?
                                    <a
                                        onClick={this.handleLogin}>

                                            <b>to your account</b>
                                        </a> :
                                    <li onClick={this.handleLogout} redirect='/'>
                                        <a data-toggle="collapse"
                                            data-target=".navbar-collapse.in">
                                            <b><span style={{ fontSize: '18px' }}
                                                className="glyphicon glyphicon-log-out nav-icons">
                                            </span></b>
                                        </a></li>}
                                <Modal
                                    show={this.state.isLogin}
                                    onHide={this.handleLogin}
                                    container={this}
                                    aria-labelledby="contained-modal-title"
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title id="contained-modal-title">
                                        <h4>SmartCity administration</h4>
                                    </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        {isLogged !== "loggedIn" ? <Link to="/sc/register" onClick={this.handleLogin}>Create an account</Link> : ""}
                                        {isLogged !== "loggedIn" ?
                                            <form className="form-inline" onSubmit={this.handleSubmit} >
                                                <div>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="username"
                                                        onChange={this.handleFormInput}
                                                        name="username"
                                                    />
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        placeholder="password"
                                                        onChange={this.handleFormInput}
                                                        name="password"
                                                    />
                                                    <hr />
                                                    <button type="submit" className="btn btn-primary mb-2">Login</button>
                                                </div>
                                                <Modal
                                                    show={this.state.loginMessage}
                                                    onHide={this.handleLoginMessage}
                                                    container={this}
                                                    aria-labelledby="contained-modal-title"
                                                >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title id="contained-modal-title">
                                                        <h4>SmartCity administration</h4>
                                                    </Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        password or username is incorrect
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <button className='btn btn-success' onClick={this.handleLoginMessage}>close</button>
                                                    </Modal.Footer>
                                                </Modal>
                                            </form> :
                                            <div><button onClick={this.handleLogout}>logout</button><Link to="/sc/profile">My account</Link></div>} <br />
                                    </Modal.Body>
                                </Modal></h5>
					<div className='footer-away'></div>
				</div>
			)
		}
	}
}
