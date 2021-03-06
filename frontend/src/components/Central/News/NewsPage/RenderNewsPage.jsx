import React from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import { Link } from "react-router-dom";
const photo = require('../../../logo3.png');
var Moment = require("moment");
// require('moment/locale/uz');
// let gulakandozFiles = require("./gulakandozFiles");
// let api = gulakandozFiles.default;
// let gulakandozHistory = api[0];
let images = ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtIkh76M3aqByHStzP-e3eL4YzAfa0CeL1gbpfyz-mJjHWpbwBQ',
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRER5YotdW8RaUw8WWT_8C736-OdUKrr0wp3XGTe9KqKI0zSDqH2g',
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrwXjdd-rW72b0Zy4fKiySIcFjHI43c54bsMzHs4sKY-WPUBsz',
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvIY3Ykrp4Yk3jIn5RKTMXc5qnpcuRKips7ANpCXQwNDftQyWKWA'];


export default class RenderNewsPage extends React.Component {

    constructor() {
        super();
        this.state = {
            isUserLogged: false,
        }
    }

    handleIsUserLogged = () => {
        this.setState({
            isUserLogged: false
        })
    }

    // handleClickHistoryText = (e) => {
    //     this.setState({
    //         showHistoryText: !this.state.showHistoryText
    //     })
    // }

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
        const { users_who_agree, userId, users_who_disagree,
            news_id, title, text, news_imgurl, news_timestamp,
            fullname, rightees, wrongees,
            handleSubmitRightNews, handleSubmitWrongNews, isLogged
        } = this.props;
        return (
            <div className='container'>
                <div className="well">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row hidden-md hidden-lg"><h4 className="row hidden-md hidden-lg"><span style={{ color: 'rgb(241, 159, 77)' }} className='glyphicon glyphicon-globe'></span> {title}</h4></div>

                            <div className="pull-left col-md-4 col-xs-12 thumb-contenido"><img style={{ height: "200px", width: "100%" }} alt="yangilik surati" className="center-block img-responsive" src={news_imgurl ? news_imgurl :
                              images[Math.floor(Math.random() * images.length)]}/></div>
                            <div className="">
                                    <h4 className="h4 hidden-xs hidden-sm"><span style={{ color: 'rgb(241, 159, 77)' }} className='glyphicon glyphicon-globe'></span> {title}</h4>

                                <hr />
                                <small><p id='time'><i className="fa fa-clock-o" aria-hidden="true"></i>&nbsp;{Moment(news_timestamp).format("LLLL")}</p></small>
                                <small><strong><h5 className='author blue_font'><i className="fa fa-pencil " aria-hidden="true"></i>
                                            &nbsp;{fullname}</h5></strong></small>
                                <hr />
                                <div key={news_id}>
                                <p className="text-justify">{text}<br /><br />
                                </p>
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

                                            <p className='pointer'>account</p>
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
                                        {isLogged !== "loggedIn" ? <Link to="/sc/register" onClick={this.handleLogin}>Create an account</Link> : ""}
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
                                            <div><button onClick={this.handleLogout}>logout</button><Link to="/sc/profile">Мy profile</Link></div>} <br />
                                    </Modal.Body>
                                </Modal> and vote it.
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <button className='btn btn-success' onClick={this.handleIsUserLogged}>close</button>
                                        </Modal.Footer>
                                    </Modal>

                                </div>
                                </div>

                        </div>
                    </div>
                    {userId ? <div className='row'>
                    <div className='col-sm-8 col-xs-0'></div>
                                    <div className='col-sm-2 col-xs-6'>
                                        <form onSubmit={handleSubmitRightNews} id={news_id}>
                                            {userId && users_who_agree.indexOf(userId.toString()) !== -1 ?
                                                <button style={{ width: '80%' }} className='btn btn-success btn-xs' disabled>true{" "}{rightees}</button> :
                                                <button style={{ width: '80%' }} className='btn btn-success btn-xs'>true{" "}{rightees}</button>}
                                        </form>                                    </div>
                                    <div className='col-sm-2 col-xs-6'>
                                        <form onSubmit={handleSubmitWrongNews} id={news_id}>
                                            {userId && users_who_disagree.indexOf(userId.toString()) !== -1 ?
                                                <button style={{ width: '80%' }} className='btn btn-danger btn-xs' disabled>false&nbsp;&nbsp;{" "}{wrongees}</button> :
                                                <button style={{ width: '80%' }} className='btn btn-danger btn-xs'>false&nbsp;&nbsp;{" "}{wrongees}</button>}
                                        </form>                                    </div>
                                </div> :
                                    <div className="row">
                                     <div className='col-sm-8 col-xs-0'></div>
                                        <div className='col-sm-2 col-xs-6'>
                                            <button style={{ width: '80%' }} className='btn btn-success btn-xs'
                                                onClick={() => this.setState({ isUserLogged: true })}>true{" "}{rightees}
                                            </button>
                                        </div>
                                        <div className='col-sm-2 col-xs-6'>
                                            <button style={{ width: '80%' }} className='btn btn-danger btn-xs'
                                                onClick={() => this.setState({ isUserLogged: true })}>false&nbsp;&nbsp;{" "}{wrongees}
                                            </button>
                                        </div>
                                    </div>
                                }
                </div>


                {/* <div className='row'>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 style={{ color: '#0093d3' }} className="h4"><span style={{ color: 'rgb(241, 159, 77)' }} className='glyphicon glyphicon-globe'></span> {title}</h4>
                        </div>
                        <div className="panel-body">
                            <div className='col-sm-4'>
                                <img src={news_imgurl ? news_imgurl :
                                    images[Math.floor(Math.random() * images.length)]}
                                    alt="habar surati"
                                    style={{ height: "250px", width: "100%" }}
                                    className="img-rounded"
                                />
                                <div className='row'>
                                    <div className='col-sm-12 col-xs-12 text-left'>
                                        <h5 style={{ color: "grey" }}><i className="fa fa-pencil" aria-hidden="true"></i>
                                            &nbsp;{fullname}</h5>
                                    </div>
                                </div>
                                {userId ? <div className='row'>
                                    <div className='col-sm-6 col-xs-6'>
                                        <form onSubmit={handleSubmitRightNews} id={news_id}>
                                            {userId && users_who_agree.indexOf(userId.toString()) !== -1 ?
                                                <button style={{ width: '100%' }} className='btn btn-success' disabled>ҳақиқат{" "}{rightees}</button> :
                                                <button style={{ width: '100%' }} className='btn btn-success'>ҳақиқат{" "}{rightees}</button>}
                                        </form>                                    </div>
                                    <div className='col-sm-6 col-xs-6'>
                                        <form onSubmit={handleSubmitWrongNews} id={news_id}>
                                            {userId && users_who_disagree.indexOf(userId.toString()) !== -1 ?
                                                <button style={{ width: '100%' }} className='btn btn-danger' disabled>ғийбат&nbsp;&nbsp;{" "}{wrongees}</button> :
                                                <button style={{ width: '100%' }} className='btn btn-danger'>ғийбат&nbsp;&nbsp;{" "}{wrongees}</button>}
                                        </form>                                    </div>
                                </div> :
                                    <div className="row">
                                        <div className='col-sm-6 col-xs-6'>
                                            <button style={{ width: '100%' }} className='btn btn-success'
                                                onClick={() => this.setState({ isUserLogged: true })}>ҳақиқат{" "}{rightees}
                                            </button>
                                        </div>
                                        <div className='col-sm-6 col-xs-6'>
                                            <button style={{ width: '100%' }} className='btn btn-danger'
                                                onClick={() => this.setState({ isUserLogged: true })}>ғийбат&nbsp;&nbsp;{" "}{wrongees}
                                            </button>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className='col-sm-8'>
                                <div key={news_id}>
                                    <div style={{ textAlign: 'left' }}><div>{text.length > 150 ? <div className="text-justify"><p>{text}</p></div> : <div><p>{text}</p><br /><br />
                                        <blockquote className={`text-justify ${showHistoryText ? "show" : "hide"} pagination`} onClick={this.handleClickHistoryText}>
                                            {gulakandozHistory[Math.floor(Math.random() * gulakandozHistory.length)]}<hr />
                                            <cite>Ғулакандоз: кеча, бугун, эртага. Хужанд - 2002 йил</cite>
                                        </blockquote>
                                        <div
                                            onClick={this.handleClickHistoryText}
                                            className={`${!showHistoryText ? "show" : "hide"}`}
                                        >
                                            <button className="btn-link">Tарих зарвараклари...</button>
                                        </div>
                                    </div>}
                                    </div></div>
                                    <Modal
                                        show={this.state.isUserLogged}
                                        onHide={this.handleIsUserLogged}
                                        container={this}
                                        aria-labelledby="contained-modal-title"
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title id="contained-modal-title">
                                                {this.props.title}
                                            </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            Илтимос аккаўнтингизга киринг ва ушбу хабарни хақиқатга
                                            яқинлаштиришга ўз ҳиссангизни қўшинг. Унутманг бу жамиятда
                                            сизнинг хам ўрнингиз бор
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button onClick={this.handleIsUserLogged}>ёпаман</Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                            </div>
                            <div className='col-sm-12 text-right'>
                                <span style={{ color: "grey", fontSize: "10px", textAlign: "center" }} className='glyphicon glyphicon-time'>
                                    &nbsp;{Moment(news_timestamp).format("LLLL")}<br />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>  */}
            </div>
        )
    }
}
