import React from "react";
import axios from "axios";
import { Link, Route, Switch } from "react-router-dom";
import MyNews from "./News/MyNews/MyNews";
import MySurveys from "./Surveys/MySurveys/MySurveys";
import MyAnnouncements from "./Announcements/MyAnnouncements/MyAnnouncements";
import MyBazaars from "./Bazaars/MyBazaars/MyBazaars";
import io from 'socket.io-client';
import { LOGOUT } from './Giychat/Events';
const socketUrl = "http://localhost:3100";

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
        .then( res => {
            this.setState({
                fullname: res.data[0].fullname,
                username: res.data[0].username,
                phone_number: res.data[0].phone_number,
                user_imgurl: res.data[0].user_imgurl
            })
        })
        .catch( err => {
            console.log(err);
        })
            axios
                .get("/users/getUsersPosts")
                .then( (res) => {
                    this.setState({
                        news: res.data
                    })
                })
                .catch( (err) => {
                    console.log(err);
                })
                this.logout();
    }
    
    logout = () => {
        const socket = io(socketUrl);
        let username = this.props.userInfo.length > 0? this.props.userInfo[0].username:""
        socket.emit(LOGOUT, username);
	}

    handleSubmit = (e) => {
        e.preventDefault();
        const { fullname, username, phone_number, user_imgurl} = this.state;
        axios
            .patch("/users/updateprofile", {
                fullname: fullname,
                username: username,
                phone_number: phone_number,
                user_imgurl: user_imgurl
            })
            .then( (res) => {
                    window.location.reload();
                    axios  
                    .get('/users/userInfo')
                    .then( res => {
                        this.setState({
                            fullname: res.data[0].fullname,
                            username: res.data[0].username,
                            phone_number: res.data[0].phone_number,
                            user_imgurl: res.data[0].user_imgurl
                        })
                    }).then( res => {
                        this.setState({
                            toggle: false
                        })
                    })
                    .catch( err => {
                        console.log(err);
                    })
                
            })
            .catch( (err) => {
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
            user_imgurl: "https://s3.us-east-2.amazonaws.com/gulapp/" + img.filename
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
        return(
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="panel panel-default">
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-xs-3">
                                            {!toggle ? <img src={user_imgurl} alt="img" style={{height:"100px", width:"100px"}} />:""} 
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
                                                        />:""
                                            }

                                        </div>
                                        <div className="col-xs-9">
                                            <div className="row">
                                                <form onSubmit={this.handleSubmit}>
                                                    <div className="col-xs-9 text-left">
                                                        <h3>Менинг профайлим</h3><br />
                                                        Тўлиқ исмим: {!toggle ? fullname : ""} {toggle ? <input value={fullname} name="fullname" onChange={this.handleInput}></input> : ""}<br /><br />
                                                        Менинг юзернэймим: {!toggle ? username : ""} {toggle ? <input value={username} name="username" onChange={this.handleInput}></input> : ""}<br /><br />
                                                        Телефон номерим: {!toggle ? phone_number : ""} {toggle ? <input value={phone_number} name="phone_number" onChange={this.handleInput}></input> : ""}<br /><br />
                                                    </div>
                                                    <div className="col-xs-3 text-right">
                                                        {!toggle ? <button className="btn btn-default" onClick={this.handleToggle}>ўзгартираман</button> : ""}
                                                        {toggle && showSubmitButton? <button className="btn btn-default" onClick={this.handleToggle}>сақлайман</button> : ""}
                                                        {this.state.showSubmitButtonWithoutPhoto?<button>сақлайман</button>:""}
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <nav>
                                <Link to="/ga/profile/mynews">менинг янгиликларим</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Link to="/ga/profile/myannouncements">менинг эълонларим</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Link to="/ga/profile/mysurveys">менинг сўровим</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Link to="/ga/profile/mybazaar">менинг бозорим</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </nav>
                            <br/>
                            <Switch>
                                <Route exact  path="/ga/profile/mynews" component={MyNews}/>
                                <Route exact  path="/ga/profile/mysurveys" component={MySurveys}/>
                                <Route exact  path="/ga/profile/myannouncements" component={MyAnnouncements}/>
                                <Route exact  path="/ga/profile/mybazaar" component={MyBazaars}/>
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}