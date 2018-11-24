import React, { Component } from 'react';
import io from 'socket.io-client';
import { USER_CONNECTED, LOGOUT } from '../Events';
import LoginForm from './LoginForm';
import ChatContainer from './chats/ChatContainer';
const socketUrl = 'http://localhost:3100/';
// const socketUrl = 'http://192.168.43.95:3100/';
var socket = io(socketUrl);

export default class Layout extends Component {

	constructor(props) {
		super(props);
		this.state = {
			user: null,
			onlineUsers: []
		};
		socket.on('ALL_CONNECTED_USERS', (data) => {
			this.showOnlineUsers(data);
		})
	}

	componentWillMount() {
		this.initSocket();
	}

	showOnlineUsers = data => {
		this.setState({
			onlineUsers: data
		})
	}

	// Connect to and initializes the socket.
	initSocket = () => {
		socket.on('connect', () => {
			console.log("Client socket is active...");
		})
	}

	// Sets the user property in state
	setUser = (user) => {
		socket.emit(USER_CONNECTED, user);
		this.setState({ user });
	}

	// Sets the user property in state to null.
	logout = () => {
		socket.emit(LOGOUT);
		this.setState({
			user: null
		});
	}

	render() {
		const { user, onlineUsers } = this.state;
		let onlineUserNames = [];
		for (let key in onlineUsers) {
			onlineUserNames.push(key);
		}
		console.log("herokuuuuuuu=======>>>>>>>>>   ", user);
		return (
			<div className="container giychat_body">
				<div className='row'>
					{
						!user ?
							<LoginForm
								socket={socket}
								setUser={this.setUser}
							/>
							:
							<ChatContainer
								socket={socket}
								user={user}
								logout={this.logout}
								onlineUsers={onlineUserNames}
							/>
					}
				</div>
			</div>
		);
	}
}
