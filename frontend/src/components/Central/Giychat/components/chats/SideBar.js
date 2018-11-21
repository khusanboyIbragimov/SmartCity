import React, { Component } from 'react';
import axios from 'axios';
// import FAChevronDown from 'react-icons/lib/md/keyboard-arrow-down'
// import FAMenu from 'react-icons/lib/fa/list-ul'
// import FASearch from 'react-icons/lib/fa/search'
// import MdEject from 'react-icons/lib/md/eject'

export default class SideBar extends Component {


	constructor(props) {
		super(props);

		this.state = {
            user_imgurl: "",
		};
	}

	componentDidMount() {
		axios
			.get("/users/userInfo")
			.then(res => {
				this.setState({
					user_imgurl: res.data[0].user_imgurl
                })
			})
			.catch(err => {
				console.log(err);
			})
	}

	render() {
		const { logout } = this.props
		return (
			<div id='side-bar'>
				<div>
					{this.props.onlineUsers.map((ele) => {
						var colors = ['red', 'green', 'pink', 'orange', 'blue', 'black', 'purple'];
						var num = Math.floor((Math.random() * colors.length));
						var color = colors[num];
						return (
							<ul key={Math.random()} className="list-unstyled">
								<li  className="left clearfix">
									<span className="chat-img pull-left">
										<img src={this.state.user_imgurl} alt="User Avatar" className="img-circle" />
									</span>
									<div className="chat-body clearfix">
										<div className="header_sec ">
											<strong className="primary-font"><h4 style={{color: color}}>{ele}</h4></strong>
										</div>
									</div>
								</li>
							</ul>
						)
					})}
				</div>
				<div className="current-user">
					<div onClick={() => { logout() }} title="Logout" className="logout">
						<button className='btn btn-primary form-control'>чатдан чиқиш &nbsp;<i className="fa fa-sign-out" aria-hidden="true"></i></button>
					</div>
				</div>
			</div>
		);

	}
}
