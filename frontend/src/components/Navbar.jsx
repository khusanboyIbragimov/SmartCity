import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap';
import io from 'socket.io-client';
import { LOGOUT } from './Central/Giychat/Events';
const socketUrl = "http://localhost:3100";

class Navbar extends React.Component {

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

    handleLoginMessage = () => {
        this.setState({
            loginMessage: false
        })
    }

    render() {
        const { isLogged, fullname } = this.state;
        return (



            <div>
                <nav class="navbar navbar-default">
                    <div class="container">

                        <div class="navbar-header">
                            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>
                            <a class="navbar-brand" href="#">GulAppkandoz</a>
                        </div>
                        <div class="collapse navbar-collapse" id="myNavbar">
                            <ul class="nav navbar-nav navbar-right">
                                <li><Link to="/ga/home">Марказ</Link></li>
                                <li><Link to="/ga/news"> Янгиликлар </Link></li>
                                <li><Link to="/ga/announcement">Эълонлар</Link></li>
                                <li><Link to="/ga/survey"> Сўров </Link></li>
                                <li><Link to="/ga/bazaar"> Бозор </Link></li>
                                <li><Link to="/ga/giychat">Ғийчат </Link></li>
                                {isLogged ? <li><Link to="/ga/profile"><span data-toggle="tooltip" title="Hooray!" style={{ fontSize: '22px' }} class="glyphicon glyphicon-user"></span></Link></li> : ""}
                                {!isLogged ? <li onClick={this.handleLogin}><Link to><span style={{ fontSize: '22px' }} class="glyphicon glyphicon-log-in"></span></Link></li> :
                                    <li onClick={this.handleLogout}><Link to><span style={{ fontSize: '22px' }} class="glyphicon glyphicon-log-out"></span></Link></li>}
                                <Modal
                                    show={this.state.isLogin}
                                    onHide={this.handleLogin}
                                    container={this}
                                    aria-labelledby="contained-modal-title"
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title id="contained-modal-title">
                                            GulApp маъмурияти
                            </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        {isLogged !== "loggedIn" ? <Link to="/ga/register" onClick={this.handleLogin}> Aккаунт яратиш </Link> : ""}
                                        {isLogged !== "loggedIn" ?
                                            <form className="form-inline" onSubmit={this.handleSubmit} >
                                                <div>
                                                    <input
                                                        type="text"
                                                        className="form-control mb-2 mr-sm-2"
                                                        id="inlineFormInputName2"
                                                        placeholder="юзернэйм"
                                                        onChange={this.handleFormInput}
                                                        name="username"
                                                    />
                                                    <div className="input-group mb-2 mr-sm-2">
                                                        <input
                                                            type="password"
                                                            className="form-control"
                                                            id="inlineFormInputGroupUsername2"
                                                            placeholder="парол"
                                                            onChange={this.handleFormInput}
                                                            name="password"
                                                        />
                                                    </div>
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
                                                            GulApp маъмурияти
                            </Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        парол ёки юзернэймда хатолиги бор.
                        </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button onClick={this.handleLoginMessage}>ёпаман</Button>
                                                    </Modal.Footer>
                                                </Modal>
                                            </form> :
                                            <div><button onClick={this.handleLogout}>чиқаман</button><Link to="/ga/profile">Менинг Аккаунтим</Link></div>}
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button onClick={this.handleLogin}>ёпаман</Button>
                                    </Modal.Footer>
                                </Modal>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div class="container-fluid bg-1 text-center">
                    <div id="myCarousel" class="carousel slide" data-ride="carousel">

                        <ol class="carousel-indicators">
                            <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                            <li data-target="#myCarousel" data-slide-to="1"></li>
                            <li data-target="#myCarousel" data-slide-to="2"></li>
                        </ol>

                        <div class="carousel-inner">
                            <div class="item active">
                                <img src="https://i.mycdn.me/i?r=ATEyUJoYvVI9gWED2oNOgFTguSMcKp07FiFg-5eF8g7UhSCCDx6H11LRhpoEs4OYJOQ" alt="Los Angeles" style={{height: "3~00px", width: "100%"}} />
                            </div>

                            <div class="item">
                                <img src="https://i.ytimg.com/vi/Jra1nFbSeEE/hqdefault.jpg" alt="Chicago" style={{height: "3~00px", width: "100%" }} />
                            </div>

                            <div class="item">
                                <img src="https://pp.userapi.com/c630319/v630319710/6cf9/Tio5t7c1DLQ.jpg" alt="New york" style={{height: "3~00px", width: "100%"}} />
                            </div>
                        </div>


                        <a class="left carousel-control" href="#myCarousel" data-slide="prev">
                            <span class="glyphicon glyphicon-chevron-left"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="right carousel-control" href="#myCarousel" data-slide="next">
                            <span class="glyphicon glyphicon-chevron-right"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>
                    <h3 class="margin">Хуш Келибсиз {fullname}!</h3>
                </div>
            </div>








            // <div>
            //     {isLogged !== "loggedIn"?<Link to="/ga/register"> Aккаунт яратиш </Link>:"Хуш келибсиз " + fullname + "!"}
            //     {isLogged !== "loggedIn"?
            //         <form className="form-inline" onSubmit={this.handleSubmit} >
            //             <div>
            //                 <input
            //                     type="text"
            //                     className="form-control mb-2 mr-sm-2"
            //                     id="inlineFormInputName2"
            //                     placeholder="юзернэйм"
            //                     onChange={this.handleFormInput}
            //                     name="username"
            //                 />
            //                 <div className="input-group mb-2 mr-sm-2">
            //                     <input
            //                         type="password"
            //                         className="form-control"
            //                         id="inlineFormInputGroupUsername2"
            //                         placeholder="парол"
            //                         onChange={this.handleFormInput}
            //                         name="password"
            //                     />
            //                 </div>
            //                 <button type="submit" className="btn btn-primary mb-2">кириш</button>
            //             </div>
            //             <Modal
            //                 show={this.state.loginMessage}
            //                 onHide={this.handleLoginMessage}
            //                 container={this}
            //                 aria-labelledby="contained-modal-title"
            //             >
            //                 <Modal.Header closeButton>
            //                     <Modal.Title id="contained-modal-title">
            //                         GulApp маъмурияти
            //                 </Modal.Title>
            //                 </Modal.Header>
            //                 <Modal.Body>
            //                     парол ёки юзернэймда хатолиги бор.
            //             </Modal.Body>
            //                 <Modal.Footer>
            //                     <Button onClick={this.handleLoginMessage}>ёпаман</Button>
            //                 </Modal.Footer>
            //             </Modal>
            //         </form> :
            //     <div><button onClick={this.handleLogout}>чиқаман</button><Link to="/ga/profile">Менинг Аккаунтим</Link></div>}
            //     <nav>
            //         <Link to="/ga/home">Марказ</Link>&nbsp;&nbsp;&nbsp;
            //         <Link to="/ga/news"> Янгиликлар </Link>&nbsp;&nbsp;&nbsp;
            //         <Link to="/ga/announcement">Эълонлар</Link>&nbsp;&nbsp;&nbsp;
            //         <Link to="/ga/survey"> Сўров </Link>&nbsp;&nbsp;&nbsp;
            //         <Link to="/ga/bazaar"> Бозор </Link>&nbsp;&nbsp;&nbsp;
            //         <Link to="/ga/giychat">Ғийчат </Link>&nbsp;&nbsp;&nbsp;
            //     </nav>
            //     <hr/>
            // </div>
        )
    }
}
export default Navbar;

