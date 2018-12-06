import React from "react";
import { Modal } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import axios from 'axios';
import { Link } from "react-router-dom";
const photo = require('../../../logo3.png');

export default class RenderRating extends React.Component {
    constructor() {
        super();
        this.state = {
            show: false,
            isUserLogged: false
        }
    }


    handleHide = () => {
        this.setState({ show: false });
    }

    handleIsUserLogged = () => {
        this.setState({ isUserLogged: false });
    }

    checkUser = () => {
        window.alert("please login")
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
        const { ratingScore, changeRating, selectRatingQuestion, userId, users_who_rated, isLogged } = this.props;
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-3'></div>
                    <div className='col-sm-6'>
                        <div className="panel panel-default gold_border">
                            <div className="panel-heading">
                                <h4 className="panel-title" style={{ color: "#0093d3" }}>
                                <span style={{color: 'rgb(241, 159, 77)'}} className='glyphicon glyphicon-star'></span>
                                &nbsp;{this.props.rating_question}
                                </h4>
                            </div>
                            <div className="panel-body">
                                <b><h4
                                    style={{ color: "#e7711b", fontSize: '22px' }}>
                                    {Number(this.props.ratings).toFixed(1)} <span className='glyphicon glyphicon-stats'></span>
                                </h4></b>
                                <StarRatings
                                    starRatedColor="#e7711b"
                                    rating={Number(this.props.ratings)}
                                    numberOfStars={5}
                                    starEmptyColor="grey"
                                    starDimension="28px"
                                />
                                <div className="modal-container" >
                                    {userId && users_who_rated.indexOf(userId.toString()) !== -1 ? <button
                                        className='btn btn-success'
                                    > <span className='glyphicon glyphicon-ok' ></span>
                                        &nbsp; rated
                                    </button> : !userId ? <button
                                            className='btn btn-success'
                                            onClick={() => this.setState({ isUserLogged: true })}
                                        ><span className='glyphicon glyphicon-star'></span>
                                            &nbsp;rate it
                                     </button> : <button
                                                className='btn btn-success'
                                                onClick={() => this.setState({ show: true })}
                                            > <span  className='glyphicon glyphicon-star'></span>
                                                &nbsp; rate it
                                    </button>}
                                    <Modal
                                        show={this.state.show}
                                        onHide={this.handleHide}
                                        container={this}
                                        aria-labelledby="contained-modal-title"
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title id="contained-modal-title">
                                                <div
                                                    className="panel-title"
                                                    style={{ color: "#0093d3", fontSize: '22px' }}
                                                    >
                                                    <b><span className='glyphicon glyphicon-list-alt'></span></b>
                                                    &nbsp;{this.props.rating_question}
                                                </div>
                                            </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div >
                                                <StarRatings
                                                    starRatedColor="#e7711b"
                                                    rating={ratingScore}
                                                    changeRating={changeRating}
                                                    numberOfStars={5}
                                                    name={"this.props.rating_question_id"}
                                                    starHoverColor="#e7711b"
                                                />
                                                <textarea className='form-control' placeholder='please share your opinion' onInput={this.props.handleInputFeedback} name="feedback">
                                                </textarea>
                                            </div>
                                        </Modal.Body>
                                        <form onSubmit={selectRatingQuestion} id={this.props.rating_question_id} onClick={this.handleHide}>
                                            <button className='btn btn-success' onClick={this.handleHide}><span  className='glyphicon glyphicon-star'></span>
                                                &nbsp;submit</button>
                                            <br /><br />
                                        </form>
                                    </Modal>
                                    <Modal
                                        show={this.state.isUserLogged}
                                        onHide={this.handleIsUserLogged}
                                        container={this}
                                        aria-labelledby="contained-modal-title"
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title id="contained-modal-title">
                                            <h4>SmartCity administration</h4>
                                            </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            Please login into your {!isLogged ?
                                    <a
                                        onClick={this.handleLogin}>
                                            <h5>account</h5>
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
                                        <h4>SmartCity administration</h4>
                                    </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        {isLogged !== "loggedIn" ? <Link to="/sc/register" onClick={this.handleLogin}> Create an account </Link> : ""}
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
                                            <div><button onClick={this.handleLogout}>logout</button><Link to="/sc/profile">My profile</Link></div>} <br />
                                    </Modal.Body>
                                </Modal> and rate it.
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <button className='btn btn-success' onClick={this.handleIsUserLogged}>close</button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                                <p className='text-left'> {this.props.feedbacks}<span onClick={this.props.moreComments} id={this.props.rating_question_id}>...more</span></p>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-3'></div>
                </div>
            </div>
        )
    }
}
