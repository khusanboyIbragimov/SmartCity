import React, { Component } from 'react';
// import FAChevronDown from 'react-icons/lib/md/keyboard-arrow-down'
// import FAMenu from 'react-icons/lib/fa/list-ul'
// import FASearch from 'react-icons/lib/fa/search'
// import MdEject from 'react-icons/lib/md/eject'

export default class SideBar extends Component{

	render(){
		const { user, logout } = this.props
		return (
			<div id="side-bar">
					<div className="heading">
						<div className="app-name">Ғийчат</div>
					</div>
					<div>
						<ul>{this.props.onlineUsers.map( (ele) => {
							return(
								<li key={Math.random()} className="online_users">{ele}</li>
							)
						})}</ul>
					</div>
					<div className="make_height">
					</div>
					<div className="current-user">
						<span>{user.name}</span>
						<div onClick={()=>{logout()}} title="Logout" className="logout">
							чатдан чиқаман 
						</div>
					</div>
			</div>
		);

	}
}
