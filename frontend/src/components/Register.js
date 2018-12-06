import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
const photo = require('./logo2.png');

var ReactS3Uploader = require("react-s3-uploader");

export default class Register extends React.Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            confirm_password: "",
            fullname: "",
            phone_number: "",
            redirect: false,
            user_imgurl: "",
            s3_imgurl: "",
            showWaitMessage: false,
            showSubmitButton: false,
            showSubmitButtonWithoutPhoto: true,
            nickname: "",
            redirect_user: false
        }
    }

    componentDidMount() {
        axios
            .get("/users/userInfo")
            .then(res => {
                this.setState({
                    nickname: res.data[0].username,
                    redirect_user: true
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onUploadProgress = (percent) => {
        this.setState({
            completed: percent + "%"
        })

    }

    onUploadFinish = (img) => {
        this.setState({
            user_imgurl: "https://s3.us-east-2.amazonaws.com/gulapp2/" + img.filename,
            showWaitMessage: false,
            showSubmitButton: true
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { user_imgurl, username, password, fullname, phone_number } = this.state;
        axios
            .post("/users/register", {
                username: username,
                password: password,
                fullname: fullname,
                phone_number: phone_number,
                user_imgurl: user_imgurl
            })
            .then((res) => {
                this.setState({
                    redirect: true
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    handleClick = () => {
        this.setState({
            showWaitMessage: true,
            showSubmitButtonWithoutPhoto: false

        })
    }

    render() {
        const { password, confirm_password, redirect, completed, fullname, redirect_user } = this.state;

        if (redirect_user) {
            return <Redirect to="/" />
        }
        if (redirect) {
            return <Redirect to="/sc/login" />
        }
        return (
            <div>
                <div className="container-fluid">
                    <section className="container">
                        <div className="container-page">
                            <form onSubmit={this.handleSubmit} >
                                <div className="col-md-6">
                                    <h3 className="dark-grey">Create an account</h3>
                                    <div className="form-group col-lg-12">
                                        <label>Username</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            onChange={this.handleInput}
                                            name="username"
                                            placeholder="username"
                                            required
                                        />
                                    </div>
                                    <div className="form-group col-lg-6">
                                        <label>Fullname</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            onChange={this.handleInput}
                                            name="fullname"
                                            placeholder="fullname"
                                            required
                                        />
                                    </div>
                                    <div className="form-group col-lg-6">
                                        <label>Phone number</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            onChange={this.handleInput}
                                            name="phone_number"
                                            placeholder="phone number"
                                            required
                                        />
                                    </div>
                                    <div className="form-group col-lg-6">
                                        <label>Password</label>
                                        <input
                                            className="form-control"
                                            type="password"
                                            onChange={this.handleInput}
                                            name="password"
                                            placeholder="password"
                                            required
                                        />
                                    </div>
                                    <div className="form-group col-lg-6">
                                        <label>Confirm password</label>
                                        <input
                                            className="form-control"
                                            type="password"
                                            onChange={this.handleInput}
                                            name="confirm_password"
                                            placeholder="confirm password"
                                            required
                                        />
                                    </div>
                                    <div className="form-group col-lg-6">
                                          {/*<label>Суратингизни юкланг</label>
                                        <br/>

                                        <ReactS3Uploader
                                            signingUrl="/s3/sign"
                                            signingUrlMethod="GET"
                                            accept="image/*"
                                            uploadRequestHeaders={{
                                                'x-amz-acl': 'public-read'
                                            }}
                                            onFinish={this.onUploadFinish}
                                            onProgress={this.onUploadProgress}
                                            onClick={this.handleClick}
                                        /><br />
                                        {this.state.showWaitMessage ? <h5 style={{ color: 'red' }}>илтимос кутиб туринг...{" "} {completed}</h5> : ""}
                                        */}
                                        <button onClick={()=> {alert("Due to technical issues photo can not be uploaded ")}}>upload photo</button>
                                    </div>
                                    <p>{password !== confirm_password && confirm_password ? "passwords do not match" : ""}</p>
                                </div>
                                <div className="col-md-6 text-justify">
                                    {this.state.showSubmitButton ? <button className="btn btn-primary">create</button> : ""}
                                    {this.state.showSubmitButtonWithoutPhoto ? <button className="btn btn-primary">create</button> : ""}
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}
