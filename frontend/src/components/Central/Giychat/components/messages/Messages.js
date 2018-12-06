import React, { Component } from 'react';
import { css } from "glamor";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from 'axios';

const ROOT_CSS = css({
	height: 300,
	width: "100%"
});

export default class Messages extends Component {

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
		const { messages, user, typingUsers } = this.props

		return (
			<div ref='container' className="thread-container">
				<div className="thread">
					<ScrollToBottom className={ROOT_CSS} mode="bottom">
						{
							messages.map((mes) => {
								return (
									mes.sender === user.name ?
										<div
											key={mes.id}
										// className={`message-container ${mes.sender === user.name && 'right'}`}
										>
											<div className="message my-message ">
												<img alt="" className="img-circle medium-image" src='https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png' />
												<div className="message-body">
													<div className="message-body-inner">
														<div className="message-info">
															<h4>{mes.sender}</h4>
															<h5> <i className="fa fa-clock-o"></i> {mes.time > 12 ? mes.time + ' AM' : mes.time + ' PM'}</h5>
														</div>
														<hr />
														<div className="message-text">
															<p>{mes.message}</p>
														</div>
													</div>
												</div>
												<br />
											</div>
										</div> :
										<div
											key={mes.id}
										// className={`message-container ${mes.sender === user.name && 'right'}`}
										>
											<div class="message info">
												<img alt="" className="img-circle medium-image" src='https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png' />

												<div class="message-body">
													<div class="message-info">
														<h4>{mes.sender}</h4>
														<h5> <i className="fa fa-clock-o"></i> {mes.time > 12 ? mes.time + ' AM' : mes.time + ' PM'}</h5>
													</div>
													<hr />
													<div class="message-text">
														{mes.message}
													</div>
												</div>
												<br />
											</div>
										</div>
								)
							})
						}
					</ScrollToBottom>
					{
						typingUsers.map((name) => {
							return (
								<div key={name} className="typing-user">
									{`${name} is typing . . .`}
								</div>
							)
						})
					}
				</div>
			</div>
		)
	}
}
