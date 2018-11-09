import React, { Component } from 'react';

export default class MessageInput extends Component {

	constructor(props) {
		super(props);

		this.state = {
			message: "",
			isTyping: false
		};

	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.sendMessage()
		this.setState({ message: "" })
	}

	sendMessage = () => {
		this.props.sendMessage(this.state.message)

	}

	componentWillUnmount() {
		this.stopCheckingTyping()
	}

	sendTyping = () => {
		this.lastUpdateTime = Date.now()
		if (!this.state.isTyping) {
			this.setState({ isTyping: true })
			this.props.sendTyping(true)
			this.startCheckingTyping()
		}
	}

	// Start an interval that checks if the user is typing.
	startCheckingTyping = () => {
		this.typingInterval = setInterval(() => {
			if ((Date.now() - this.lastUpdateTime) > 300) {
				this.setState({ isTyping: false })
				this.stopCheckingTyping()
			}
		}, 300)
	}

	// Start the interval from checking if the user is typing.
	stopCheckingTyping = () => {
		if (this.typingInterval) {
			clearInterval(this.typingInterval)
			this.props.sendTyping(false)
		}
	}
	render() {
		const { message } = this.state
		return (
			<div className="col-lg-6">
				<div className="message-input">
					<form
						onSubmit={this.handleSubmit}
						className="message-form">
						<div className="row">
							<div className="col-lg-6">
								<div className="input-group">
									<input id="message"
										ref={"messageinput"}
										type="text"
										className="form-control"
										value={message}
										autoComplete={'off'}
										placeholder="..."
										onKeyUp={e => { e.keyCode !== 13 && this.sendTyping() }}
										onChange={
											({ target }) => {
												this.setState({ message: target.value })
											}
										} />
									<span className="input-group-btn">
										<button className="send btn btn-success" disabled={message.length < 1} type="submit"><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
									</span>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}
