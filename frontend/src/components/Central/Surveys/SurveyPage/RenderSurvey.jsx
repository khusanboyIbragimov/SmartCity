import React from 'react';
import { Modal, ProgressBar } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from 'axios';
const photo = require('../../../logo3.png');


export default class RenderSurvey extends React.Component {
    constructor() {
        super();
        this.state = {
            isLogged: false
        }
    }

    handleModal = () => {
        this.setState({
            isLogged: !this.state.isLogged
        })
    }

    handleInput = (e) => {
        console.log(e.target.value)
        // console.log(e.target.id)
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

    render() {
        const { value, text, survey_question_id,
            survey_question_options_id, user_id, users, isLogged } = this.props;
        return (

            <div>
                <div>
                    <div className='row'>
                        <div className='col-sm-1 col-xs-1'>
                            {user_id ? <div>
                                {users.indexOf(user_id.toString()) !== -1 ?
                                    <input
                                        // style={{backgroundColor: "red", borderColor: '#0093d3', height: "15px"}}
                                        type="checkbox"
                                        name="checkbox"
                                        checked={true}
                                        disabled
                                        onChange={this.props.handleVote}
                                        id={survey_question_id}
                                        value={survey_question_options_id}
                                    />
                                    //         <button
                                    //             style={{ width: '100%' }}
                                    //             className='btn btn-danger'
                                    //             onChange={this.props.handleVote}
                                    //             disabled
                                    //             id={survey_question_id}
                                    //             value={survey_question_options_id}
                                    //         ><span >{text}</span>&nbsp;&nbsp;&nbsp;
                                    // <span >{value}</span>
                                    //         </button>
                                    :
                                    // <button
                                    //     style={{ backgroundColor: "green" }}
                                    //     onChange={this.props.handleVote}
                                    //     id={survey_question_id}
                                    //     value={survey_question_options_id}
                                    //     >{text}&nbsp;&nbsp;&nbsp;
                                    //     <span>{value}</span>
                                    // </button>
                                    <input
                                        style={{ backgroundColor: "green", borderColor: '#0093d3', height: "15px" }}
                                        type="checkbox"
                                        name="checkbox"
                                        checked={false}
                                        onChange={this.props.handleVote}
                                        id={survey_question_id}
                                        value={survey_question_options_id}
                                    />
                                }
                            </div> :
                                <div>
                                    <input
                                        type="checkbox"
                                        name="checkbox"
                                        checked={false}
                                        onChange={this.handleModal}
                                    />
                                </div>}
                        </div>
                        <div className='col-sm-9 col-xs-9 text-left'>
                            {text}
                        </div>
                        <div className='col-sm-1 col-xs-1 text-right'>
                            <i style={{color: 'rgb(241, 159, 77)'}} className="fa fa-line-chart" aria-hidden="true">&nbsp;{value}</i>
                        </div>
                        <div className='col-sm-1 col-xs-1 text-right'>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <ProgressBar striped active now={Number(value) > 90 ? Number(value) / 10 : Number(value)} />
                        </div>
                    </div>
                </div>
                <Modal
                    show={this.state.isLogged}
                    onHide={this.handleModal}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Body>
                    <Modal.Header closeButton>
                                        <Modal.Title id="contained-modal-title">
                                        <h4><img alt="" style={{height: '16px'}}src={photo}/> маъмурияти</h4>
                                    </Modal.Title>
                                    </Modal.Header>
                        Илтимос    {!isLogged ?
                                    <a
                                        onClick={this.handleLogin}>

                                            <p className='pointer'>аккаунтингизга</p>
                                        </a> :
                                    <li onClick={this.handleLogout} >
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
                                        <h4><img alt="" style={{height: '16px'}}src={photo}/> маъмурияти</h4>
                                    </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        {isLogged !== "loggedIn" ? <Link to="/sc/register" onClick={this.handleLogin}> Aккаунт яратиш </Link> : ""}
                                        {isLogged !== "loggedIn" ?
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
                                                    <hr />
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
                                                        <h4><img alt="" style={{height: '16px'}}src={photo}/> маъмурияти</h4>
                                                    </Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        парол ёки юзернэймда хатолиги бор.
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <button className='btn btn-success' onClick={this.handleLoginMessage}>ёпиш</button>
                                                    </Modal.Footer>
                                                </Modal>
                                            </form> :
                                            <div><button onClick={this.handleLogout}>чиқиш</button><Link to="/sc/profile">Менинг Аккаунтим</Link></div>} <br />
                                    </Modal.Body>
                                </Modal> киринг ва ушбу суровда қатнашинг. Унитманг бу жамиятда
                        сизнинг хам ўрнингиз бор
                    </Modal.Body>
                    <Modal.Footer>
                        <button className='btn btn-success' onClick={this.handleModal}>ёпиш</button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
