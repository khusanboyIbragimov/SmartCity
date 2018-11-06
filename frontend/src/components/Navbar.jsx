import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import io from 'socket.io-client';
import { LOGOUT } from './Central/Giychat/Events';
const socketUrl = "http://localhost:3100";

export default class Navbar extends React.Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            loggedUsername: "",
            isLogged: false,
            fullname: "",
            loginMessage: false,
            news: [],
            isLogin: false
        }
    }

    componentWillMount() {
        axios
            .get("/isloggedin")
            .then((res) => {
                this.setState({
                    isLogged: res.data
                })
                axios
                    .get('/users/userInfo')
                    .then(res => {
                        this.setState({
                            fullname: res.data[0].fullname,
                            loggedUsername: res.data[0].username
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .then(res => {
                axios
                    .get("/users/getallnews")
                    .then((res) => {
                        this.setState({
                            news: res.data.slice(0, 4)
                        })
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
            .catch((err) => {
                console.log(err);
            })
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

    handleLogout = () => {
        this.logout();
        axios
            .get("/users/logoutUser")
            .then((res) => {
                this.setState({
                    isLogged: false
                })
            })
            .then(() => {
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    logout = () => {
        const socket = io(socketUrl);
        let username = this.state.loggedUsername.length > 0 ? this.state.loggedUsername : ""
        socket.emit(LOGOUT, username);
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
        const { isLogged, fullname } = this.state;
        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a style={{ fontFamily: 'san-serif', fontSize: '30px' }} className="navbar-brand"><span style={{ color: 'rgb(241, 159, 77)' }}>Smart</span><strong style={{ color: '#0093d3'}}>City</strong></a>
                        </div>
                        <div className="collapse navbar-collapse" id=".navbar-collapse">
                            <ul className="nav navbar-nav navbar-right">
                                <li><Link 
                                        to="/" 
                                        data-toggle="collapse" 
                                        data-target=".navbar-collapse.in"> 
                                        <span className='glyphicon glyphicon-home'></span>Марказ
                                    </Link>
                                </li>
                                <li><Link 
                                        to="/sc/news" 
                                        data-toggle="collapse" 
                                        data-target=".navbar-collapse.in"> 
                                        <span className='glyphicon glyphicon-globe'></span>Янгиликлар 
                                    </Link>
                                </li>
                                <li><Link 
                                        to="/sc/announcement" 
                                        data-toggle="collapse" 
                                        data-target=".navbar-collapse.in">
                                        <span className='glyphicon glyphicon-bullhorn'></span>Эълонлар
                                    </Link>
                                </li>
                                <li><Link 
                                        to="/sc/ratings" 
                                        data-toggle="collapse" 
                                        data-target=".navbar-collapse.in"> 
                                        <span className='glyphicon glyphicon-star'></span>Рейтинг
                                    </Link>
                                </li>
                                <li><Link 
                                        to="/sc/survey" 
                                        data-toggle="collapse" 
                                        data-target=".navbar-collapse.in"> 
                                         <i 
                                               className="fa fa-bar-chart" 
                                               aria-hidden="true"
                                                >
                                            </i>Сўров
                                    </Link>
                                </li>
                                <li><Link 
                                        to="/sc/bazaar" 
                                        data-toggle="collapse" 
                                        data-target=".navbar-collapse.in"> 
                                        <b><span className='glyphicon glyphicon-usd'></span></b>Бозор
                                    </Link>
                                </li>
                                <li><Link 
                                        to="/sc/giychat" 
                                        data-toggle="collapse" 
                                        data-target=".navbar-collapse.in">
                                        <i className="fa fa-users" aria-hidden="true"></i>Ғийчат
                                    </Link>
                                </li>
                                {isLogged ? 
                                    <li><Link 
                                            to="/sc/profile">
                                            <span style={{ fontSize: '22px' }} 
                                            data-toggle="collapse" 
                                            data-target=".navbar-collapse.in"
                                            className="glyphicon glyphicon-user"></span>
                                        </Link>
                                    </li> : ""}
                                {!isLogged ? 
                                    <li 
                                        onClick={this.handleLogin}>
                                        <a  data-toggle="collapse" 
                                            data-target=".navbar-collapse.in"
                                        > 
                                            <span style={{ fontSize: '22px' }} 
                                                className="glyphicon glyphicon-log-in">
                                            </span>
                                        </a></li> :
                                    <li onClick={this.handleLogout}>
                                        <a  data-toggle="collapse" 
                                            data-target=".navbar-collapse.in">
                                            <span style={{ fontSize: '22px' }} 
                                                className="glyphicon glyphicon-log-out">
                                            </span>
                                        </a></li>}
                                <Modal
                                    show={this.state.isLogin}
                                    onHide={this.handleLogin}
                                    container={this}
                                    aria-labelledby="contained-modal-title"
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title id="contained-modal-title">
                                            SmartCity маъмурияти
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
                                                        <button className='btn btn-primary' onClick={this.handleLoginMessage}>ёпиш</button>
                                                    </Modal.Footer>
                                                </Modal>
                                            </form> :
                                            <div><button onClick={this.handleLogout}>чиқиш</button><Link to="/sc/profile">Менинг Аккаунтим</Link></div>} <br/>
                                    </Modal.Body>
                                </Modal>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="container-fluid bg-1 text-center">
                    <div id="myCarousel" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                            <li data-target="#myCarousel" data-slide-to="1"></li>
                            <li data-target="#myCarousel" data-slide-to="2"></li>
                            <li data-target="#myCarousel" data-slide-to="3"></li>
                        </ol>
                        <div className="carousel-inner">
                            <div className="item active">
                                <img src="https://www.energio.es/wp-content/uploads/2017/08/slider-smart-city-energio.jpg" alt="Los Angeles" style={{ height: "300px", width: "100%" }} />
                            </div>

                            <div className="item">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3n5deO_2SUqlTOucUoJcwq1XKfiC6j2dvQEdGpKTbSmepDXI8yQ" alt="Chicago" style={{ height: "300px", width: "100%" }} />
                            </div>

                            <div className="item">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1z-FUZtrEKObNP5P0Rm9HmMNcB4MOhy2oXJc5keEU6FJsHO9r" alt="New york" style={{ height: "300px", width: "100%" }} />
                            </div>
                            <div className="item">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE0odbtyIV32qjZbpeBC7AlOtAuZuiPVaiTGJUrAw4qHkDcN6d0Q" alt="New york" style={{ height: "300px", width: "100%" }} />
                            </div>
                        </div>
                        <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                            <span className="glyphicon glyphicon-chevron-left"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="right carousel-control" href="#myCarousel" data-slide="next">
                            <span className="glyphicon glyphicon-chevron-right"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                    <h3 className="margin"><span style={{color: 'rgb(241, 159, 77)'}} >Хуш Келибсиз</span> <strong style={{ color: '#0093d3'}}>{fullname}</strong></h3>
                </div>
            </div>
        )
    }
}
