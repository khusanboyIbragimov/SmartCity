import React, { Component } from 'react';
// import FAChevronDown from 'react-icons/lib/md/keyboard-arrow-down'
// import FAMenu from 'react-icons/lib/fa/list-ul'
// import FASearch from 'react-icons/lib/fa/search'
// import MdEject from 'react-icons/lib/md/eject'

export default class SideBar extends Component {

	render() {
		const { user, logout } = this.props
		return (
			<div id='side-bar'>
				<div>
					{this.props.onlineUsers.map((ele) => {
						var colors = ['red', 'green', 'pink', 'orange', 'blue', 'black', 'purple'];
						var num = Math.floor((Math.random() * colors.length));
						var color = colors[num];
						return (
							<ul class="list-unstyled">
								<li key={Math.random()} class="left clearfix">
									<span class="chat-img pull-left">
										<img src='https://scontent-frt3-2.cdninstagram.com/vp/3ca2fb4fd8fb9e90234d42da07f63fed/5C505CC9/t51.2885-15/e35/41349438_869720689897963_6915892188155667819_n.jpg' alt="User Avatar" class="img-circle" />
									</span>
									<div class="chat-body clearfix">
										<div class="header_sec ">
											<strong class="primary-font"><h4 style={{color: color}}>{ele}</h4></strong>
										</div>
									</div>
								</li>
							</ul>
						)
					})}
				</div>
				<div className="current-user">
					<div onClick={() => { logout() }} title="Logout" className="logout">
						<button className='btn btn-primary form-control'>чатдан чиқиш &nbsp;<i class="fa fa-sign-out" aria-hidden="true"></i></button>
					</div>
				</div>
			</div>
		);

	}
}
