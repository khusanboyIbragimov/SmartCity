import React from "react";
import axios from "axios";
import { Link, Route, Switch } from "react-router-dom";
import MyNews from "./News/MyNews/MyNews";
import MyRatings from "./Ratings/MyRatings/MyRatings";
import MySurveys from "./Surveys/MySurveys/MySurveys";
import MyAnnouncements from "./Announcements/MyAnnouncements/MyAnnouncements";
import MyBazaars from "./Bazaars/MyBazaars/MyBazaars";
import io from 'socket.io-client';
import { LOGOUT } from './Giychat/Events';
// const socketUrl = "http://localhost:3100";
const photo = require('./logo_for_profile.png');

var ReactS3Uploader = require("react-s3-uploader");

export default class Profile extends React.Component {

    constructor() {
        super();
        this.state = {
            userInfo: [],
            fullname: "",
            username: "",
            phone_number: "",
            user_imgUrl: "",
            completed: "",
            toggle: false,
            showSubmitButton: false,
            showSubmitButtonWithoutPhoto: false,
        }
    }

    handleToggle = () => {
        this.setState({
            toggle: true,
            showSubmitButtonWithoutPhoto: true
        })
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount() {
        axios
            .get('/users/userInfo')
            .then(res => {
                this.setState({
                    fullname: res.data[0].fullname,
                    username: res.data[0].username,
                    phone_number: res.data[0].phone_number,
                    user_imgurl: res.data[0].user_imgurl.length > 0 ? res.data[0].user_imgurl : 'https://scontent-frt3-2.cdninstagram.com/vp/3ca2fb4fd8fb9e90234d42da07f63fed/5C505CC9/t51.2885-15/e35/41349438_869720689897963_6915892188155667819_n.jpg'
                })
            })
            .catch(err => {
                console.log(err);
            })
        axios
            .get("/users/getUsersPosts")
            .then((res) => {
                this.setState({
                    news: res.data
                })
            })
            .catch((err) => {
                console.log(err);
            })
        this.logout();
    }

    logout = () => {
        const socket = io();
        let username = this.props.userInfo.length > 0 ? this.props.userInfo[0].username : ""
        socket.emit(LOGOUT, username);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { fullname, username, phone_number, user_imgurl } = this.state;
        axios
            .patch("/users/updateprofile", {
                fullname: fullname,
                username: username,
                phone_number: phone_number,
                user_imgurl: user_imgurl
            })
            .then((res) => {
                window.location.reload();
                axios
                    .get('/users/userInfo')
                    .then(res => {
                        this.setState({
                            fullname: res.data[0].fullname,
                            username: res.data[0].username,
                            phone_number: res.data[0].phone_number,
                            user_imgurl: res.data[0].user_imgurl
                        })
                    }).then(res => {
                        this.setState({
                            toggle: false
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    })

            })
            .catch((err) => {
                console.log(err);
            })
    }

    onUploadProgress = (percent) => {
        this.setState({
            completed: percent + "%"
        })
    }

    onUploadFinish = (img) => {
        this.setState({
            user_imgurl: "https://s3.us-east-2.amazonaws.com/gulapp2/" + img.filename
        })
    }

    handleClick = () => {
        this.setState({
            showSubmitButton: true,
            showSubmitButtonWithoutPhoto: false
        })
    }

    render() {
        const { username, phone_number, toggle,
            fullname, user_imgurl,
            showSubmitButton } = this.state;
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="panel panel-default">
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            {!toggle ? <img src={user_imgurl} alt="img" style={{ height: "100%", width: "100%" }} /> : ""}
                                            {toggle ? <ReactS3Uploader
                                                signingUrl="/s3/sign"
                                                signingUrlMethod="GET"
                                                accept="image/*"
                                                uploadRequestHeaders={{
                                                    'x-amz-acl': 'public-read'
                                                }}
                                                onFinish={this.onUploadFinish}
                                                onProgress={this.onUploadProgress}
                                                onClick={this.handleClick}
                                            /> : ""
                                            }
                                        </div>
                                        <div className="col-sm-9">
                                            <div className="row">
                                                <form onSubmit={this.handleSubmit}>
                                                    <div className="col-sm-6 text-left">
                                                        <h4>Менинг профайлим</h4><br />
                                                        <span className='glyphicon glyphicon-check'></span> Тўлиқ исмим: {!toggle ? fullname : ""} {toggle ? <input  value={fullname} name="fullname" onChange={this.handleInput}></input> : ""}<br /><br />
                                                        <span className='glyphicon glyphicon-user'></span> Менинг юзернэймим: {!toggle ? username : ""} {toggle ? <input value={username} name="username" onChange={this.handleInput}></input> : ""}<br /><br />
                                                        <span className='glyphicon glyphicon-earphone'></span> Телефон номерим: {!toggle ? phone_number : ""} {toggle ? <input value={phone_number} name="phone_number" onChange={this.handleInput}></input> : ""}<br /><br />
                                                    </div>
                                                    <div className="col-sm-3">
                                                    <img alt='' src={photo} style={{ height: '168px'}}/>
                                                        {/* <span className="glyphicon glyphicon-globe logo slideanim" style={{ color: '#0093d3', fontSize: '200px' }}></span> */}
                                                    </div>
                                                    <div className="col-sm-3 text-right">
                                                        {!toggle ? <button className="btn btn-default" onClick={this.handleToggle}><span className='glyphicon glyphicon-pencil'></span> ўзгартириш</button> : ""}
                                                        {toggle && showSubmitButton ? <button className="btn btn-default" onClick={this.handleToggle}>сақлаш</button> : ""}
                                                        {this.state.showSubmitButtonWithoutPhoto ? <button className="btn btn-default"><span className='glyphicon glyphicon-check'></span> сақлаш</button> : ""}
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-sm-1 col-xs-3 text-center'></div>
                                <div className='col-sm-2 col-xs-6 text-center'>
                                    <Link to="/sc/profile/mynews"><button style={{ width: '100%', fontSize: '12px' }} className='btn btn-primary'><b><span className='glyphicon glyphicon-globe'></span></b>&nbsp;янгиликларим </button></Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                                <div className='col-sm-2 col-xs-6 text-center'>
                                    <Link to="/sc/profile/myannouncements"><button style={{ width: '100%', fontSize: '12px' }} className='btn btn-primary'><b><span className='glyphicon glyphicon-bullhorn'></span></b>&nbsp;эълонларим</button></Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                                <div className='col-sm-2 col-xs-6 text-center'>
                                    <Link to="/sc/profile/myratings"><button style={{ width: '100%', fontSize: '12px' }} className='btn btn-primary'><span className='glyphicon glyphicon-star'></span>&nbsp;рэйтингларим</button></Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                                <div className='col-sm-2 col-xs-6 text-center'>
                                    <Link to="/sc/profile/mysurveys"><button style={{ width: '100%', fontSize: '12px' }} className='btn btn-primary'> <b><i className="fa fa-bar-chart" aria-hidden="true"></i></b>&nbsp;сўровларим</button></Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                                <div className='col-sm-2 col-xs-6 '>
                                    <Link to="/sc/profile/mybazaar"><button style={{ width: '100%', fontSize: '12px' }} className='btn btn-primary'><b><span className='glyphicon glyphicon-usd'></span></b>&nbsp;бозорим</button></Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                            </div>
                            <div>
                            </div>
                            <br />
                            <Switch>
                                <Route exact path="/sc/profile/mynews" component={MyNews} />
                                <Route exact path="/sc/profile/myratings" component={MyRatings} />
                                <Route exact path="/sc/profile/mysurveys" component={MySurveys} />
                                <Route exact path="/sc/profile/myannouncements" component={MyAnnouncements} />
                                <Route exact path="/sc/profile/mybazaar" component={MyBazaars} />
                            </Switch>
                        </div>
                    </div>
                </div>
                <div id="contact" className="container-fluid" style={{ background: 'white' }}>
                    <h2 className="text-center">Биз билан богланинг</h2>
                    <div className="row">
                        <div className="col-sm-5">
                            <p>Биз билан богланинг ва биз сизга 24 соат ичида жавоб кайтарамиз.</p>
                            <p><span className="glyphicon glyphicon-map-marker"></span> Гулакандоз, TJ</p>
                            <p><span className="glyphicon glyphicon-phone"></span> +00 1515151515</p>
                            <p><span className="glyphicon glyphicon-envelope"></span> g-smartcity@g-smartcity.tj</p>
                        </div>
                        <div className="col-sm-7 slideanim">
                            <div className="row">
                                <div className="col-sm-6 form-group">
                                    <input className="form-control" id="name" name="name" placeholder="Name" type="text" required />
                                </div>
                                <div className="col-sm-6 form-group">
                                    <input className="form-control" id="email" name="email" placeholder="Email" type="email" required />
                                </div>
                            </div>
                            <textarea className="form-control" id="comments" name="comments" placeholder="Comment" rows="5"></textarea>
                            <div className="row">
                                <div className="col-sm-12 form-group">
                                    <button className="btn btn-default pull-right" type="submit">Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
