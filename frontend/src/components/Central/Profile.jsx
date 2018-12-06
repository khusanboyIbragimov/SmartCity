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
                                            {!toggle ? <img src='https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png' alt="img" style={{ height: "100%", width: "100%" }} /> : ""}
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
                                                        <h4>My profile</h4><br />
                                                        <span className='glyphicon glyphicon-check'></span> My fullname: {!toggle ? fullname : ""} {toggle ? <input  value={fullname} name="fullname" onChange={this.handleInput}></input> : ""}<br /><br />
                                                        <span className='glyphicon glyphicon-user'></span> My username: {!toggle ? username : ""} {toggle ? <input value={username} name="username" onChange={this.handleInput}></input> : ""}<br /><br />
                                                        <span className='glyphicon glyphicon-earphone'></span> My phone number: {!toggle ? phone_number : ""} {toggle ? <input value={phone_number} name="phone_number" onChange={this.handleInput}></input> : ""}<br /><br />
                                                    </div>
                                                    <div className="col-sm-3">
                                                    <img alt='' src='https://upload.wikimedia.org/wikipedia/en/3/3f/Smart_Cities_%28India%29_logo.png' style={{ height: '168px'}}/>
                                                        {/* <span className="glyphicon glyphicon-globe logo slideanim" style={{ color: '#0093d3', fontSize: '200px' }}></span> */}
                                                    </div>
                                                    <div className="col-sm-3 text-right">
                                                        {!toggle ? <button className="btn btn-default" onClick={this.handleToggle}><span className='glyphicon glyphicon-pencil'></span> edit</button> : ""}
                                                        {toggle && showSubmitButton ? <button className="btn btn-default" onClick={this.handleToggle}>save</button> : ""}
                                                        {this.state.showSubmitButtonWithoutPhoto ? <button className="btn btn-default"><span className='glyphicon glyphicon-check'></span> save</button> : ""}
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
                                    <Link to="/sc/profile/mynews"><button style={{ width: '100%', fontSize: '12px' }} className='btn btn-primary'><b><span className='glyphicon glyphicon-globe'></span></b>&nbsp;my news </button></Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                                <div className='col-sm-2 col-xs-6 text-center'>
                                    <Link to="/sc/profile/myannouncements"><button style={{ width: '100%', fontSize: '12px' }} className='btn btn-primary'><b><span className='glyphicon glyphicon-bullhorn'></span></b>&nbsp;my announcements</button></Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                                <div className='col-sm-2 col-xs-6 text-center'>
                                    <Link to="/sc/profile/myratings"><button style={{ width: '100%', fontSize: '12px' }} className='btn btn-primary'><span className='glyphicon glyphicon-star'></span>&nbsp;my ratings</button></Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                                <div className='col-sm-2 col-xs-6 text-center'>
                                    <Link to="/sc/profile/mysurveys"><button style={{ width: '100%', fontSize: '12px' }} className='btn btn-primary'> <b><i className="fa fa-bar-chart" aria-hidden="true"></i></b>&nbsp;my surveys</button></Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                                <div className='col-sm-2 col-xs-6 '>
                                    <Link to="/sc/profile/mybazaar"><button style={{ width: '100%', fontSize: '12px' }} className='btn btn-primary'><b><span className='glyphicon glyphicon-usd'></span></b>&nbsp;my bazaar</button></Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
                    <h2 className="text-center">Contact us</h2>
                    <div className="row">
                        <div className="col-sm-5">
                            <p>Contact us and we will respond as soon as possible.</p>
                            <p><span className="glyphicon glyphicon-map-marker"></span> Jersey City, NJ</p>
                            <p><span className="glyphicon glyphicon-phone"></span> +1 347-366-6891</p>
                            <p><span className="glyphicon glyphicon-envelope"></span>smartcity@smartcity.com</p>
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
