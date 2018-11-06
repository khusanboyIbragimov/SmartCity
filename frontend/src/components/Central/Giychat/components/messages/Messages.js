import React, { Component } from 'react';

export default class Messages extends Component {
	constructor(props) {
		super(props);

		this.scrollDown = this.scrollDown.bind(this)
	}

	scrollDown() {
		const { container } = this.refs
		container.scrollTop = container.scrollHeight
	}

	componentDidMount() {
		this.scrollDown()
	}

	componentDidUpdate(prevProps, prevState) {
		this.scrollDown()
	}

	render() {
		const { messages, user, typingUsers } = this.props
		return (
			<div ref='container'
				className="thread-container">
				<div className="thread">
					{
						messages.map((mes) => {
							return (
								<div
									key={mes.id}
									className={`message-container ${mes.sender === user.name && 'right'}`}
								>
									<div className="message my-message">
										<img alt="" class="img-circle medium-image" src='https://scontent-frt3-2.cdninstagram.com/vp/3ca2fb4fd8fb9e90234d42da07f63fed/5C505CC9/t51.2885-15/e35/41349438_869720689897963_6915892188155667819_n.jpg' />
										<div className="message-body">
											<div className="message-body-inner">
												<div className="message-info">
													<h4>{mes.sender}</h4>
													<h5> <i className="fa fa-clock-o"></i> {mes.time > 12 ? mes.time + ' AM' : mes.time + ' PM'}</h5>
												</div>
												<hr />
												<div className="message-text">
													{mes.message}
												</div>
											</div>
										</div>
										<br />
									</div>
								</div>

							)
						})
					}
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
		);
	}
}
