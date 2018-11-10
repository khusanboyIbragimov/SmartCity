import React from 'react';
import axios from 'axios';
import { Redirect } from "react-router";
import { Button, Modal } from 'react-bootstrap';


export default class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            loginMessage: false,
            isLogin: false
        }
    }

    handleFormInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleLoginMessage = () => {
        this.setState({
            loginMessage: false
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
                    isLogin: true
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

    render() {
        const { isLogin } = this.state;
        if (isLogin) {
            return <Redirect to="/" />
        }
        return (
            <div>
                <form className="form-inline" onSubmit={this.handleSubmit} >
                    <div>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="юзернэйм"
                            onChange={this.handleFormInput}
                            name="username"
                        />
                            <input
                                type="password"
                                className="form-control"
                                placeholder="парол"
                                onChange={this.handleFormInput}
                                name="password"
                            />
                        <hr/>
                        <button type="submit" className="btn btn-primary mb-2">Кириш</button>
                    </div>
                    <Modal
                        show={this.state.loginMessage}
                        onHide={this.handleLoginMessage}
                        container={this}
                        aria-labelledby="contained-modal-title"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title">
                                SmartCity маъмурияти
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            парол ёки юзернэймда хатолиги бор.
                        </Modal.Body>
                        <Modal.Footer>
                            <button className='btn btn-success' onClick={this.handleLoginMessage}>ёпиш</button>
                        </Modal.Footer>
                    </Modal>
                </form>
            </div>
        )
    }
}